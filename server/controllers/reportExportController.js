const ProductsMovements = require('../model/productsMovements');



const productMovements = async (req, res) => {
    
	const { startDate, endDate, type } = req.body
	
	
	
	if (type == "all"){
		
		
		try {	
			const productsMovements = await ProductsMovements.aggregate([
						{
				  $sort: { actionDate: -1 } // Sort documents by actionDate in descending order
				},
				{
					$match: {
					  actionDate: {
						$gte: startDate,
						$lte: endDate
					  }
					}
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
					path: "$warehouseInfo", // Deconstruct the warehouseInfo array
					preserveNullAndEmptyArrays: true // Preserve documents without warehouseInfo
				  }
				},
				{
				  $project: {
					actionId: 1,
					customer: 1,
					supplier: 1,
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

				  }
				}
			  ]).exec(); 
	
	
			console.log(productsMovements);
	
	
			
			var jsonString = productsMovements;
			//var jsonCount = count;
		 
			var mainObj = {
				success: true,
				//count:parseInt(jsonCount),
				jsonString			
			}
			
			res.status(200).json(mainObj);
			
		} catch (error) {
			res.status(500).json({ success: false, message: 'Internal server error'});
		}
		
		
		
		
	}else if(type == "currentProduct"){
		console.log(typeof req.body.currentProduct);
			const product = req.body.currentProduct;
			
		//try {	
			const productsMovements = await ProductsMovements.aggregate([
						{
				  $sort: { actionDate: -1 } // Sort documents by actionDate in descending order
				},
				{
				  "$match": {
					"$and": [
					  {
						"actionDate": {
						  "$gte": startDate,
						  "$lte": endDate
						}
					  },
					  {
						"currentProductId": product.toString()
					  }
					]
				  }
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
					path: "$warehouseInfo", // Deconstruct the warehouseInfo array
					preserveNullAndEmptyArrays: true // Preserve documents without warehouseInfo
				  }
				},
				{
				  $project: {
					actionId: 1,
					customer: 1,
					supplier: 1,
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
				  }
				}
			  ]).exec(); 
	
	
			console.log(productsMovements);
	
	
			
			var jsonString = productsMovements;
			//var jsonCount = count;
		 
			var mainObj = {
				success: true,
				//count:parseInt(jsonCount),
				jsonString			
			}
			
			res.status(200).json(mainObj);
			
		//} catch (error) {
		//	res.status(500).json({ success: false, message: 'Internal server error'});
		//}
		
		
		
		
		
		
	}else if(type == "warehouse"){
		
		
	}
	
		
	
}



module.exports = {
	productMovements
}

