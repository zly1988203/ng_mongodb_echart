var express=require('express');

module.exports=function(app){
	//load controllers
	var customers=require('./controllers/customers_controller');
	var products=require('./controllers/product_controller');
	var orders=require('./controllers/orders_controller');
    var chart=require('./controllers/chart_controller');

	//config resources
	app.use('/static',express.static('./static'));
	app.use('/images',express.static('./images'));
	app.use('/lib',express.static('./lib'));

	//config routes
	app.get('/',function(req,res){
		res.render('shopping');
	});

	// get goods
	app.get('/products/get',products.getProducts);

	//get and add orders
	app.get('/orders/get',orders.getOrders);
	app.post('/orders/add',orders.addOrder);

	//customer and cart
	app.get('/customers/get',customers.getCustomer);
	app.post('/customers/update/shipping',customers.updateShipping);
	app.post('/customers/update/billing',customers.updateBilling);
	app.post('/customers/update/cart',customers.updateCart);
};