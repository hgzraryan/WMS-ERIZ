const Manufacturers = require('../model/Manufacturers');

const registerManufacturer = async (req, res) => {


    try {
    
        const manufacturerData = req.body;
        const newManufacturers = new Manufacturers(manufacturerData);
        await newManufacturers.save();
        res.status(201).json({ success: true, message: 'New manufacturer registered succesfuly' });


    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error, no partner created!'});
    }
    


}
const getAllManufacturers = async (req, res) => {
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
            

        const manufacturers = await Manufacturers.aggregate([
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
                manufacturerId:1,
                name:1,
                companyType:1,
                additionalData:1,
                createdAt:1,
                updatedAt:1
            }
          }
        ]).exec();

        const count = await Manufacturers.count({});
        if (!manufacturers) return res.status(204).json({ 'message': 'No Manufacturers lists found' });

        var jsonString = manufacturers;
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


    
const updateManufacturer = async (req, res) => {
    

    
    
    
        try {
            const updateFields = req.body.updatedFields;
            const documentId = req.body.id;

            const updateData = { $set: {} };

            // Check if 'contact' property exists in the request data
            // if (updateFields.hasOwnProperty('contact')) {
            //   const contactData = updateFields.contact;

            //   // Construct the update object for the 'contact' field
            //   for (const key in contactData) {
            //     if(key == 'address'){
            //         continue;
            //     }
            //     if (contactData.hasOwnProperty(key)) {
            //       updateData.$set[`contact.${key}`] = contactData[key];
            //     }
            //   }
              
              
            //   if (contactData.hasOwnProperty('address')) {
            //     //updateData.$set.contact.address = contactData.address;
            //     const addressData = contactData.address;
                
            //     for (const key in addressData) {
            //         if (addressData.hasOwnProperty(key)) {
            //           updateData.$set[`contact.address.${key}`] = addressData[key];
            //         }
            //       }
                
                
            //   }
              
              
              
            // }
            
            
            
            

            // Add other fields to the $set operation if they exist in the request data
            if (updateFields.hasOwnProperty('name')) {
              updateData.$set.name = updateFields.name;
            }
            if (updateFields.hasOwnProperty('companyType')) {
              updateData.$set.companyType = updateFields.companyType;
            }
            if (updateFields.hasOwnProperty('additional')) {
              updateData.$set.additional = updateFields.additional;
            }
            
            // Update the document with the constructed update object
            await Manufacturers.updateOne(
              { manufacturerId: documentId }, // Filter to find the document
              updateData // Update operation
            );

            console.log("Fields updated successfully");
            return res.status(200).json({ 'message': `Partner ID ${documentId} changed successfully` });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error, no Partner updated!'});
        }
        
    
    
    
    
}

const deleteManufacturer = async (req, res) => {
    
    try {	
       if (!req?.body?.id) return res.status(400).json({ "message": 'Manufacturer ID required' });
        
        
        const id = parseInt(req.body.id)
        
        const manufacturer = await Manufacturers.findOne({ manufacturerId: id }).exec();
        if (!manufacturer) {
            return res.status(204).json({ 'message': `Manufacturer ID ${id} not found` });
        }
        const result = await Manufacturers.deleteOne({ manufacturerId: id });
        res.status(200).json({ success: true, result });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error, no Partner deleted!'});
    }

}

module.exports = {
    registerManufacturer,
    updateManufacturer,
    getAllManufacturers,
    deleteManufacturer,
}

