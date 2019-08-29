var express = require('express');

var router = express.Router();

router.get('/user', function(req, res){
   res.send('GET route on things.');
});
router.post('/register', function(req, res){
   res.json(req.body);
});

//export this router to use in our index.js
module.exports = router;