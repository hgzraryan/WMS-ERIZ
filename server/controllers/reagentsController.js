const ReagentList = require('../model/Reagents');

const getReagentList = async (req, res) => {
    
	const page = req.body.page;
    const onPage = req.body.onPage;
	
	if(req.body.page==1){
		skipParam=0;
	}else{
		skipParam = parseInt(req.body.page)*onPage-onPage;
	}
	
	
	const Reagents = await ReagentList.find().limit(onPage).skip(skipParam);
	const count = await ReagentList.count({});
		
	console.log(req.body);
    if (!Reagents) return res.status(204).json({ 'message': 'No research lists found' });
	
	
	var jsonString = Reagents;
    var jsonCount = count

   
  
   
    var mainObj = {
        errorCode: 0,
        count:parseInt(jsonCount),
        jsonString			
    }
	
    res.json(mainObj);
}


module.exports = {
    getReagentList
}
