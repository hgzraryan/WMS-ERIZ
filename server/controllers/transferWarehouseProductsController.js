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
			// Step 2: OutgoingList			
		const outgoingDataTMP = 
		{
			actionDate:req.body.actionDate,
			customer:req.body.stock,
			driver:req.body.driver,
			outgoingList:[
			{
				name:req.body.name,
				id:req.body.currentProductId,
				balance:req.body.balance,
				barcode:req.body.barcode,
				currency:req.body.currency,
				outgoingCount:req.body.dimensions?.weight || req.body.dimensions?.volume,
				price:req.body.price,
				productListId:req.body.productIdent,
				unit:req.body.unit,
				warehouse:req.body.fromWarehouseId,
				producedDate:req.body.producedDate,
				driverId:req.body.driver,
				expirationDate:req.body.expirationDate,
				expiredAlertDay:req.body.expiredAlertDay,
				warehouseId:req.body.stock,
			}
			]
		}
	for (const item of outgoingDataTMP?.outgoingList) {
		const { id,outgoingCount } = item; // Extract the product id and outgoingCount from each item
		await IncomingProducts.findOneAndUpdate(
			{ incomingProductId: id },
			{ $inc: { balance: -outgoingCount } }
		);
	}
	const outgoingData = outgoingDataTMP;
	const newOutgoing = new OutgoingProducts(outgoingData);
	await newOutgoing.save();

	//add action in product movements list
	const counter1 = await Counter.find({ _id: 'outgoingProductId' });
	const ProductMovementData1 = {
		actionId: counter1[0].sequence_value, 
		partner:outgoingData.customer,
		productName: outgoingData.outgoingList[0].name,
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
	const newProductMovements1 = new ProductsMovements(ProductMovementData1)
	await newProductMovements1.save();

	  	// Step 1: Incoming
		const productData = req.body;
		const categoryId = req.body.currentProductId;

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
		const newProducts = new IncomingProducts(productData);
		await newProducts.save();
		//add action in product movements list
		const counter = await Counter.find(
			{ _id: 'incomingProductId' },			
		  );
		  debugger
		const ProductMovementData = {
			  actionId: counter[0]?.sequence_value, 
			  productName: productData.name,
			  //currentProductId: productData.currentProductId,
			  actionDate: productData.actionDate,			  
			  //expirationDate: productData.expirationDate,
			  //expiredAlertDay: productData.expiredAlertDay,
			  price: productData.price,
			  quantity: productData?.dimensions?.weight || productData?.dimensions?.volume,
			  unit: productData.unit,
			  warehouse: productData.stock,
			  balance: productData.balance,			  
			  //partner: productData.partner,
			  driver: productData.driver,	
			  actionType: productData.actionType,
			 // actionType:'incoming',
			  sellingPrice: 0,
			  partner:productData.partner,
			  producedDate:productData.producedDate,
			  boxCount:productData.boxCount,
			  unitWeight:productData.unitWeight,
			  boxCapacity:productData.boxCapacity,
			  manufacturerId:productData.manufacturer
		}
		const ProductMovementData1s = {
			actionId: counter[0]?counter[0].sequence_value:1, 
			productName: productData.name,
			currentProductId: productData.currentProductId,
			actionDate: productData.actionDate,
			expirationDate: productData.expirationDate,
			expiredAlertDay: productData.expiredAlertDay,
			price: productData.price,
			quantity: productData?.dimensions?.weight || productData?.dimensions?.volume,// this quantity is differ from incoming product quantity
			unit: productData.unit,
			warehouse: productData.stock,
			balance: productData.balance,
			partner: productData.partner,	
			driver: productData.driver,	
			actionType:'incoming',
			sellingPrice: 0,
			producedDate:productData.producedDate,
			boxCount:productData.boxCount,
			unitWeight:productData.unitWeight,
			boxCapacity:productData.boxCapacity,
			manufacturerId:productData.manufacturer
	  }
		const newProductMovements = new ProductsMovements(ProductMovementData)
		await newProductMovements.save();


    return res.status(200).json({
                success: true,
                message: 'Product transfer success',
            });		
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: 'Internal server error, no product created!'});
	}
}
//}
module.exports = {
    transfer
}
