var mongoose=require('mongoose');
var Product=mongoose.model('Product');

//Query the goods
exports.getProduct=function(req,res){
	Product.findOne({_id:req.query.productId})
		.exec(function(err,product){
			if(err){
				throw err;
			}
			if(!product){
				res.json(404,{msg:'Product Not Found!'});
			}else{
				res.json(product);
			}
		});
};

//Query goods list
exports.getProducts=function(req,res){
	Product.find()
		.exec(function(err,products){
			if(err){
				throw err;
			}
			if(!products){
				res.json(404,{msg:'Products Not Found!'});
			}else{
				res.json(products);
			}
		});
};