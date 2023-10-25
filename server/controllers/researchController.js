const ResearchList = require('../model/ResearchList');

const getAllResearch = async (req, res) => {
    
	const page = req.body.page;
    const onPage = req.body.onPage;
	
	if(req.body.page==1){
		skipParam=0;
	}else{
		skipParam = parseInt(req.body.page)*onPage-onPage;
	}
	
	
	const resList = await ResearchList.find().limit(onPage).skip(skipParam);
	
		
	
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

const getResearchCategory = async (req, res) => {
    
	
	const resCatList = await ResearchList.find().limit(onPage).skip(skipParam);
	
    if (!resCatList) return res.status(204).json({ 'message': 'No category lists found' });
	
	var jsonString = resCatList;
   
    var mainObj = {
        errorCode: 0,
        jsonString			
    }
	
    res.json(mainObj);
}

module.exports = {
    getAllResearch,
    getResearchCategory
}