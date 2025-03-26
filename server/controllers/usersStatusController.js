const User = require('../model/User');

const changeUserStatus = async (req, res) => {





 try {


     const userIdFromRequest = req.body.id;
        const parsedId = parseInt(userIdFromRequest);
	const parsedStatus = parseInt(req.body.userStatus); 
          User.findOneAndUpdate(
            { userId: parsedId }, // Filter criteria

            { $set: { isActive: parsedStatus } },// Update document


            { new: true } // Return the updated document
        )
        .then(updatedUsers => {
            if (updatedUsers) {
                //console.log('Updated diagnostics:', updatedDiagnostics);
                res.status(201).json({ success: true, message: 'User status updated successfully' });


            } else {
                //console.log('Diagnostics not found');
                res.status(400).json({ success: false, message: 'User not found' });
            }
        })
        .catch(error => {
            //`console.error('Error updating diagnostics:', error);
                res.status(500).json({ success: true, message: 'Error updating user status' });

        });




  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }





}
	
	


module.exports = {
	changeUserStatus
}

