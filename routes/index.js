var express = require('express');
var router = express.Router();
var Article = require('../db/article');
var Comment = require('../db/comment');
var setting = require('../db/setting');
var formidable = require('formidable');
// var setting = require('../setting');
var fs = require('fs');
var url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/list/:num',function(req, res){
  res.set({
    'Access-Control-Allow-Origin':'*'
  })
	var reg = /\d+$/;
	var url_path = req.originalUrl.replace(reg,"");
	var num = parseInt(req.params.num),
		perPage = setting.perPage;
	  
    Article.get(null, null, true, function(data, time){
		console.log("excuse me??: "+perPage);
		var totnum = Math.ceil(data.length / perPage);
		var start, end;
		
		if(num==0) {start=0,end=2;}
		else {if(num==totnum-1) start=(totnum-3)>=0?(totnum-3):0,end=totnum-1;
		else start=num-1,end=num+1;}
		if(end>=totnum) end=totnum-1;

    console.log(data.slice(num*perPage,(num+1)*perPage))
		res.json({
			data: JSON.stringify(data.slice(num*perPage,(num+1)*perPage)), 
			navi: time, 
			len: totnum, 
			start: start,  //guide span start
			end: end,      //end span start
			path: url_path
		});
	});
})

router.get('/document/:id',function(req, res){
  res.set({
    'Access-Control-Allow-Origin':'*'
  })
	Article.get(req.params.id,null,true, function(data, time){
		console.log(data);
		res.json({data: data, navi: time});
	})
})

module.exports = router;
