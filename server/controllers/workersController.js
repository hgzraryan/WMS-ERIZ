const Workers = require('../model/Workers');
const bcrypt = require('bcrypt');
const { handleNewWorker } = require('./registerController');
const User = require('../model/User');



const getAllWorkers = async (req, res) => {
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
			

		const workers = await Workers.aggregate([
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
				from: "workerroles", // Name of the suppliers collection
				localField: "workerRole", // Field in products collection 
				foreignField: "workerRoleId", // Field in suppliers collection 
				as: "workerRoleInfo" // Alias for the joined data
			}
		},
{
			$unwind: {
				path: "$workerRoleInfo", // Unwind to deconstruct the array of workerRoleInfo
				preserveNullAndEmptyArrays: true // Preserve documents without supplier info
			}
		},


		  {
			$project: {
				workerId:1,
				additional:1,
				contact: 1,
				dateOfBirth:1,
				emergencyContactName:1,
				emergencyContactNumber:1,
				fullName: 1,
				gender: 1,
				isActive: 1,
				maritalStatus:1,
				profileictureUrl: 1,
				username:1,
				workerRole:1,
				workerRoleName:"$workerRoleInfo.name",
				workerRoleType:"$workerRoleInfo.type",
 				createdAt:1,
				updatedAt:1,
			}
		  }
		]).exec();

		const count = await Workers.count({});
		if (!workers) return res.status(204).json({ 'message': 'No Worker lists found' });

		var jsonString = workers;
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

const registerWorker = async (req, res) => {


	try {
	
		const workerData = req.body;
		console.log(workerData);
		const newWorker = new Workers(workerData);
		await newWorker.save();
		
		
		
		
		
		
		if(workerData){
			try {
				const userEmail=workerData.contact.email;
				const firstName = workerData.fullName.split(' ').slice(0, 1).join(' ');
				const lastName = workerData.fullName.split(' ').slice(-1).join(' ');
				
				const userData = {
					username: workerData.username,
					password: workerData.password,
					email: userEmail,
					mobile: workerData.contact.phone,
					birthday: workerData.birthday,
					firstname: firstName,
					lastname: lastName,
					workerId: newWorker.workerId,
				};
				await handleNewWorker(userData, res);


				res.status(201).json({ success: true, message: 'New worker registered succesfuly' });

			} catch (error) {
				console.error('Error creating worker:', error);
				res.status(500).json({ success: false, message: 'Internal server error' });
			}
		}
		
		
		
		
		
		
		
		
		
		
		


	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: 'Internal server error, no product created!'});
	}
	


}
	
const updateWorker = async (req, res) => {
	
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
			if (updateFields.hasOwnProperty('fullName')) {
			  updateData.$set.fullName = updateFields.fullName;
			}
			if (updateFields.hasOwnProperty('gender')) {
				updateData.$set.gender = updateFields.gender;
			  }
			  if (updateFields.hasOwnProperty('maritalStatus')) {
				updateData.$set.maritalStatus = updateFields.maritalStatus;
			  }
			  if (updateFields.hasOwnProperty('dateOfBirth')) {
				updateData.$set.dateOfBirth = updateFields.dateOfBirth;
			  }
			if (updateFields.hasOwnProperty('additional')) {
			  updateData.$set.additional = updateFields.additional;
			}
			if (updateFields.hasOwnProperty('workerRole')) {
			  updateData.$set.workerRole = updateFields.workerRole;
			}
			if (updateFields.hasOwnProperty('emergencyContactName')) {
			  updateData.$set.emergencyContactName = updateFields.emergencyContactName;
			}
			if (updateFields.hasOwnProperty('emergencyContactNumber')) {
			  updateData.$set.emergencyContactNumber = updateFields.emergencyContactNumber;
			}
			
			// Update the document with the constructed update object
			await Workers.updateOne(
			  { workerId: documentId }, // Filter to find the document
			  updateData // Update operation
			);

			console.log("Fields updated successfully");
			return res.status(200).json({ 'message': `Partner ID ${documentId} changed successfully` });
		} catch (error) {
			res.status(500).json({ success: false, message: 'Internal server error, no Partner updated!'});
		}
		
	
	
	
	
}

const deleteWorker = async (req, res) => {
	
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
	registerWorker,
	updateWorker,
	getAllWorkers,
	deleteWorker
}

