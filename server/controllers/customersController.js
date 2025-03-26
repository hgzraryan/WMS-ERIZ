const Customers = require('../model/Customers');


const getAllCustomers = async (req, res) => {
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
			

		const customers = await Customers.aggregate([
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
				customerId:1,
				name:1,
				code:1,
				legalForm:1,
				contact:1,
				mainCurrency:1,
				priceList:1,
				status:1,
				additional:1
			}
		  }
		]).exec();

		const count = await Customers.count({});
		if (!customers) return res.status(204).json({ success: true, message: 'No Customers list found' });


		var jsonString = customers;
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
	

const registerCustomer = async (req, res) => {


try {
	
		const customerData = req.body;
		const newCustomer = new Customers(customerData);
		await newCustomer.save();
		res.status(201).json({ success: true, message: 'New customer registered succesfuly' });
		
		
	} catch (error) {
		res.status(500).json({ success: false, message: 'Internal server error, no Customer created!'});
	}
	


}
	
const updateCustomer = async (req, res) => {
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

const deleteCustomer = async (req, res) => {
	try {	
		
	   if (!req?.body?.id) return res.status(400).json({ success: true, message: 'Customer ID required' });
		
		const id = parseInt(req.body.id);
		
		
		const customer = await Customers.findOne({ customerId: id }).exec();
		if (!customer) {
			return res.status(204).json({ success: true, message: `Customer ID ${id} not found` });
		}
		const result = await Customers.deleteOne({ customerId: id });
		res.json(result);
	} catch (error) {
		res.status(500).json({ success: false, message: 'Internal server error, no Customer deleted!'});
	}
		
}


module.exports = {
	registerCustomer,
	updateCustomer,
	getAllCustomers,
	deleteCustomer
}

