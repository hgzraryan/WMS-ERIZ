const ProductsMovements = require('../model/productsMovements');


const getAllProductsMovements = async (req, res) => {
	try {
	  let page = req.body.page;
	  let onPage = req.body.onPage;
	  const filters = req.body.params || {};
  
	  let skipParam = 0;
	  if (page === undefined) {
		onPage = 100000;
		skipParam = 0;
	  } else {
		skipParam = parseInt(page) === 1 ? 0 : parseInt(page) * onPage - onPage;
	}
	const toArray = (val) => {
		if (!val) return [];
		return Array.isArray(val) ? val : [val];
	};
	// Build dynamic filter object
	const matchStage = {};
	
	if (filters.price) {
	  matchStage["price"] = filters.price
	}
	if (filters.actionId) {
	  matchStage["actionId"] = filters.actionId
	}

	  if (Array.isArray(filters.stock) && filters.stock.length > 0) {
		  matchStage["warehouse"] = { $in: filters.stock.map(Number) };
		}
	  if (Array.isArray(filters.product) && filters.product.length > 0) {
		  matchStage["currentProductId"] = { $in: filters.product.map(Number) };
		}
	  if (Array.isArray(filters.partner) && filters.partner.length > 0) {
		  matchStage["partner"] = { $in: filters.partner.map(Number) };
		}
		if (Array.isArray(filters.actionType) && filters.actionType.length > 0) {
			matchStage["actionType"] = { $in: filters.actionType.map(String) };
		  }
		// if (filters.actionType) {
		// 	matchStage["actionType"] = filters.actionType.toLowerCase();
		// }
		
		if (filters.internalTransfer) {
			matchStage["internalTransfer"] = { $exists: true, $ne: null };
		}
	// if (filters.product) {
	// 	matchStage["currentProductId"] = filters.product
	// }

	
	//   if (filters.product && Array.isArray(filters.product) && filters.product.length > 0) {
	// 	matchStage["currentProductId"] = { $in: filters.product.map(Number) };
	// }
	if (filters.dateRange?.startDate && filters.dateRange?.endDate) {
	  matchStage["actionDate"] = {
		$gte: filters.dateRange.startDate,
		$lte: filters.dateRange.endDate
	  };
	}
	  
  
	  if (filters.driver && filters.driver.length > 0) {
		matchStage["driver"] = {
		  $in: filters.driver.map(d => parseInt(d.value))
		};
	  }
	  if (filters.manufacturer) {
		const manufacturers = toArray(filters.manufacturer);
		matchStage["manufacturer"] = {
		  $in: manufacturers.map(m => parseInt(m.value ?? m))
		};
	  }
  
	  if (filters.warehouse && filters.warehouse.length > 0) {
		matchStage["warehouse"] = {
		  $in: filters.warehouse.map(w => parseInt(w.value))
		};
	  }
  
  
	  const productsMovements = await ProductsMovements.aggregate([
		{ $sort: { actionDate: -1 } },
		{ $match: matchStage },
		{ $skip: skipParam },
		{ $limit: onPage },
		{
		  $lookup: {
			from: "workers",
			localField: "driver",
			foreignField: "workerId",
			as: "workerInfo"
		  }
		},
		{
		  $lookup: {
			from: "partners",
			localField: "partner",
			foreignField: "partnerId",
			as: "partnerInfo"
		  }
		},
		{
		  $lookup: {
			from: "warehouses",
			localField: "warehouse",
			foreignField: "warehouseId",
			as: "warehouseInfo"
		  }
		},
		{
		  $lookup: {
			from: "warehouses",
			localField: "fromWarehouseId",
			foreignField: "warehouseId",
			as: "stockInfo"
		  }
		},
		{
		  $unwind: { path: "$workerInfo", preserveNullAndEmptyArrays: true }
		},
		{
		  $unwind: { path: "$stockInfo", preserveNullAndEmptyArrays: true }
		},
		{
		  $unwind: { path: "$partnerInfo", preserveNullAndEmptyArrays: true }
		},
		{
		  $unwind: { path: "$warehouseInfo", preserveNullAndEmptyArrays: true }
		},
		{
		  $project: {
			actionId: 1,
			customer: 1,
			partnerId: '$partnerInfo.partnerId',
			partnerName: '$partnerInfo.name',
			productName: 1,
			actionType: 1,
			actionDate: 1,
			price: 1,
			quantity: 1,
			unit: 1,
			warehouse: '$warehouseInfo.name',
			warehouseId:'$warehouseInfo.warehouseId',
			balance: 1,
			driverName: '$workerInfo.fullName',
			driverId: '$workerInfo.workerId',
			sellingPrice: 1,
			producedDate: 1,
			unitWeight: 1,
			boxCapacity: 1,
			boxCount: 1,
			manufacturer: 1,
			currentProductId:1,
			expirationDate:1,
			expiredAlertDay:1,
			internalAction:1,
			fromWarehouseId:'$stockInfo.warehouseId',
			fromWarehouseName:'$stockInfo.name',
		  }
		}
	  ]);
  
	  const count = await ProductsMovements.countDocuments(matchStage);
  
	  if (!productsMovements) {
		return res.status(204).json({ 'message': 'No product movements found' });
	  }

	  res.status(200).json({
		success: true,
		count,
		jsonString: productsMovements
	  });
  
	} catch (error) {
	  console.error("Error in getAllProductsMovements:", error);
	  res.status(500).json({ success: false, message: 'Internal server error' });
	}
  };
  
const searchProductsMovements = async (req, res) => {
    console.log(req.body);

    if (req?.body?.params && req.body.params.length > 0) {
        const { column: queryColumn, query: queryData } = req.body.params[0];

        if (!queryColumn || !queryData) {
            return res.status(400).json({ message: 'Both column and query data are required' });
        }

        try {
            // Create a query dynamically based on the column name
            const query = {};
            query[queryColumn] = { $regex: queryData, $options: 'i' }; // Case insensitive match

            const filteredProducts = await ProductsMovements.find(query);

            const jsonCount = filteredProducts.length;

            const mainObj = {
                errorCode: 0,
                count: jsonCount,
                jsonString: filteredProducts
            };

            return res.json(mainObj);
        } catch (error) {
            console.error("Error fetching product movements:", error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        return res.status(400).json({ message: 'Product movements ID and Type required' });
    }
};
/*
const searchProductsMovements = async (req, res) => {
	try {
	  const { page = 1, onPage = 10, params } = req.body;
  
	  // Extract the date range from the params
	  const dateRangeFilter = params.find(param => param.column === 'actionDate')?.query || [];

	  // Pagination setup
	  const skipParam = (page - 1) * onPage;
  
	  // Construct date range filter if valid range is provided
	  let filter = {};
	  if (dateRangeFilter.length === 2) {
		const startDate = dateRangeFilter[0]+' 00:00';
		const endDate = dateRangeFilter[1]+' 23:59';
		filter.actionDate = {
		  $gte: startDate,
		  $lte: endDate,
		};
	  }
	  // Fetch records with pagination and sorting
	  const movementsList = await ProductsMovements.find(filter)
		.limit(onPage)
		.skip(skipParam)
		.sort({ actionDate: -1 }); // Sorting by actionDate descending
  
	  // Get total count of matching documents
	  const count = await ProductsMovements.countDocuments(filter);
  
	  // Prepare response
	  const response = {
		errorCode: 0,
		count: count,
		jsonString: movementsList,
	  };
  
	  res.json(response);
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Server error', errorCode: 1 });
	}
  };
*/
module.exports = {
	getAllProductsMovements,
	searchProductsMovements
}

