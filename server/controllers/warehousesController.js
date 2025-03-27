const WarehouseBalance = require('../model/WarehouseBalance');
const OutgoingProducts = require('../model/OutgoingProducts');
const Warehouses = require('../model/Warehouses');
const IncomingProducts = require('../model/IncomingProducts');
const Counter = require('../model/Counter');
const ProductsMovements = require('../model/productsMovements');


const getAllWarehouses = async (req, res) => {
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
			


		

		const warehouses = await Warehouses.aggregate([
		  {
			// Step 1: Match all main warehouses (parentWarehouse == 0)
			$match: {
			  parentWarehouse: { $exists: false } // Only main warehouses
			}
		  },
		  {
			// Step 2: Lookup to find children where parentWarehouse matches the warehouseId
			$lookup: {
			  from: "warehouses",              // Same collection
			  localField: "warehouseId",       // Main warehouse ID
			  foreignField: "parentWarehouse", // Match with child's parentWarehouse
			  as: "children"                   // Output matched children into a 'children' array
			}
		  },
		  {
			// Step 3: Project the desired fields
			$project: {
			  warehouseId: "$warehouseId",
			  code: 1,
			  warehouseState: 1,
			  type: 1,
			  name: 1,
			  balance: 1,
			  storekeeper: 1,
			  salesAllowed: 1,
			  contact: 1,
			  createdAt: 1,
			  updatedAt: 1,
			  additional:1,
			  children: {
				$filter: {
				  input: "$children",
				  as: "child",
				  cond: { $ne: ["$$child.warehouseId", null] } // Filter out nulls
				}
			  }
			}
		  }
		]).exec();
		
		
		
		
		
		
		//const diagnosticsList = await Diagnostics.find().limit(onPage).skip(skipParam).sort({_id:-1}) ;
		const count = await Warehouses.count({});

		
			
		
		if (!warehouses) return res.status(204).json({ 'message': 'No Warehouses lists found' });
		

		

		


		var jsonString = warehouses;
		var jsonCount = count;
	 
		var mainObj = {
			errorCode: 0,
			count:parseInt(jsonCount),
			jsonString			
		}
		
		res.status(200).json(mainObj);
	} catch (error) {
		res.status(500).json({ success: false, message: 'Internal server error'});
	}
}

const registerWarehouse = async (req, res) => {


try {
	
		const warehousesData = req.body;
		const newWarehouses = new Warehouses(warehousesData);
		await newWarehouses.save();
		
		console.log(newWarehouses);
		console.log(warehousesData);
		
		res.status(201).json({ success: true, message: 'New warehouse registered succesfuly' });
		
		
	  } catch (error) {
		console.error('Error creating warehouse:', error);
		res.status(500).json({ success: false, message: 'Internal server error, no warehouse created!'});
	  }
	


}
	
const updateWarehouse = async (req, res) => {
	
	
	
		try {
			const updateFields = req.body.updatedFields;
			const documentId = req.body.id;

			const updateData = { $set: {} };

			// Check if 'contact' property exists in the request data
			if (updateFields.hasOwnProperty('contact')) {
			  const contactData = updateFields.contact;

			  // Construct the update object for the 'contact' field
			  for (const key in contactData) {
				if(key == 'address'){
					continue;
				}
				if (contactData.hasOwnProperty(key)) {
				  updateData.$set[`contact.${key}`] = contactData[key];
				}
			  }
			  
			  
			  if (contactData.hasOwnProperty('address')) {
				//updateData.$set.contact.address = contactData.address;
				const addressData = contactData.address;
				
				for (const key in addressData) {
					if (addressData.hasOwnProperty(key)) {
					  updateData.$set[`contact.address.${key}`] = addressData[key];
					}
				  }
				
				
			  }
			  
			  
			  
			}
			
			
			
			

			// Add other fields to the $set operation if they exist in the request data
			if (updateFields.hasOwnProperty('code')) {
			  updateData.$set.code = updateFields.code;
			}
			if (updateFields.hasOwnProperty('warehouseState')) {
			  updateData.$set.warehouseState = updateFields.warehouseState;
			}
			if (updateFields.hasOwnProperty('type')) {
			  updateData.$set.type = updateFields.type;
			}
			if (updateFields.hasOwnProperty('name')) {
			  updateData.$set.name = updateFields.name;
			}
			if (updateFields.hasOwnProperty('balance')) {
			  updateData.$set.balance = updateFields.balance;
			}
			if (updateFields.hasOwnProperty('storekeeper')) {
			  updateData.$set.storekeeper = updateFields.storekeeper;
			}
			if (updateFields.hasOwnProperty('subWirehouse')) {
			  updateData.$set.subWirehouse = updateFields.subWirehouse;
			}
			if (updateFields.hasOwnProperty('salesAllowed')) {
			  updateData.$set.salesAllowed = updateFields.salesAllowed;
			}
			if (updateFields.hasOwnProperty('additional')) {
			  updateData.$set.additional = updateFields.additional;
			}
			
			
			
	
	
	
	
	
	
	
	
	
			

			
			
			// Update the document with the constructed update object
			await Warehouses.updateOne(
			  { warehouseId: documentId }, // Filter to find the document
			  updateData // Update operation
			);

			console.log("Fields updated successfully");
			return res.status(200).json({ 'message': `Warehouse ID ${documentId} changed successfully` });
		} catch (error) {
			console.error("Error updating fields:", error);
			res.status(500).json({ success: false, message: 'Internal server error, no warehouse updated!'});
		}
		
	
	
	
	
}

