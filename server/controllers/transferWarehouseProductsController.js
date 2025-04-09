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
			actionDate:req.body.actionDate,
			customer:req.body.stock,
			driver:req.body.driver,
			userId:req.body.userId,
			warehouseId:req.body.stock,
			outgoingList:[
			{
				warehouse:req.body.fromWarehouseId,
				id:req.body.currentProductId,
				currentProductId:req.body.currentProductId,
				balance:req.body.balance,
				barcode:req.body.barcode,
				countryOfOrigin:req.body.countryOfOrigin,
				currency:req.body.currency,
				outgoingCount:req.body.dimensions?.weight || req.body.dimensions?.volume,
				expirationDate:req.body.expirationDate,
				expiredAlertDay:req.body.expiredAlertDay,
				name:req.body.name,
				price:req.body.price,
				unit:req.body.unit,
				producedDate:req.body.producedDate,
				productCategory:req.body.productCategory,
				productListId:req.body.productIdent,
				quantity:req.body.quantity,
				boxCount:req.body.boxCount,
				unitWeight:req.body.unitWeight,
				boxCapacity:req.body.boxCapacity,
				manufacturerId:req.body.manufacturer,

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
		actionType:'internalAction',
		sellingPrice:0,
		boxCount:outgoingData.outgoingList[0].boxCount,
		unitWeight:outgoingData.outgoingList[0].unitWeight,
		boxCapacity:outgoingData.outgoingList[0].boxCapacity,
		manufacturerId:outgoingData.outgoingList[0].manufacturerId,
		currentProductId: outgoingData.outgoingList[0].currentProductId
	}
	const newProductMovementsOut = new ProductsMovements(ProductMovementDataOutgoing)
	await newProductMovementsOut.save();

	  	// Step 5: Implement incoming 
		const productData = req.body;
		const categoryId = req.body.currentProductId;
		
		const newProducts = new IncomingProducts(productData);
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
			  actionType:'internalAction',
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
 