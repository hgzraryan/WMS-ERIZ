const EquipmentList = require('../model/Equipments');

const getEquipmentList = async (req, res) => {
    
	const page = req.body.page;
    const onPage = req.body.onPage;
	
	if(req.body.page==1){
		skipParam=0;
	}else{
		skipParam = parseInt(req.body.page)*onPage-onPage;
	}
	
	
	const resList = await EquipmentList.find().limit(onPage).skip(skipParam);
	
		
	
    if (!resList) return res.status(204).json({ 'message': 'No research lists found' });
	
	
	var jsonString = resList;
    //var jsonCount = count
   
   console.log(jsonString);
   console.log("111");
   
   
    var mainObj = {
        errorCode: 0,
      //  count:parseInt(jsonCount),
        jsonString			
    }
	
    res.json(mainObj);
}


module.exports = {
    getEquipmentList
}