
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

//Define the address mode
var AddressSchema=new Schema({
	name:String,
	address:String,
	city:String,
	state:String,
	zip:String
},{_id:false});

mongoose.model('Address',AddressSchema);

//Define the billing mode
var BillingSchema=new Schema({
	cardtype:{type:String,enum:['Visa','MasterCard','Amex']},
	name:String,
	number:String,
	expiremonth:Number,
	expireyear:Number,
	address:[AddressSchema]
},{_id:false});

mongoose.model('Billing',BillingSchema);

//Defining the product model
var ProductSchema=new Schema({
	name:String,
	imagefile:String,
	description:String,
	price:Number,
	instock:Number
});

mongoose.model('Product',ProductSchema);

//The number of product definition model
var ProductQuantitySchema=new Schema({
	quantity:Number,
	product:[ProductSchema]
},{_id:false});

mongoose.model('ProductQuantity',ProductQuantitySchema);

//Define orders model
var OrderSchema=new Schema({
	userid:String,
	items:[ProductQuantitySchema],
	shipping:[AddressSchema],
	billing:[BillingSchema],
	status:{type:String,default:'Pending'},
	timestamp:{type:Date,default:Date.now}
});

mongoose.model('Order',OrderSchema);

//Define the customer model
var Customer=new Schema({
	userid:{type:String,unique:true,required:true},
	shipping:[AddressSchema],
	billing:[BillingSchema],
	cart:[ProductQuantitySchema]
});

mongoose.model('Customer',Customer);