const deleteWarehouse = async (req, res) => {
	
	try {

		if (!req?.body?.id) return res.status(400).json({ "message": 'Warehouse ID required' });
		const warehouse = await Warehouses.findOne({ warehouseId: req.body.id }).exec();
		if (!warehouse) {
			return res.status(204).json({ 'message': `Warehouse ID ${req.body.id} not found` });
		}
		const result = await Warehouses.deleteOne({ warehouseId: req.body.id });
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({ success: false, message: 'Internal server error, no Customer deleted!'});
	}
}

const getAllWarehouseProducts = async (req, res) => {


	const warehouseId = parseInt(req.params.id);
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
			
		const incomingproducts = await IncomingProducts.aggregate([
			{
				$match: { 
					stock: warehouseId,
					balance: { $gt: 0 } // Combine both conditions in one $match stage
				}
			},
			{
				$sort: { _id: -1 } // Sort the documents in descending order based on _id
			},
			{
				$skip: skipParam // Skip documents based on the skipParam value
			},
			{
				$limit: onPage // Limit the number of documents returned based on the onPage value
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
					from: "warehouses", // Name of the warehouses collection
					localField: "stock", // Field in products collection (warehouse id)
					foreignField: "warehouseId", // Field in warehouses collection (warehouse id)
					as: "warehouseInfo" // Alias for the joined data
				}
			},
			{
				$unwind: { path: "$supplierInfo", preserveNullAndEmptyArrays: true } // Handle missing suppliers
			},
			{
				$unwind: { path: "$warehouseInfo", preserveNullAndEmptyArrays: true } // Handle missing warehouses
			},
			{
				$unwind: { path: "$partnerInfo", preserveNullAndEmptyArrays: true }
			},
			{
				$project: {
					incomingProductId: 1,
					name: 1,
					description: 1,
					barcode: 1,
					productCategory: 1,
					price: 1,
					currency: 1,
					dimensions: 1,
					reorderLevel: 1,
					attributes: 1,
					createdAt: 1,
					updatedAt: 1,
					producedDate: 1,
					expiredAlertDay: 1,
					palletCount: 1,
					quantity: 1,
					balance: 1,
					countryOfOrigin: 1,
					driver: 1,
					productIdent: 1,
					expirationDate: 1,
					actionDate: 1,
					//supplierId: "$supplierInfo.supplierId",
					//supplierName: "$supplierInfo.name",
					partnerId: "$partnerInfo.partnerId",
					partnerName: "$partnerInfo.name",
					warehouseId: "$warehouseInfo.warehouseId",
					warehouseName: "$warehouseInfo.name"
				}
			}
		]).exec();
		
		


		


		const count = await IncomingProducts.count({ balance: { $gt: 0 } });
		if (!incomingproducts) return res.status(204).json({ 'message': 'No Products lists found' });

		var jsonString = incomingproducts;
		var jsonCount = count;
	 
		var mainObj = {
			success: true,
			count:parseInt(jsonCount),
			jsonString			
		}
		
		res.status(200).json(mainObj);

	} catch (error) {
		console.log(error)

		res.status(500).json({ success: false, message: 'Internal server error'});
	}


}
const registerOutgoing = async (req, res) => {
    try {
        // Step 1: Extract the outgoing list from the request body
        const { customer, outgoingList } = req.body;

        // Step 2: Iterate over the outgoingList
        for (const item of outgoingList) {
			const { id,productListId, outgoingCount } = item; // Extract the product id and outgoingCount from each item
			
            // Step 3: Find the product by id
			console.log(item)
            const product = await WarehouseBalance.findOne({ productListId: productListId });

            const incomingProduct = await IncomingProducts.findOne({ incomingProductId: id });
            // Step 5: Ensure there is enough stock to decrement
            if (product.balance < outgoingCount || incomingProduct.balance < outgoingCount) {
                return res.status(400).json({ message: `Not enough stock for product id ${productListId}` });
            }

            // Step 6: Update the product by decrementing the quantity
            await WarehouseBalance.findOneAndUpdate(
                { productListId: productListId },
                { $inc: { balance: -outgoingCount } }
            );

            await IncomingProducts.findOneAndUpdate(
                { incomingProductId: id },
                { $inc: { balance: -outgoingCount } }
            );
        
        }
		
		
		const outgoingData = req.body;
		
		
				console.log(outgoingData);

		const newOutgoing = new OutgoingProducts(outgoingData);
		await newOutgoing.save();
//add action in product movements list
const counter = await Counter.find(
	{ _id: 'outgoingProductId' },			
  );
const ProductMovementData = {
	  actionId: counter[0]?counter[0].sequence_value:1, 
	  partner:outgoingData.customer,
	  productName: outgoingData.outgoingList[0].name,
	  currentProductId: outgoingData.outgoingList[0].productListId,
	  actionDate: outgoingData.actionDate,
	  price: outgoingData.outgoingList[0].price,
	  quantity: outgoingData.outgoingList[0].outgoingCount,
	  unit: outgoingData.outgoingList[0].unit,
	  warehouse: outgoingData.outgoingList[0].warehouse,
	  balance: outgoingData.outgoingList[0].balance,
	  driver: outgoingData.driver,	
	  actionType:'outgoing',
	  sellingPrice:outgoingData.sellingPrice,
	  producedDate:outgoingData.outgoingList[0].producedDate

}
const newProductMovements = new ProductsMovements(ProductMovementData)
await newProductMovements.save();
        // Step 8: Return success after processing all outgoing items
        res.status(200).json({ success: true, message: 'Outgoing products processed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const getAllOutgoingProducts = async (req, res) => {
    try {
        var page = req.body.page;
        var onPage = req.body.onPage;

        // Set default pagination values
        if (page === undefined) {
            onPage = 100000;
            skipParam = 0;
        } else {
            if (req.body.page == 1) {
                skipParam = 0;
            } else {
                skipParam = parseInt(page) * onPage - onPage;
            }
        }

        // Fetch outgoing products with pagination
		const outgoingProducts = await OutgoingProducts.aggregate([
            { $sort: { _id: -1 } },
            { $skip: skipParam },
            { $limit: onPage },
			{
				$lookup: {
					from: "warehouses", // Name of the suppliers collection
					localField: "outgoingList.warehouse", // Field in products collection (supplier id)
					foreignField: "warehouseId", // Field in suppliers collection (supplier id)
					as: "warehouseInfo" // Alias for the joined data
				}
			},
            {
                $lookup: {
                    from: "partners",
                    localField: "customer",
                    foreignField: "partnerId",
                    as: "partnerData"
                }
            },
            {
                $lookup: {
                    from: "workers",
                    localField: "driver",
                    foreignField: "workerId",
                    as: "workerInfo"
                }
            },
            {
                $unwind: {
                    path: "$warehouseInfo",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: "$partnerData",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: "$workerInfo",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    outgoingProductId: 1,
                    driverId: "$workerInfo.workerId",
                    driverName: "$workerInfo.fullName",
                    partnerName: "$partnerData.name",
                    partnerId: "$partnerData.partnerId",
					outgoingDate:1,
                    description: 1,
					outgoingList: 1,
                    actionDate: 1,
					warehouse:"$warehouseInfo.name",
					warehouseId:"$warehouseInfo.warehouseId",
					balance:1,
					sellingPrice:1,
					producedDate:1
                }
            }
        ]);

        // Count total documents for pagination purposes
        const count = await OutgoingProducts.countDocuments();
        // Transform the data to the desired format
        const transformedData = outgoingProducts.flatMap(product => 
            product.outgoingList.map(item => ({
				outgoingProductId: product.outgoingProductId,
                partnerName: product.partnerName,
                partnerId: product.partnerId,
                currentProductId: item.productListId,
                name: item.name,
                outgoingCount: item.outgoingCount,
                warehouse: product.warehouse,
                warehouseId: product.warehouseId,
                description: product.description,
                price: item.price,
				balance:item.balance,
                barcode: item.barcode,
                currency: item.currency,
				driverId:product.driverId,
				sellingPrice: product.sellingPrice,
				driverName:product.driverName,
				outgoingDate:product.actionDate,
				actionDate:product.actionDate,
                _id: item._id
            }))
        );
        // If no products found, return a 204 response
        // if (transformedData.length === 0) {
        //     return res.status(204).json({ message: 'No Outgoing Products found' });
        // }

        // Prepare response object
        const mainObj = {
            errorCode: 0,
            count: parseInt(count),
            jsonString: transformedData // Array of transformed items
        };

        // Send response
        res.status(200).json(mainObj);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};





const searchOutgoingList = async (req, res) => {
    console.log(req.body);

    if (req?.body?.params && req.body.params.length > 0) {
        const { column: queryColumn, query: queryData } = req.body.params[0];

        if (!queryColumn || !queryData) {
            return res.status(400).json({ message: 'Both column and query data are required' });
        }

        try {
            // Ensure the search is performed within objects inside the outgoingList array
            const query = {
                outgoingList: {
                    $elemMatch: {
                        [queryColumn]: { $regex: queryData, $options: 'i' } // Case-insensitive match inside the array
                    }
                }
            };

            const filteredOutgoingProducts = await OutgoingProducts.find(query);

            const responseObj = {
                errorCode: 0,
                count: filteredOutgoingProducts.length,
                jsonString: filteredOutgoingProducts
            };

            return res.json(responseObj);
        } catch (error) {
            console.error("Error fetching outgoing products:", error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        return res.status(400).json({ message: 'Product outgoing ID and Type required' });
    }
};



module.exports = {
	registerWarehouse,
	updateWarehouse,
	getAllWarehouses,
	deleteWarehouse,
	getAllWarehouseProducts,
	registerOutgoing,
	getAllOutgoingProducts,
	searchOutgoingList
}

