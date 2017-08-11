

var mongoose=require('mongoose');
var Customer=mongoose.model('Customer');
var Order=mongoose.model('Order');
var Address=mongoose.model('Address');
var Billing=mongoose.model('Billing');


//According to the order number to find the order for the order
exports.getOrder=function(req,res){
	Order.findOne({_id:req.query.orderId})
		.exec(function(err,order){
			if(err){
				throw err;
			}
			if(!order){
				res.json(404,{msg:'Order Not Found!'});
			}else{
				res.json(order);
			}
		});
};

//Find the orders all belong to the current user name order
exports.getOrders=function(req,res){
	Order.find({userid:'customerA'})
		.exec(function(err,orders){
			if(err){
				throw err;
			}
			if(!orders){
				res.json(404,{msg:'Orders Not Found!'});
			}else{
				res.json(orders);
			}
		});
};

// to find the order
exports.getOrder=function(req,res){
	Order.findOne({_id:req.query.orderId})
		.exec(function(err,order){
			if(err){
				throw err;
			}
			if(!order){
				res.json(404,{msg:'Order Not Found!'});
			}else{
				res.json(order);
			}
		});
};

//Add the order information
exports.addOrder=function(req,res){
	var orderShipping=new Address(req.body.updateShipping);	
	var orderBilling=new Billing(req.body.updateBilling);	
	var orderItems=req.body.orderItems;

	var newOrder=new Order({
		userid:'customerA',
		items:orderItems,
		shipping:orderShipping,
		billing:orderBilling,
	});

	newOrder.save(function(err,results){
		if(err){
			res.json(500,'Failed to save Order!');
		}else{
			//Save to order after the success, empty shopping cart
			Customer.update({userid:'customerA'},{$set:{cart:[]}})
				.exec(function(err,results){
					if(err||results<1){
						res.json(404,{msg:'Failed to update Cart!'});
					}else{
						res.json({msg:'Order Saved!'});
					}
				});
		}
	});
};
