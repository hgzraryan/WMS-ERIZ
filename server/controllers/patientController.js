const PatientsList = require('../model/PatientsList');

const getAllPatients = async (req, res) => {
    
	const page = req.body.page;
    const onPage = req.body.onPage;
	
	if(req.body.page==1){
		skipParam=0;
	}else{
		skipParam = parseInt(req.body.page)*onPage-onPage;
	}
	
	
	const resList = await PatientsList.find().limit(onPage).skip(skipParam);
	
		
	
    if (!resList) return res.status(204).json({ 'message': 'No patient lists found' });
	
	
	var jsonString = resList;

   

   
    var mainObj = {
        errorCode: 0,
        jsonString			
    }
	
    res.json(mainObj);
}

const registerPatient = async (req, res) => {
	const { firstName, lastName, midName, age, email, mobile, handlingDate, address, researchList, totalPrice, additional } = req.body;
	
	
	console.log(req.body);
	
    if (firstName || lastName) {
		
		const result = await PatientsList.create({
            "firstName":firstName,
            "lastName":lastName,
			"midName": midName,
            "age": age,
			"email":email,
			"mobile" : mobile,
			"handlingDate" : handlingDate,
			"address" : address,
			"researchList" : researchList,
			"additional" : additional
        });
		return res.status(201).json({ 'message': 'Patient registered succesfuly' });
		
	} else {
		return res.status(400).json({ 'message': 'First Name and Last Name are required.' });
	}

}
module.exports = {
    getAllPatients,
	registerPatient
}