const User = require('../model/User');


const getAllCount = async (req, res) => {
	
	const countUser = await User.find().count();
	if(countUser){
		var usersCount = countUser;
	}else{
		var usersCount = "";
	}
	
	var mainObj = {
        errorCode: 0,
        usersCount:parseInt(usersCount),
    }
	res.json(mainObj);
}


module.exports = {
    getAllCount,

}
