const WorkerRoles = require('../model/WorkerRoles');





const getAllWorkerRoles = async (req, res) => {
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
			

		const workerRoles = await WorkerRoles.aggregate([
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
				workerRoleId:1,
				name:1,
				type:1,
				isActive:1,
				additional:1,
 				createdAt:1,
				updatedAt:1
			}
		  }
		]).exec();

		const count = await WorkerRoles.count({});
		if (!workerRoles) return res.status(204).json({ 'message': 'No Worker role lists found' });

		var jsonString = workerRoles;
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

const registerWorkerRole = async (req, res) => {


	try {
	
		const workerRoleData = req.body;
		console.log(workerRoleData);
		const newWorkerRole = new WorkerRoles(workerRoleData);
		await newWorkerRole.save();
		res.status(201).json({ success: true, message: 'New worker role registered succesfuly' });


	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: 'Internal server error, no product created!'});
	}
	


}
	
const updateWorkerRole = async (req, res) => {
/*	
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
			if (updateFields.hasOwnProperty('companyType')) {
			  updateData.$set.companyType = updateFields.companyType;
			}
			if (updateFields.hasOwnProperty('respPersonFullName')) {
			  updateData.$set.respPersonFullName = updateFields.respPersonFullName;
			}
			if (updateFields.hasOwnProperty('bankName')) {
			  updateData.$set.bankName = updateFields.bankName;
			}
			if (updateFields.hasOwnProperty('bankAccNumber')) {
			  updateData.$set.bankAccNumber = updateFields.bankAccNumber;
			}
			if (updateFields.hasOwnProperty('currency')) {
			  updateData.$set.currency = updateFields.currency;
			}
			if (updateFields.hasOwnProperty('partnerType')) {
			  updateData.$set.partnerType = updateFields.partnerType;
			}
			if (updateFields.hasOwnProperty('productCategories')) {
			  updateData.$set.productCategories = updateFields.productCategories;
			}
			if (updateFields.hasOwnProperty('additional')) {
			  updateData.$set.additional = updateFields.additional;
			}
			
			
			
	
			
			
			// Update the document with the constructed update object
			await Partners.updateOne(
			  { partnerId: documentId }, // Filter to find the document
			  updateData // Update operation
			);

			console.log("Fields updated successfully");
			return res.status(200).json({ 'message': `Partner ID ${documentId} changed successfully` });
		} catch (error) {
			res.status(500).json({ success: false, message: 'Internal server error, no Partner updated!'});
		}
		
	
	
	*/
	
}

const deleteWorkerRole = async (req, res) => {
	
	try {	
	   if (!req?.body?.id) return res.status(400).json({ "message": 'Worker ID required' });
		
		
		const id = parseInt(req.body.id)
		
		const worker = await Workers.findOne({ workerId: id }).exec();
		if (!worker) {
			return res.status(204).json({ 'message': `Worker ID ${id} not found` });
		}
		const result = await Workers.deleteOne({ workerId: id });
		res.status(200).json({ success: true, result });
	} catch (error) {
		res.status(500).json({ success: false, message: 'Internal server error, no Partner deleted!'});
	}

}


module.exports = {
	registerWorkerRole,
	updateWorkerRole,
	getAllWorkerRoles,
	deleteWorkerRole
}

