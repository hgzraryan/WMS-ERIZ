const ProductsMovements = require('../model/productsMovements');


const getAllProductsMovements = async (req, res) => {
	
		try {	
			var page = req.body.page;
			var onPage = req.body.onPage;
	
			
			
			if (page === undefined) {
				onPage = 100000;
				skipParam = 0;
			} else {
				if(req.body.page==1){
					skipParam=0;
				}else{
					skipParam = parseInt(page)*onPage-onPage;
				}
			}
				
	
			const productsMovements = await ProductsMovements.aggregate([
				{
				  $sort: { actionDate: -1 } // Sort documents by actionDate in descending order
				},
				{
				  $skip: skipParam // Skip documents based on the skipParam value
				},
				{
				  $limit: onPage // Limit the number of documents returned based on the onPage value
				},
				{
				  $lookup: {
					from: "workers", // Name of the workers collection
					localField: "driver", // Field in ProductsMovements collection
					foreignField: "workerId", // Field in workers collection
					as: "workerInfo" // Alias for the joined data
				  }
				},
				{
				  $lookup: {
					from: "partners", // Name of the workers collection
					localField: "partner", // Field in ProductsMovements collection
					foreignField: "partnerId", // Field in workers collection
					as: "partnerInfo" // Alias for the joined data
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
				  $unwind: {
					path: "$workerInfo", // Deconstruct the workerInfo array
					preserveNullAndEmptyArrays: true // Preserve documents without workerInfo
				  }
				},
				{
				  $unwind: {
					path: "$partnerInfo", // Deconstruct the workerInfo array
					preserveNullAndEmptyArrays: true // Preserve documents without workerInfo
				  }
				},
				{
				  $unwind: {
					path: "$warehouseInfo", // Deconstruct the warehouseInfo array
					preserveNullAndEmptyArrays: true // Preserve documents without warehouseInfo
				  }
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
					balance: 1,
					driver: '$workerInfo.fullName',
					sellingPrice:1,
					producedDate:1,
					unitWeight:1,
					boxCapacity:1,
					boxCount:1,
					manufacturer:1,
					
				  }
				}
			  ]).exec();
			  
	
			const count = await ProductsMovements.count({});
			if (!productsMovements) return res.status(204).json({ 'message': 'No Products lists found' });
	
			var jsonString = productsMovements;
			var jsonCount = count;
		 
			var mainObj = {
				success: true,
				count:parseInt(jsonCount),
				jsonString			
			}
			
			res.status(200).json(mainObj);
		
		} catch (error) {
			res.status(500).json({ success: false, message: 'Internal server error'});
		}
		
		
		
	
}
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

