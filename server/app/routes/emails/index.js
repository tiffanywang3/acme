'use strict';
var router = require('express').Router();
module.exports = router;
var axios = require ('axios');

if (process.env.NODE_ENV === 'production'){
	var mandrill = process.env.MANDRILL_KEY;
} else {
	var mandrill = require ('../../../env/mandrill.js');
}


	var messagePost = {
		'key': mandrill.key,
	    'message': {
	      from_email: 'acme@acmestackstore.com',
	      from_name: 'ACME inc.',
	      headers: {
	        'Reply-To': 'acme@acmestackstore.com'
	      }
	    }
  	};


router.post('/:type', function(req, res, next){
    
    var order = req.body;
    var type = req.params.type;

	setMessageHtml(order, type);

  	messagePost.message.to= [
          {
            name: order.email,
            email: order.email,
            'type': 'to'
          }
        ];

	    
	 axios.post('https://mandrillapp.com/api/1.0/messages/send.json', messagePost )
	 .then (function (response){
		res.send("email sent");
	 })
	 .catch (function (response){
		res.status(404).send('email send failed');
	 })


})





  	function setMessageHtml (order, type) {
  		if (type === "ordered"){ 
  			messagePost.message.subject="ACME inc Order Confirmation";
  			messagePost.message.html = "<html><head><meta charset='utf-8'></head><body><div class='row'><h1>" + order.email + ", your order has been placed!</h1><h2>Confirmation #" + order._id + "</h2></div></body></html>"
  		}
  		else if (type === "shipped"){
  			messagePost.message.subject="Your ACME inc order has shipped";
  			messagePost.message.html = "<html><head><meta charset='utf-8'></head><body><div class='row'><h1>" + order.email + ", your order has shipped!</h1><h2>Confirmation #" + order._id + "</h2></div></body></html>"
  		}
  		else if (type === "cancelled"){
  			messagePost.message.subject="Your ACME inc order was cancelled";
  			messagePost.message.html = "<html><head><meta charset='utf-8'></head><body><div class='row'><h1>" + order.email + ", your order was cancelled!</h1><h2>Confirmation #" + order._id + "</h2></div></body></html>"
  		}
  		else{
  			messagePost.message.subject="Your ACME inc order was delivered";
  			messagePost.message.html = "<html><head><meta charset='utf-8'></head><body><div class='row'><h1>" + order.email + ", your order has was delivered!</h1><h2>Confirmation #" + order._id + "</h2></div></body></html>"
  		}
  	}