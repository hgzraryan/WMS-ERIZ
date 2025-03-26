const Suppliers = require('../model/Suppliers');


const getAllSuppliers = async (req, res) => {
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
			

		const suppliers = await Suppliers.aggregate([
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
				supplierId:1,
				name:1,
				director:1,
				contact: 1,
				bankName:1,
				bankAccNumber:1,
				tin:1,
				additional:1,
				description:1,
 				createdAt:1,
				updatedAt:1
			}
		  }
		]).exec();

		const count = await Suppliers.count({});
		if (!suppliers) return res.status(204).json({ 'message': 'No Suppliers lists found' });

		var jsonString = suppliers;
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

const registerSupplier = async (req, res) => {


	try {
	
		const supplierData = req.body;
		console.log(supplierData);
		const newSupplier = new Suppliers(supplierData);
		await newSupplier.save();
		res.status(201).json({ success: true, message: 'New Supplier registered succesfuly' });


	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: 'Internal server error, no product created!'});
	}
	


}

const updateSupplier = async (req, res) => {
	
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
			if (updateFields.hasOwnProperty('name')) {
			  updateData.$set.name = updateFields.name;
			}
			if (updateFields.hasOwnProperty('director')) {
			  updateData.$set.director = updateFields.director;
			}
			if (updateFields.hasOwnProperty('tin')) {
			  updateData.$set.tin = updateFields.tin;
			}
			if (updateFields.hasOwnProperty('bankName')) {
				updateData.$set.bankName = updateFields.bankName;
			}
			if (updateFields.hasOwnProperty('bankAccNumber')) {
				updateData.$set.bankAccNumber = updateFields.bankAccNumber;
			}
			if (updateFields.hasOwnProperty('description')) {
				updateData.$set.description = updateFields.description;
			}
			if (updateFields.hasOwnProperty('additional')) {
				updateData.$set.additional = updateFields.additional;
			}
			// if (updateFields.hasOwnProperty('companyType')) {
			//   updateData.$set.companyType = updateFields.companyType;
			// }
			// if (updateFields.hasOwnProperty('respPersonFullName')) {
			//   updateData.$set.respPersonFullName = updateFields.respPersonFullName;
			// }
			// if (updateFields.hasOwnProperty('currency')) {
			//   updateData.$set.currency = updateFields.currency;
			// }
			// if (updateFields.hasOwnProperty('partnerType')) {
			//   updateData.$set.partnerType = updateFields.partnerType;
			// }
			// if (updateFields.hasOwnProperty('productCategories')) {
			//   updateData.$set.productCategories = updateFields.productCategories;
			// }
			
			
			
	
			
			
			// Update the document with the constructed update object
			await Suppliers.updateOne(
			  { supplierId: documentId }, // Filter to find the document
			  updateData // Update operation
			);

			console.log("Fields updated successfully");
			return res.status(200).json({ 'message': `Supplier ID ${documentId} changed successfully` });
		} catch (error) {
			res.status(500).json({ success: false, message: 'Internal server error, no Supplier updated!'});
		}
		
	
	
	
	
}

const deleteSupplier = async (req, res) => {
	
	try {	
	   if (!req?.body?.id) return res.status(400).json({ "message": 'Supplier ID required' });
		
		
		const id = parseInt(req.body.id)
		
		const supplier = await Suppliers.findOne({ supplierId: id }).exec();
		if (!supplier) {
			return res.status(204).json({ 'message': `Supplier ID ${id} not found` });
		}
		const result = await Suppliers.deleteOne({ supplierId: id });
		res.status(200).json({ success: true, result });
	} catch (error) {
		res.status(500).json({ success: false, message: 'Internal server error, no Supplier deleted!'});
	}

}

const getSupplier = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'Supplier ID required' });
    const supplier = await Suppliers.findOne({ supplierId: req.params.id }).exec();
    if (!supplier) {
        return res.status(204).json({ 'message': `Supplier ID ${req.params.id} not found` });
    }
    res.json(supplier);
}

module.exports = {
	registerSupplier,
	updateSupplier,
	getAllSuppliers,
	deleteSupplier,
	getSupplier
}

