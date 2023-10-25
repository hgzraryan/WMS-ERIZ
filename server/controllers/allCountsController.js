const User = require('../model/User');
const PatientsList = require('../model/PatientsList');

const getAllCount = async (req, res) => {
	
	const countUser = await User.find().count();
	if(countUser){
		var usersCount = countUser;
	}else{
		var usersCount = "";
	}
	
    const countPatients = await PatientsList.find().count();
	if(countPatients){
		var patientsCount = countPatients;
	}else{
		var patientsCount = "";
	}
	
	var mainObj = {
        errorCode: 0,
        usersCount:parseInt(usersCount),
        patientsCount:parseInt(patientsCount)
    }
	
	res.json(mainObj);
   
}


module.exports = {
    getAllCount,

}
