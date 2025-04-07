const WarehouseBalance = require('../model/WarehouseBalance');
const IncomingProducts = require('../model/IncomingProducts');
const ProductCategories = require('../model/ProductCategories');
const crypto = require('crypto');
const ProductsMovements = require('../model/productsMovements');
const Counter = require('../model/Counter');

const getAllProducts = async (req, res) => {
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
				from: "workers", // Name of the suppliers collection
				localField: "driver", // Field in products collection
				foreignField: "workerId", // Field in suppliers collection 
				as: "workerInfo" // Alias for the joined data
			}
		},
		  {
			$lookup: {
				from: "productsList", // Name of the suppliers collection
				localField: "currentProductId", // Field in products collection 
				foreignField: "productListId", // Field in suppliers collection 
				as: "productsListInfo" // Alias for the joined data
			}
		},
		  {
			$lookup: {
				from: "suppliers", // Name of the suppliers collection
				localField: "supplier", // Field in products collection (supplier id)
				foreignField: "supplierId", // Field in suppliers collection (supplier id)
				as: "supplierInfo" // Alias for the joined data
			}
		},
		  {
			$lookup: {
				from: "partners", // Name of the suppliers collection
				localField: "partner", // Field in products collection (supplier id)
				foreignField: "partnerId", // Field in suppliers collection (supplier id)
				as: "partnerInfo" // Alias for the joined data
			}
		},
		  {
			$lookup: {
				from: "productcategories", // Name of the suppliers collection
				localField: "productCategory", // Field in products collection (supplier id)
				foreignField: "categoryId", // Field in suppliers collection (supplier id)
				as: "categoryInfo" // Alias for the joined data
			}
		},
		  {
			$lookup: {
				from: "warehouses", 
				localField: "stock",
				foreignField: "warehouseId", 
				as: "warehouseInfo" 
			}
		},
		  {
			$lookup: {
				from: "manufacturers", 
				localField: "manufacturer",
				foreignField: "manufacturerId", 
				as: "manufacturerInfo" 
			}
		},
		{
			$unwind: {
				path: "$manufacturerInfo", // Unwind to deconstruct the array of supplierInfo
				preserveNullAndEmptyArrays: true // Preserve documents without supplier info
			}
		},
		{
			$unwind: {
				path: "$workerInfo", // Unwind to deconstruct the array of supplierInfo
				preserveNullAndEmptyArrays: true // Preserve documents without supplier info
			}
		},
		{
			$unwind: {
				path: "$supplierInfo", // Unwind to deconstruct the array of supplierInfo
				preserveNullAndEmptyArrays: true // Preserve documents without supplier info
			}
		},
		{
			$unwind: {
				path: "$partnerInfo", // Unwind to deconstruct the array of supplierInfo
				preserveNullAndEmptyArrays: true // Preserve documents without supplier info
			}
		},
		{
			$unwind: {
				path: "$warehouseInfo", // Unwind to deconstruct the array of warehouseInfo
				preserveNullAndEmptyArrays: true // Preserve documents without warehouse info
			}
		},
		{
			$unwind: {
				path: "$productsListInfo", // Unwind to deconstruct the array of productsListInfo
				preserveNullAndEmptyArrays: true // Preserve documents without productsList info
			}
		},
		{
			$unwind: {
				path: "$categoryInfo", // Unwind to deconstruct the array of productsListInfo
				preserveNullAndEmptyArrays: true // Preserve documents without productsList info
			}
		},


		  {
			$project: {
				incomingProductId:1,
				name:1,
				currentProductId:1,
				description:1,
				barcode:1,
				productCategory:1,
				//stock:1,
				price:1,
				currency:1,
				dimensions:1,
				supplier:1,
				//reorderLevel:1,
				attributes:1,
				createdAt:1,
				updatedAt:1,
				quantity:1,
				palletCount:1,
				balance:1,
				expirationDate:1,
				expiredAlertDay:1,
				producedDate:1,
				actionDate:1,
				sellingPrice:1,
				countryOfOrigin:1,
				unitWeight:1,
				boxCapacity:1,
				boxCount:1,
				manufacturerId:"$manufacturerInfo.manufacturerId",
				manufacturerName:"$manufacturerInfo.name",
				driverId:"$workerInfo.workerId",
				driverName:"$workerInfo.fullName",
				// supplierId:"$supplierInfo.supplierId",
				// supplierName:"$supplierInfo.name",
				partnerId:"$partnerInfo.partnerId",
				partnerName:"$partnerInfo.name",
				warehouseId:"$warehouseInfo.warehouseId",
				warehouseName:"$warehouseInfo.name",
				productCategoryName:"$categoryInfo.name",
			}
		  }
		]).exec();

		const count = await IncomingProducts.count({});
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
		res.status(500).json({ success: false, message: 'Internal server error'});
	}
	
	
	
}
const getIncomingProductsById = async (req, res) => {
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
                $match: { currentProductId: req.body.productListId } // Match based on productListId
            },
			{
				$match: { balance: { $gt: 0 } } // Only include products with balance > 0
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
				from: "productsList", // Name of the suppliers collection
				localField: "currentProductId", // Field in products collection 
				foreignField: "productListId", // Field in suppliers collection 
				as: "productsListInfo" // Alias for the joined data
			}
		},
		  {
			$lookup: {
				from: "suppliers", // Name of the suppliers collection
				localField: "supplier", // Field in products collection (supplier id)
				foreignField: "supplierId", // Field in suppliers collection (supplier id)
				as: "supplierInfo" // Alias for the joined data
			}
		},
		  {
			$lookup: {
				from: "workers", // Name of the suppliers collection
				localField: "driver", // Field in products collection
				foreignField: "workerId", // Field in suppliers collection 
				as: "workerInfo" // Alias for the joined data
			}
		},
		  {
			$lookup: {
				from: "warehouses", 
				localField: "stock",
				foreignField: "warehouseId", 
				as: "warehouseInfo" 
			}
		},
		{
			$unwind: {
				path: "$supplierInfo", // Unwind to deconstruct the array of supplierInfo
				preserveNullAndEmptyArrays: true // Preserve documents without supplier info
			}
		},
		{
			$unwind: {
				path: "$workerInfo", // Unwind to deconstruct the array of supplierInfo
				preserveNullAndEmptyArrays: true // Preserve documents without supplier info
			}
		},
		{
			$unwind: {
				path: "$warehouseInfo", // Unwind to deconstruct the array of warehouseInfo
				preserveNullAndEmptyArrays: true // Preserve documents without warehouse info
			}
		},
		{
			$unwind: {
				path: "$productsListInfo", // Unwind to deconstruct the array of productsListInfo
				preserveNullAndEmptyArrays: true // Preserve documents without productsList info
			}
		},


		  {
			$project: {
				incomingProductId:1,
				name:1,
				currentProductId:1,
				description:1,
				barcode:1,
				productCategory:1,
				//stock:1,
				price:1,
				currency:1,
				dimensions:1,
				//supplier:1,
				//reorderLevel:1,
				attributes:1,
				createdAt:1,
				updatedAt:1,
				quantity:1,
				balance:1,
				sellingPrice:1,
				driverId:"$workerInfo.workerId",
				driverName:"$workerInfo.fullName",
				supplierId:"$supplierInfo.supplierId",
				supplierName:"$supplierInfo.name",
				warehouseId:"$warehouseInfo.warehouseId",
				warehouseName:"$warehouseInfo.name",
				expirationDate:1,
				producedDate:1,
				actionDate:1
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
		res.status(500).json({ success: false, message: 'Internal server error'});
	}
	
	
	
}
const registerIncomingProduct = async (req, res) => {


	try {
	
		const productData = req.body;
		const categoryId = req.body.currentProductId;

		const currentProduct = parseInt(req.body.currentProductId);
		const warehouseId = req.body.warehouseId;
		const quantity = req.body.quantity;
		const dimensions = req.body.dimensions;
		const weight = req.body.dimensions.weight;
		const volume = req.body.dimensions.volume;
		const balance = req.body.balance;
		const producedDate = req.body.producedDate;

		function generateSKU(category) {
			// Check if the category is a string
			if (typeof category !== 'string') {
				throw new TypeError('Category must be a string');
			}

			// Get the first two characters of the category and convert to uppercase
			const categoryCode = category.slice(0, 2).toUpperCase();
			
			const timestamp = Date.now(); // Current timestamp
			const randomPart = crypto.randomBytes(4).toString('hex'); // Generate a random 4-byte hex string
			
			// Create SKU format: CATEGORYCODETIMESTAMP-RANDOM
			const sku = `${categoryCode}${timestamp}${randomPart}`;
			
			return sku;
		}
		
		
		const catName = await ProductCategories.find({ currentProduct: categoryId });
		
		const category =  catName[0].name;// Replace with actual product category
		
		const sku = generateSKU(category);



		
		productData.SKU = sku;
		
		console.log('currentProduct',currentProduct);
		const newProducts = new IncomingProducts(productData);
		await newProducts.save();
		//add action in product movements list
		const counter = await Counter.find(
			{ _id: 'incomingProductId' },			
		  );
		const ProductMovementData = {
			  actionId: counter[0]?counter[0].sequence_value:1, 
			  productName: productData.name,
			  currentProductId: productData.currentProductId,
			  actionType: productData.actionType,
			  actionDate: productData.actionDate,
			  expirationDate: productData.expirationDate,
			  expiredAlertDay: productData.expiredAlertDay,
			  price: productData.price,
			  quantity: productData?.dimensions?.weight || productData?.dimensions?.volume,// this quantity is differ from incoming product quantity
			  unit: productData.unit,
			  warehouse: productData.stock,
			  balance: productData.balance,
			  driver: productData.driver,	
			  actionType:'incoming',
			  sellingPrice: 0,
			  partner:productData.partner,
			  producedDate:productData.producedDate,
			  boxCount:productData.boxCount,
			  unitWeight:productData.unitWeight,
			  boxCapacity:productData.boxCapacity,
			  manufacturerId:productData.manufacturer
		}
		const newProductMovements = new ProductsMovements(ProductMovementData)
		await newProductMovements.save();
//TODO
		let warehouseBalance = await WarehouseBalance.findOne({ productListId: currentProduct, warehouseId });

        if (warehouseBalance) {
            // Update quantity if entry exists
            //warehouseBalance.count = (parseInt(warehouseBalance.count) + quantity).toString();
			warehouseBalance.balance = (
				parseInt(warehouseBalance.balance) + (weight ? weight : (volume ? volume : 0))
			).toString();
            await warehouseBalance.save();

            return res.status(200).json({
                success: true,
                message: 'Product quantity updated successfully',
                product: warehouseBalance
            });
        } else {
            // Create new WarehouseBalance entry
            const newWarehouseBalance = new WarehouseBalance({
                productListId: currentProduct,
				balance:balance,
				unit:dimensions?.weight?'weight':dimensions?.volume?'volume':''
            });
            await newWarehouseBalance.save();

            return res.status(201).json({
                success: true,
                message: 'New product registered and added to warehouse balance successfully'
            });
        }
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: 'Internal server error, no product created!'});
	}
	


}
const updateProduct = async (req, res) => {
    try {
        const { documentId, updateFields } = req.body;

        if (!documentId || !updateFields) {
            return res.status(400).json({
                success: false,
                message: "Document ID and updateFields are required.",
            });
        }

        const updateData = { $set: {} };
        const fieldsToUpdate = [
            "name", "countryOfOrigin", "stock", "barcode", "palletCount", "boxCount",
            "boxCapacity", "unitWeight", "manufacturer", "balance", "quantity", "currency",
            "price", "producedDate", "expirationDate", "expiredAlertDay", "actionDate",
            "currentProductId", "productIdent"
        ];

        for (const field of fieldsToUpdate) {
            if (updateFields.hasOwnProperty(field)) {
                updateData.$set[field] = updateFields[field];
            }
        }
        if (updateFields.hasOwnProperty('partnerId')) {
            updateData.$set.partner = updateFields.partnerId;
        }
        if (updateFields.hasOwnProperty('driverId')) {
            updateData.$set.driver = updateFields.driverId;
        }
        if (updateFields.hasOwnProperty('additional')) {
            updateData.$set.description = updateFields.additional;
        }
        if (updateFields.hasOwnProperty('dimensions')) {
            const dimensions = updateFields.dimensions;
            for (const key in dimensions) {
                if (dimensions.hasOwnProperty(key)) {
                    updateData.$set[`dimensions.${key}`] = dimensions[key];
                }
            }
        }

        const existingProduct = await IncomingProducts.findOne({ incomingProductId: documentId });
        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: `No Incoming product found with ID ${documentId}`,
            });
        }

        await IncomingProducts.updateOne({ incomingProductId: documentId }, updateData);

        // Update ProductsMovements
        const movementUpdate = {
            actionDate: updateFields.actionDate || existingProduct.actionDate,
            price: updateFields.price || existingProduct.price,
            quantity: updateFields.dimensions?.weight || updateFields.dimensions?.volume || existingProduct.dimensions?.weight || existingProduct.dimensions?.volume,
            unit: updateFields.unit || existingProduct.unit,
            warehouse: updateFields.stock || existingProduct.stock,
            balance: updateFields.balance || existingProduct.balance,
            driver: updateFields.driverId || existingProduct.driver,
            partner: updateFields.partnerId || existingProduct.partner,
            producedDate: updateFields.producedDate || existingProduct.producedDate,
            expirationDate: updateFields.expirationDate || existingProduct.expirationDate || '',
            expiredAlertDay: updateFields.expiredAlertDay || existingProduct.expiredAlertDay || '',
            boxCount: updateFields.boxCount || existingProduct.boxCount,
            unitWeight: updateFields.unitWeight || existingProduct.unitWeight,
            boxCapacity: updateFields.boxCapacity || existingProduct.boxCapacity,
            manufacturer: updateFields.manufacturer || existingProduct.manufacturer
        };
		// expirationDate: productData.expirationDate,
		// 	  expiredAlertDay: productData.expiredAlertDay,
        await ProductsMovements.updateOne({ actionId: documentId,actionType:"incoming"}, { $set: movementUpdate });

        //TODO Update WarehouseBalance
        const warehouseBalance = await WarehouseBalance.findOne({ productListId: existingProduct.currentProductId});
        if (warehouseBalance) {
            warehouseBalance.balance = (
                parseInt(warehouseBalance.balance) + (updateFields.dimensions?.weight || updateFields.dimensions?.volume || 0)
            ).toString();
            await warehouseBalance.save();
        } else {
            const newWarehouseBalance = new WarehouseBalance({
                productListId: existingProduct.currentProductId,
                balance: updateFields.balance || existingProduct.balance,
                unit: updateFields.dimensions?.weight ? 'weight' : updateFields.dimensions?.volume ? 'volume' : ''
            });
            await newWarehouseBalance.save();
        }

        return res.status(200).json({
            success: true,
            message: `Incoming product with ID ${documentId} updated successfully`,
        });
    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the product",
        });
    }
};
// const updateProduct = async (req, res) => {
	
