const ProductCategories = require('../model/ProductCategories');


const getAllCategories = async (req, res) => {
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



		const category = await ProductCategories.aggregate([
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
			  from: "productcategories", // Collection to join (same collection)
			  localField: "categoryId", // Field in the current document
			  foreignField: "parentCategory", // Field in the documents of the "from" collection
			  as: "subRows" // Name of the array field that will hold the matched subcategories
			}
		  },
		  {
			$addFields: {
			  subRows: {
				$cond: { if: { $gt: [{ $size: "$subRows" }, 0] }, then: "$subRows", else: "$$REMOVE" }
			  }
			}
		  },
		  {
			$project: {
			  categoryId: 1,
			  name: 1,
			  additional: 1,
			  createdAt: 1,
			  updatedAt: 1,
			  attributs: 1,
			  subRows: 1 // Include subRows only if it's not removed
			}
		  }
		]).exec();		
		

		const count = await ProductCategories.count({});
		if (!category) return res.status(204).json({ success: true, message: 'No category list found' });


		var jsonString = category;
		var jsonCount = count;
	 
		var mainObj = {
			success: true,
			count:parseInt(jsonCount),
			jsonString			
		}
		
		res.status(200).json(mainObj);
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: 'Internal server error'});
	}
}
	

const registerCategory = async (req, res) => {


console.log(req.body);

try {
	
		const categoryData = req.body;
		const newCategory = new ProductCategories(categoryData);
		await newCategory.save();
		res.status(201).json({ success: true, message: 'New category registered succesfuly' });
		
		
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: 'Internal server error, no Customer created!'});
	}
	


}
	
const updateCategory = async (req, res) => {
	try {
		const updateFields = req.body.updatedFields;
		const documentId = req.body.id;

		const updateData = { $set: {} };

		console.log(updateFields);


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
		if (updateFields.hasOwnProperty('name')) {
		  updateData.$set.name = updateFields.name;
		}
		if (updateFields.hasOwnProperty('legalForm')) {
		  updateData.$set.legalForm = updateFields.legalForm;
		}
		if (updateFields.hasOwnProperty('mainCurrency')) {
		  updateData.$set.mainCurrency = updateFields.mainCurrency;
		}
		if (updateFields.hasOwnProperty('priceList')) {
		  updateData.$set.priceList = updateFields.priceList;
		}
		if (updateFields.hasOwnProperty('status')) {
		  updateData.$set.status = updateFields.status;
		}
		if (updateFields.hasOwnProperty('additional')) {
		  updateData.$set.additional = updateFields.additional;
		}
		
		
		
		

		
		
		// Update the document with the constructed update object
		await Customers.updateOne(
		  { customerId: documentId }, // Filter to find the document
		  updateData // Update operation
		);

		return res.status(200).json({ success: true, message: `Customer ID ${documentId} changed successfully` });
	} catch (error) {
		res.status(500).json({ success: false, message: 'Internal server error, no Customer updated!'});
	}
	
}

const deleteCategory = async (req, res) => {
	try {	
		
	   if (!req?.body?.id) return res.status(400).json({ success: true, message: 'Customer ID required' });
		
		const id = parseInt(req.body.id);
		
		
		const category = await ProductCategories.findOne({ categoryId: id }).exec();
		if (!category) {
			return res.status(204).json({ success: true, message: `Customer ID ${id} not found` });
		}
		const result = await ProductCategories.deleteOne({ categoryId: id });
		res.status(200).json(result);
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: 'Internal server error, no category deleted!'});
	}
		
}


module.exports = {
	registerCategory,
	updateCategory,
	getAllCategories,
	deleteCategory
}

