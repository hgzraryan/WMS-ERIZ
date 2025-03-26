const User = require('../model/User');

const getAllUsers = async (req, res) => {
    
	const page = req.body.page;
    const onPage = req.body.onPage;
	
	
	if(req.body.page==1){
		skipParam=0;
	}else{
		skipParam = parseInt(req.body.page)*onPage-onPage;
	}
		
		
		
		
		
		
		//const jsonArray = await User.find({ [fby] : new RegExp([fdata], 'i')}).limit(onPage).skip(skipParam).select({ first_name: 1, last_name: 1, email: 1, merchantId: 1, terminalId: 1, merchantIdBind: 1, terminalIdBind: 1, isadmin: 1, isactive: 1});
			
		
		
		
	
	const users = await User.find().limit(onPage).skip(skipParam).sort({_id:-1});
	const count = await User.count({});

	

	
	
	
    if (!users) return res.status(204).json({ 'message': 'No users found' });
	
	
    var jsonString = users;
    var jsonCount = count
   
    var mainObj = {
        errorCode: 0,
        count:parseInt(jsonCount),
        jsonString			
    }
	
    res.json(mainObj);
}

const deleteUser = async (req, res) => {
   
console.log(req.body);
   if (!req?.body?.id) return res.status(400).json({ "message": 'User ID required' });
	
	
	
	
    const user = await User.findOne({ userId: req.body.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.body.id} not found` });
    }
    const result = await user.deleteOne({ userId: req.body.id });
    res.json(result);
}

const getUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ userId: req.params.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
    }
    res.json(user);
}
const getUsersCount = async (req, res) => {
	const count = await User.find().count();
    if (!count) return res.status(204).json({ 'message': 'No users found' });
	res.json(count);
}

const updateUser = async (req, res) => {
	console.log(req.body);
	
	
			if(req.body.updatedFields.email){
				const duplicate = await User.findOne({ email: req.body.updatedFields.email }).exec();
				if (duplicate) return res.status(409).json({ 'message': `Conflict email already registered` }); //Conflict 
			}
	
		
	
			try {
				const updateFields = req.body.updatedFields;
				const documentId = req.body.id;

				const updateData = { $set: {} };

				
				
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
				if (updateFields.hasOwnProperty('firstname')) {
				  updateData.$set.firstname = updateFields.firstname;
				}
				if (updateFields.hasOwnProperty('lastname')) {
				  updateData.$set.lastname = updateFields.lastname;
				}
				if (updateFields.hasOwnProperty('email')) {
				  updateData.$set.email = updateFields.email;
				}
				if (updateFields.hasOwnProperty('gender')) {
				  updateData.$set.gender = updateFields.gender;
				}
				if (updateFields.hasOwnProperty('additionalData')) {
				  updateData.$set.additionalData = updateFields.additionalData;
				}
				if (updateFields.hasOwnProperty('maritalStatus')) {
				  updateData.$set.maritalStatus = updateFields.maritalStatus;
				}
				if (updateFields.hasOwnProperty('birthday')) {
				  updateData.$set.birthday = updateFields.birthday;
				}
				
				
				
				console.log(updateData);
				
				
				// Update the document with the constructed update object
				await User.updateOne(
				  { userId: documentId }, // Filter to find the document
				  updateData // Update operation
				);

				console.log("Fields updated successfully");
				return res.status(200).json({ 'message': `User ID ${documentId} changed successfully` });
			} catch (error) {
				console.error("Error updating fields:", error);
			}
	
	
	
	
	
	
	
	
	
}
const changeUserPassword = async (req, res) => {
	console.log(req.bod);	
	
try {
	
	const userId = req.body.userId; // Replace with actual user ID
	const oldPassword = req.body.oldPassword; // Replace with actual old password
	const newPassword = req.body.newPassword; // Replace with new password
	const confirmNewPassword = req.body.confirmNewPassword; // Replace with confirmed new password
    
    // Fetch the user by userId
    const user = await User.findOne({ userId });

    if (!user) {
      console.log('User not found');
      return;
    }

    // Verify the old password
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      console.log('Old password is incorrect');
	  res.status(200).json({ success: false, message: 'Old password is incorrect'});
      return;
	  
    }

    // Check if newPassword matches confirmNewPassword
    if (newPassword !== confirmNewPassword) {
      console.log('New password and confirmation do not match');
	  	  res.status(200).json({ success: false, message: 'New password and confirmation do not match'});

      return;
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the user's password in MongoDB
    user.password = hashedPassword;
    await user.save();

    console.log('Password changed successfully');
		  	  res.status(200).json({ success: true, message: 'Password changed successfully'});


} catch (error) {
console.error('Error changing password:', error);
res.status(200).json({ success: true, message: error});
} 
	

	
	
	
	

}	


module.exports = {
    getAllUsers,
    deleteUser,
    getUser,
    getUsersCount,
	updateUser,
	changeUserPassword
}
