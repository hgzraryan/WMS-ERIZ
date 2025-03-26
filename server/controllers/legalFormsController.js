const Legalforms = require('../model/Legalforms');


const getAllLegalForms = async (req, res) => {
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
			

		const legalforms = await Legalforms.aggregate([
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
				legalformId:1,
				name:1,
				additional:1
			}
		  }
		]).exec();
		
		//const diagnosticsList = await Diagnostics.find().limit(onPage).skip(skipParam).sort({_id:-1}) ;
		const count = await Legalforms.count({});

		
			
		
		if (!legalforms) return res.status(204).json({ 'message': 'No Legal forms lists found' });
		
		var jsonString = legalforms;
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

const registerLegalForm = async (req, res) => {


	try {
		const legalformData = req.body;
		const newLegalForms = new Legalforms(legalformData);
		await newLegalForms.save();
		res.status(201).json({ success: true, message: 'New Legal form registered succesfuly' });
	} catch (error) {
		res.status(500).json({ success: false, message: 'Internal server error, no legal form created!'});
	}



}
	
const updateLegalForm = async (req, res) => {
	

	
	
	
		try {
			const updateFields = req.body.updatedFields;
			const documentId = req.body.id;

			const updateData = { $set: {} };

							

			// Add other fields to the $set operation if they exist in the request data
			if (updateFields.hasOwnProperty('name')) {
			  updateData.$set.name = updateFields.name;
			}
			if (updateFields.hasOwnProperty('additional')) {
			  updateData.$set.additional = updateFields.additional;
			}
			
			
			
	
			
			
			// Update the document with the constructed update object
			await Legalforms.updateOne(
			  { legalformId: documentId }, // Filter to find the document
			  updateData // Update operation
			);

			return res.status(200).json({ success: true, message: `Legal form ID ${documentId} changed successfully` });
		} catch (error) {
			res.status(500).json({ success: false, message: 'Internal server error, no Legal form updated!'});
		}
	
}

const deleteLegalForm = async (req, res) => {
	try {
			
		if (!req?.body?.id) return res.status(400).json({ "message": 'Legal form ID required' });
		
		const id = parseInt(req.body.id)
		
		const legalform = await Legalforms.findOne({ legalformId: id }).exec();
		if (!legalform) {
				return res.status(204).json({ success: true, message: `Legal form ID ${id} not found` });
			}
			
		const result = await Legalforms.deleteOne({ legalformId: id });
		res.status(200).json({ success: true, result });
	} catch (error) {
		res.status(500).json({ success: false, message: 'Internal server error, no legal form deleted!'});
	}
	
}


module.exports = {
	registerLegalForm,
	updateLegalForm,
	getAllLegalForms,
	deleteLegalForm
}