//     try {
//         const { documentId, updateFields } = req.body;

//         if (!documentId || !updateFields) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Document ID and updateFields are required.",
//             });
//         }

//         const updateData = { $set: {} };
    
        
    
//         // Add other fields to the $set operation if they exist in the request data
//         const fieldsToUpdate = [
//             "name",
// 			"countryOfOrigin",
// 			"stock",
// 			"barcode",
// 			"palletCount",
// 			"boxCount",
// 			"boxCapacity",
// 			"unitWeight",
// 			"manufacturer",
// 			"balance",
// 			"quantity",
// 			"currency",
// 			"price",
// 			"producedDate",
// 			"expirationDate",
// 			"expiredAlertDay",
// 			"actionDate",
// 			"currentProductId",
// 			"productIdent",

//         ];
    
//         for (const field of fieldsToUpdate) {
//             if (updateFields.hasOwnProperty(field)) {
//                 updateData.$set[field] = updateFields[field];
//             }
//         }
// 		if (updateFields.hasOwnProperty('partnerId')) {
// 			updateData.$set.partner = updateFields.partnerId;
// 		  }
// 		  if (updateFields.hasOwnProperty('driverId')) {
// 			  updateData.$set.driver = updateFields.driverId;
// 		  }
// if (updateFields.hasOwnProperty('additional')) {
// 			  updateData.$set.description = updateFields.additional;
// 		  }
// if (updateFields.hasOwnProperty('dimensions')) {
// 			  const dimansions = updateFields.dimensions;
// 			  // Construct the update object for the 'contact' field
// 			  for (const key in dimansions) {
			   
