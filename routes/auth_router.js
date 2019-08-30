var express = require('express');

var router = express.Router();
var User = require('../model/user_model');

router.get('/user', function(req, res){
   res.send('GET route on things.');
});

router.post('/login', (req, res) => { 
    var data = req.body;
    // Find user with requested username 
    User.findOne({ username : data.username }, function(err, user) { 
        if (user === null) { 
            return res.status(400).send({ 
                message : "User not found."
            }); 
        } 
        else { 
            if (user.validPassword(data.password)) { 
                return res.status(201).send({ 
                    message : "User Logged In", 
                }) 
            } 
            else { 
                return res.status(400).send({ 
                    message : "Wrong Password"
                }); 
            } 
        } 
    }); 
}); 

router.post('/register', function(req, res){
   var data = req.body; 
   var newUser = new User({
       username: data.username,
	   phone_no: data.phone_no,
	   city: data.city,
	   location: data.location
	  });

   	newUser.setPassword(data.password); 
		
	newUser.save(function(err, Person){
	    if(err)
	        res.status(500).send({ success: false, message: err });
	    else
	        res.status(200).send({ success: true, message: "User created successfully" });
	});
});

//export this router to use in our index.js
module.exports = router;