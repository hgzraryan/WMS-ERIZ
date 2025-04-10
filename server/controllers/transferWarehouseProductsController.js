const WarehouseBalance = require('../model/WarehouseBalance');
const IncomingProducts = require('../model/IncomingProducts');
const ProductCategories = require('../model/ProductCategories');
const OutgoingProducts = require('../model/OutgoingProducts');
const crypto = require('crypto');
const ProductsMovements = require('../model/productsMovements');
const Counter = require('../model/Counter');

const transfer = async (req, res) => {
    
	//async function transferProducts(data) {
	  try {
console.log(req.body)
			// Step 1: generate  outgoing	data		
		const outgoingDataTMP = 
		{
			customer:req.body.stock,
			driver:req.body.driver,
			actionDate:req.body.actionDate,
			description:req.body.description,
			sellingPrice:req.body.sellingPrice,
			userId:req.body.userId,
			outgoingList:[
				{
					id:req.body.currentProductId,
					name:req.body.name,
					productListId:req.body.productIdent,
					manufacturerId:req.body.manufacturer,
					outgoingCount:req.body.dimensions?.weight || req.body.dimensions?.volume,
					balance:req.body.balance,
					warehouse:req.body.stock,
					price:req.body.price,
					barcode:req.body.barcode,
					currency:req.body.currency,
					producedDate:req.body.producedDate,
					expirationDate:req.body.expirationDate,
					expiredAlertDay:req.body.expiredAlertDay,
					unit:req.body.unit,
					boxCount:req.body.boxCount,
					unitWeight:req.body.unitWeight,
					boxCapacity:req.body.boxCapacity,
					quantity:req.body.quantity,
					outgoingBoxCount:req.body.outgoingBoxCount,
					outgoingQuantityCount:req.body.outgoingQuantityCount,
					
					//warehouse:req.body.fromWarehouseId,

					//currentProductId:req.body.currentProductId,
					//productCategory:req.body.productCategory,
					
					//warehouseId:req.body.stock,
				}
			]
		}
		
		// Step 2: Implement decrement data	

	for (const item of outgoingDataTMP?.outgoingList) {
		const { id,outgoingCount } = item; // Extract the product id and outgoingCount from each item
		const currentIncome = await IncomingProducts.findOne(
			{ incomingProductId: id }			
		);
		//check if product balance available
		if((+currentIncome?.balance)>=(+outgoingCount)){
			await IncomingProducts.findOneAndUpdate(
				{ incomingProductId: id },
				{ $inc: { balance: -outgoingCount } }
			);
		}else{
			return res.status(200).json({
                success: false,
                message: 'Unavailable count',
            });	
		}
	}

	// Step 3: Implement outgoing	
	const outgoingData = outgoingDataTMP;
	const newOutgoing = new OutgoingProducts(outgoingData);
	await newOutgoing.save();

	//Step 4:Generate data for product movement(outgoing)
	const counter1 = await Counter.find({ _id: 'outgoingProductId' });
	const ProductMovementDataOutgoing = {
		actionDate: outgoingData.actionDate,
		partner:outgoingData.customer,
		driver: outgoingData.driver,	
		userId: outgoingData.userId,	
		warehouse: outgoingData.warehouseId,
		actionId: counter1[0].sequence_value, 
		balance: outgoingData.outgoingList[0].balance,
		barcode: outgoingData.outgoingList[0].barcode,
		countryOfOrigin: outgoingData.outgoingList[0].countryOfOrigin,
		currency: outgoingData.outgoingList[0].currency,
		quantity: outgoingData.outgoingList[0].outgoingCount,
		expirationDate: outgoingData.outgoingList[0].expirationDate,
		expiredAlertDay: outgoingData.outgoingList[0].expiredAlertDay,
		productName: outgoingData.outgoingList[0].name,
		price: outgoingData.outgoingList[0].price,
		unit: outgoingData.outgoingList[0].unit,
		producedDate:outgoingData.outgoingList[0].producedDate,
		productCategory:outgoingData.outgoingList[0].productCategory,
		productListId:outgoingData.outgoingList[0].productListId,
		actionType:'outgoing',
		sellingPrice:0,
		boxCount:outgoingData.outgoingList[0].boxCount,
		unitWeight:outgoingData.outgoingList[0].unitWeight,
		boxCapacity:outgoingData.outgoingList[0].boxCapacity,
		manufacturerId:outgoingData.outgoingList[0].manufacturerId,
		currentProductId: outgoingData.outgoingList[0].currentProductId,
		internalTransfer:true
	}
	const newProductMovementsOut = new ProductsMovements(ProductMovementDataOutgoing)
	await newProductMovementsOut.save();

	  	// Step 5: Implement incoming 
		const productData = req.body;
		const categoryId = req.body.currentProductId;
		
		   const newProd = {
			  name: productData.name,
			  currentProductId: productData.currentProductId ,
			  productCategory: productData.productCategory,
			  productIdent: productData.productIdent,
			  countryOfOrigin:productData.countryOfOrigin,
			  stock: productData.stock,
			  partner: productData.partner,
			  driver: productData.driver,
			  boxCount:productData.boxCount,
			  quantity: productData.quantity,
			  balance: productData.balance,
			  boxCountBalance:productData.outgoingBoxCount,
			  quantityBalance:productData.outgoingQuantityCount,
			  unit:productData.unit,
			  dimensions:{
				//height: +data.height || null,
				//length: +data.length || null,
				// width: +data.width || null,
				weight: productData.dimensions.weight,
				volume: productData.dimensions.volume,
			  },
			  //palletCount:productData.palletCount,
			  unitWeight:productData.unitWeight,
			  boxCapacity:productData.boxCapacity,
			  manufacturer:productData.manufacturer,
			  currency:productData.currency,
			  price:productData.price,
			  sellingPrice:0,//+data.sellingPrice,
			  //reorderLevel: +data?.reorderLevel,
			  producedDate:productData.producedDate,
			  expiredAlertDay:productData.expiredAlertDay,
			  expirationDate:productData.expirationDate,
			  actionDate:productData.actionDate,
			  //description:productData.description,
			  barcode: productData.barcode,
			};

		const newProducts = new IncomingProducts(newProd);
		await newProducts.save();

		const counter = await Counter.find(
			{ _id: 'incomingProductId' },			
		  );

		// Step 6: Generate SKU 
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
		  
		const ProductMovementData = {
			  actionId: counter[0]?.sequence_value, 
			  productName: productData.name,
			  currentProductId: productData.currentProductId,
			  actionDate: productData.actionDate,			  
			  expirationDate: productData.expirationDate,
			  expiredAlertDay: productData.expiredAlertDay,
			  price: productData.price,
			  quantity: productData?.dimensions?.weight || productData?.dimensions?.volume,
			  unit: productData.unit,
			  warehouse: productData.stock,
			  balance: productData.balance,			  
			  fromWarehouseId: productData.fromWarehouseId,			  
			  //partner: productData.partner,
			  driver: productData.driver,	
			  actionType: productData.actionType,
			  actionType:'incoming',
			  sellingPrice: 0,
			  partner:productData.partner,
			  producedDate:productData.producedDate,
			  boxCount:productData.boxCount,
			  unitWeight:productData.unitWeight,
			  boxCapacity:productData.boxCapacity,
			  manufacturerId:productData.manufacturer,
			  internalTransfer:true
		}

		
		const newProductMovements = new ProductsMovements(ProductMovementData)
		await newProductMovements.save();


    return res.status(200).json({
                success: true,
                message: 'Product transfer success',
            });		
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message:error});
	}
}
//}
module.exports = {
    transfer
}
 