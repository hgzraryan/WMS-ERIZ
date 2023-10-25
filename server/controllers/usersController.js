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
			
		
		
		
	
	const users = await User.find().limit(onPage).skip(skipParam);
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
	
	
	
	
    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.body.id} not found` });
    }
    const result = await user.deleteOne({ _id: req.body.id });
    res.json(result);
}

const getUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.params.id }).exec();
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

module.exports = {
    getAllUsers,
    deleteUser,
    getUser,
    getUsersCount
}
