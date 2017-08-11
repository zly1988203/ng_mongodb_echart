var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/cart');
require('./models/cart_model.js');
var Address = mongoose.model('Address');
var Billing = mongoose.model('Billing');
var Product = mongoose.model('Product');
var ProductQuantity = mongoose.model('ProductQuantity');
var Order = mongoose.model('Order');
var Customer = mongoose.model('Customer');
// add product function
function addProduct(customer, order, name, imagefile, 
                    price, description, instock){
  var product = new Product({name:name, imagefile:imagefile, 
                             price:price, description:description, 
                             instock:instock});
  product.save(function(err, results){
    order.items.push(new ProductQuantity({quantity: 1, 
                                          product: [product]}));
    order.save();
    customer.save();
    console.log("Product " + name + " Saved.");
  });
}
Product.remove().exec(function(){
  Order.remove().exec(function(){
    Customer.remove().exec(function(){
      var shipping = new Address({
        name: 'Customer A',
        address: 'Somewhere',
        city: 'My Town',
        state: 'CA',
        zip: '55555'
      });
      var billing = new Billing({
        cardtype: 'Visa',
        name: 'Customer A',
        number: '1234567890',
        expiremonth: 1,
        expireyear: 2020,
        address: shipping
      });

        //customer infomation
      var customer = new Customer({
        userid: 'customerA',
        shipping: shipping,
        billing: billing,
        cart: []
      });
      customer.save(function(err, result){
        var order = new Order({
          userid: customer.userid,
          items: [],
          shipping: customer.shipping,
          billing: customer.billing
        });

        //init product
        order.save(function(err, result){
          addProduct(customer, order, 'Delicate Arch Print', 
              '1.jpg', 12.34,
              'View of the breathtaking Delicate Arch in Utah', 
              Math.floor((Math.random()*10)+1));
          addProduct(customer, order, 'Volcano Print', 
              '2.jpg', 45.45,
              'View of a tropical lake backset by a volcano', 
              Math.floor((Math.random()*10)+1));
          addProduct(customer, order, 'Tikal Structure Print', 
              '3.jpg', 38.52,
              'Look at the amazing architecture of early America.', 
              Math.floor((Math.random()*10)+1));
          addProduct(customer, order, 'Glacial Lake Print', 
              '4.jpg', 67.45,
              'Vivid color, crystal clear water from glacial runoff.', 
              Math.floor((Math.random()*10)+1));
            addProduct(customer, order, 'Glacial Lake Print',
                '5.jpg', 34.45,
                'ASIN: B01KUZ1Y5Y ' +
                'Item Model Number: DRUINA_BS',
                Math.floor((Math.random()*10)+1));
            addProduct(customer, order, 'Glacial Lake Print',
                '6.jpg', 111.45,
                'Vivid color, crystal Tommee Tippee.',
                Math.floor((Math.random()*10)+1));
        });
      });      
    });
  });
});