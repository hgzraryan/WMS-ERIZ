const IncomingProducts = require('../model/IncomingProducts');
const moment = require('moment'); 

const repeatIncoming = async (req, res) => {
    try {
        const { incomingProductId } = req.body; // Extract incomingProductId from request body

        if (!incomingProductId) {
            return res.status(400).json({ success: false, message: 'Missing incomingProductId' });
        }

        // Find the document by incomingProductId
        const doc = await IncomingProducts.findOne({ incomingProductId });

        if (!doc) {
            return res.status(404).json({ success: false, message: 'Document not found' });
        }

        // Convert the document to an object and remove `_id`
        const newDoc = doc.toObject();
        delete newDoc._id; // Ensure MongoDB assigns a new _id
		
		if(doc.dimensions.weight){
			newDoc.balance = doc.dimensions.weight;
		}else if(doc.dimensions.volume){
			newDoc.balance = doc.dimensions.volume;			
		}else{
			newDoc.balance = 0;
		}
		newDoc.actionDate = moment().format('YYYY-MM-DD HH:mm');	
		
		console.log(newDoc.actionDate);
        // Generate a new unique incomingProductId (optional)
        //newDoc.incomingProductId = `${incomingProductId}-copy-${Date.now()}`;

        // Insert the duplicated document
        const duplicatedDoc = await IncomingProducts.create(newDoc);

        res.status(201).json({ success: true, data: duplicatedDoc });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = {
    repeatIncoming
};