// 				if (dimansions.hasOwnProperty(key)) {
// 				  updateData.$set[`dimensions.${key}`] = dimansions[key];
// 				}
// 			  }
// 			}
//         // Update the document with the constructed update object
//         // const result = await Staff.updateOne(
//         //     { staffId: documentId }, // Filter to find the document
//         //     updateData // Update operation
//         // );
// 		const result = await IncomingProducts.updateOne(
// 			{ incomingProductId: documentId }, // Filter to find the document
// 			updateData // Update operation
// 		  );
//         if (result.matchedCount === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: `No Incoming product found with ID ${documentId}`,
//             });
//         }
    
//         return res.status(200).json({
//             success: true,
//             message: `Incoming product with ID ${documentId} updated successfully`,
//         });
//     } catch (error) {
//         console.error("Error updating fields:", error);
//         return res.status(500).json({
//             success: false,
//             message: "An error occurred while updating the staff",
//         });
//     }

	
	
	
	
	
// }
const deleteProduct = async (req, res) => {
	
	try {	
	   if (!req?.body?.id) return res.status(400).json({ "message": 'Patner ID required' });
		
		
		const id = parseInt(req.body.id)
		
		const partner = await Partners.findOne({ partnerId: id }).exec();
		if (!partner) {
			return res.status(204).json({ 'message': `Patner ID ${id} not found` });
		}
		const result = await Partners.deleteOne({ partnerId: id });
		res.status(200).json({ success: true, result });
	} catch (error) {
		res.status(500).json({ success: false, message: 'Internal server error, no Partner deleted!'});
	}

}


const searchIncomingProducts = async (req, res) => {
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

            const filteredProducts = await IncomingProducts.find(query);

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
module.exports = {
	registerIncomingProduct,
	updateProduct,
	getAllProducts,
	getIncomingProductsById,
	deleteProduct,
	searchIncomingProducts
}

