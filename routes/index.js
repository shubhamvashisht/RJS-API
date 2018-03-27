var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("************DROIDMAN*************")
});

router.get('/state',function(req, res){
	var directories = fs.readdirSync('./public/assets/sections')
	var result = [];
	for(let i=0;i<directories.length;i++){
		result.push({
			state : directories[i]
		})
	}
	var jsonRes = JSON.stringify(result)
	console.log(jsonRes)
	res.send(jsonRes)
})

router.get('/state/:state/',function(req,res){
	var filesList=[]
	fs.readdir('./public/assets/sections/'+req.params.state,function(err,files){
		if (err){
			console.log('no files exist')
		}
		else{
			for(let i=0;i<files.length;i++){
				filesList.push({
					id : i,
					link : path.resolve('./public/assets/sections/'+req.params.state+"/"+files[i]),
					name : files[i]
				})
			}
			var jsonRes = JSON.stringify(filesList)
			res.send(jsonRes)
		}
	})
})
module.exports = router;
