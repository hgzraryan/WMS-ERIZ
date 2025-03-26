const Partners = require('../model/Partners');


const getAllPartners = async (req, res) => {
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
			

		const partners = await Partners.aggregate([
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
				partnerId:1,
				name:1,
				companyType:1,
				respPersonFullName:1,
				bankName:1,
				bankAccNumber:1,
				currency:1,
				partnerType:1,
				contact: 1,
				tin: 1,
				productCategories:1,
				additional:1,
				createdAt:1,
				updatedAt:1
			}
		  }
		]).exec();

		const count = await Partners.count({});
		if (!partners) return res.status(204).json({ 'message': 'No Partners lists found' });

		var jsonString = partners;
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

const registerPartner = async (req, res) => {


	try {
	
		const partnerData = req.body;
		const newPartners = new Partners(partnerData);
		await newPartners.save();
		res.status(201).json({ success: true, message: 'New partner registered succesfuly' });


	} catch (error) {
		res.status(500).json({ success: false, message: 'Internal server error, no partner created!'});
	}
	


}
	
const updatePartner = async (req, res) => {
	

	
	
	
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
		
	
	
	
	
}

const deletePartner = async (req, res) => {
	
	try {	
	   if (!req?.body?.id) return res.status(400).json({ "message": 'Patner ID required' });
		
		
		const id = parseInt(req.body.id)
		
		const partner = await Partners.findOne({ partnerId: id }).exec();
		if (!partner) {
			return res.status(204).json({ 'message': `Patner ID ${id} not found` });
		}
		const result = await Partners.deleteOne({ partnerId: id });
		res.status(200).json({ success: true, result });
	} catch (error) {
		res.status(500).json({ success: false, message: 'Internal server error, no Partner deleted!'});
	}

}
const getPartner = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'Partner ID required' });
    const partner = await Partners.findOne({ partnerId: req.params.id }).exec();
    if (!partner) {
        return res.status(204).json({ 'message': `Partner ID ${req.params.id} not found` });
    }
    res.json(partner);
}

module.exports = {
	registerPartner,
	updatePartner,
	getAllPartners,
	deletePartner,
	getPartner
}

