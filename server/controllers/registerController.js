const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    
	console.log(req.body);
	// check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: req.body.username }).exec();
    if (duplicate) return res.status(409).json({ 'message': `Conflict username already registered` }); //Conflict 
	
	const duplicateEmail = await User.findOne({ email: req.body.email }).exec();
    if (duplicateEmail) return res.status(409).json({ 'message': `Conflict email already registered` }); //Conflict
	
	
	
	console.log(req.body.username);
	
	try {
		req.body.password = await bcrypt.hash(req.body.password, 10);
		
		const userData = req.body;
		const newUser = new User(userData);
		await newUser.save();
		res.status(201).json({ success: true, message: 'New user registered succesfuly' });
		
		
	  } catch (error) {
		console.error('Error creating patient:', error);
		res.status(500).json({ success: false, message: 'Internal server error' });
	  }
	
	
	
}

const handleNewWorker = async (req, res) => {
    
	
	
	
	// check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: req.username }).exec();
    if (duplicate) return res.status(409).json({ 'message': `Conflict username already registered` }); //Conflict 
	
	const duplicateEmail = await User.findOne({ email: req.email }).exec();
    if (duplicateEmail) return res.status(409).json({ 'message': `Conflict email already registered` }); //Conflict
	
	
	
	
	try {
		req.password = await bcrypt.hash(req.password, 10);
		
		const userData = req;
		const newUser = new User(userData);
		await newUser.save();
		//res.status(201).json({ success: true, message: 'New user registered succesfuly' });
		
		
	  } catch (error) {
		console.error('Error creating patient:', error);
		//res.status(500).json({ success: false, message: 'Internal server error' });
	  }
	
	
	
}

module.exports = { handleNewUser,handleNewWorker };
