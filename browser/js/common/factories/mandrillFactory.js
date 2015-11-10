app.factory('Mandrill', function ($http){
	
	var MandrillFactory = {}

    // var mandrill = require('mandrill-api/mandrill');
    // var mandrill_client = new mandrill.Mandrill('MKQ7pv_KpEFpT8UiyH4-Aw');

	var messagePost = {
		'key': 'MKQ7pv_KpEFpT8UiyH4-Aw',
	    'message': {
	      from_email: 'acme@acmestackstore.com',
	      from_name: 'ACME inc.',
	      headers: {
	        'Reply-To': 'acme@acmestackstore.com'
	      }
	    }
  	};

  	MandrillFactory.setMessageHtml = function (user, order, type){
  		if (type === "confirmation"){
  			messagePost.message.subject="ACME inc Order Confirmation";
  			messagePost.message.html = "<html><head><meta charset='utf-8'></head><body><div class='row'><h1>" + order.email + ", your order has been placed!</h1><h2>Confirmation #" + order._id + "</h2></div></body></html>"
  		}
  		else if (type === "shipping"){
  			messagePost.message.subject="Your ACME inc order has shipped";
  			messagePost.message.html = "<html><head><meta charset='utf-8'></head><body><div class='row'><h1>" + order.email + ", your order has shipped!</h1><h2>Confirmation #" + order._id + "</h2></div></body></html>"
  		}
  		else{
  			messagePost.message.subject="Your ACME inc order was delivered";
  			messagePost.message.html = "<html><head><meta charset='utf-8'></head><body><div class='row'><h1>" + order.email + ", your order has was delivered!</h1><h2>Confirmation #" + order._id + "</h2></div></body></html>"
  		}
  	}


	MandrillFactory.sendEmail = function (user, order, type){

		  setMessageHtml(user, order, type);

		  messagePost.message.to= [
		          {
		            name: order.email,
		            email: order.email,
		            'type': 'to'
		          }
		        ];

	     return $http.post('https://mandrillapp.com/api/1.0//messages/send.json', { messagePost })
		  .success(function(data, status, headers, config){
		    // log success
		    console.log("email sent");
		  });
	}

    return MandrillFactory;
})