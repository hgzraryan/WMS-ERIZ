
const WarehouseBalance = require('../model//WarehouseBalance');
const IncomingProduct = require('../model//IncomingProducts');


const getAllProductsSummary = async (req, res) => {

	try {		
		console.log(req)
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

		// const balance = await WarehouseBalance.aggregate([
        //     {
        //         $sort: { _id: -1 } // Sort the documents in descending order based on _id
        //     },
        //     {
        //         $skip: skipParam // Skip documents based on the skipParam value
        //     },
        //     {
        //         $limit: onPage // Limit the number of documents returned based on the onPage value
        //     },
		// 	// {
		// 	// 	$addFields: {
		// 	// 		productListId: { $toInt: "$productListId" } // Convert productListId to integer
		// 	// 	}
		// 	// },
        //     {
        //         $lookup: {
        //             from: "productslists", // Ensure this matches the actual collection name in MongoDB
        //             localField: "productListId", // Field in WarehouseBalance
        //             foreignField: "productListId", // Field in ProductsList
        //             as: "productsListInfo" // Alias for the joined data
        //         }
        //     },
		// 	// {
		// 	// 	$lookup: {
        //     //         from: "productslists", // Ensure this matches the actual collection name
        //     //         let: { productListIdLocal: { $toInt: "$productListId" } }, // Convert productListId to integer
        //     //         pipeline: [
        //     //             { $match: { $expr: { $eq: ["$productListId", "$$productListIdLocal"] } } }
        //     //         ],
        //     //         as: "productsListInfo"
        //     //     }
        //     // },
        //     {
        //         $unwind: {
        //             path: "$productsListInfo",
        //             preserveNullAndEmptyArrays: true // Preserve documents without productsList info
        //         }
        //     },
        //     {
        //         $project: {
        //             warehouseBalanceId: 1,
        //             productListId: 1,
        //             balance: 1,
		// 			unit:1,
        //             createdAt: 1,
        //             updatedAt: 1,
        //             name: "$productsListInfo.name" // Ensure correct field name for name
        //         }
        //     }
        // ]).exec();
        const incomingProductsSummary = await IncomingProduct.aggregate([
            {
                $group: {
                    _id: "$productIdent",
                    totalBalance: { $sum: "$balance" },
                    name: { $first: "$name" },
                    unit: { $first: "$unit" },
                    dimensions: { $first: "$dimensions" }
                }
            },
            {
                $project: {
                    productIdent: "$_id",
                    totalBalance: 1,
                    name: 1,
                    dimensions:1
                }
            }
        ]).exec();
		//console.log(balance)
		
		
		
		//const count = await WarehouseBalance.count({});
		
		if (!incomingProductsSummary) return res.status(204).json({ 'message': 'No Warehouses lists found' });
		

		

		


		var jsonString = incomingProductsSummary;
		//var jsonCount = count;
	 
		var mainObj = {
			errorCode: 0,
			//count:parseInt(jsonCount),
			jsonString			
		}
		
		res.status(200).json(mainObj);
	} catch (error) {
		console.log('error',error)
		res.status(500).json({ success: false, message: 'Internal server error'});
	}
}


module.exports = {
	getAllProductsSummary,
}