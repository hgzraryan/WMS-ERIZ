const ProductsList = require('../model/ProductsList');


const getAllProductsList = async (req, res) => {
    
	
	
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
			

		const productsList = await ProductsList.aggregate([
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
			$project: {
				productListId:1,
				category:1,
				name:1,				
				reorderLevel:1,
				description:1,
				createdAt:1,
				updatedAt:1
			}
		  }
		]).exec();

		const count = await ProductsList.count({});
		if (!productsList) return res.status(204).json({ 'message': 'No Products lists found' });

		var jsonString = productsList;
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

const registerProductsList = async (req, res) => {

	try {
		
			const productData = req.body;
			const newProducts = new ProductsList(productData);
			await newProducts.save();
			res.status(201).json({ success: true, message: 'New products list registered succesfuly' });


	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: 'Internal server error, no product created!'});
	}

}
	
const updateProductsList = async (req, res) => {
	
	
	
}

const deleteProductsList = async (req, res) => {
	
	

}


module.exports = {
	getAllProductsList,
	registerProductsList,
	updateProductsList,
	deleteProductsList
}

