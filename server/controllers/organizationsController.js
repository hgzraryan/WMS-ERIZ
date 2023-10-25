const Organizations = require('../model/Organizations');

const getOrganizations = async (req, res) => {
    
	const page = req.body.page;
    const onPage = req.body.onPage;
	
	if(req.body.page==1){
		skipParam=0;
	}else{
		skipParam = parseInt(req.body.page)*onPage-onPage;
	}
	
	
	const OrganizationsList = await Organizations.find().limit(onPage).skip(skipParam);
	const count = await Organizations.count({});
		
	
    if (!OrganizationsList) return res.status(204).json({ 'message': 'No research lists found' });
	
	
	var jsonString = OrganizationsList;
    var jsonCount = count

   
  
   
    var mainObj = {
        errorCode: 0,
        count:parseInt(jsonCount),
        jsonString			
    }
	
    res.json(mainObj);
}


module.exports = {
    getOrganizations
}
