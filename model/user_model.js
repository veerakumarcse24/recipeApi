var mongoose = require('mongoose');
var crypto = require('crypto'); 
mongoose.connect('mongodb://localhost:27017/recipes', { useNewUrlParser: true });

var UserSchema = mongoose.Schema({
   username: {type : String, required : true},
   hash : String, 
   salt : String,
   phone_no: Number,
   city: Number,
   location: Number
});

UserSchema.methods.setPassword = function(password) { 
     
 // Creating a unique salt for a particular user 
    this.salt = crypto.randomBytes(16).toString('hex'); 
  
    // Hashing user's salt and password with 1000 iterations, 64 length and sha512 digest 
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`); 
}; 

UserSchema.methods.validPassword = function(password) { 
    var hash = crypto.pbkdf2Sync(password,  
    this.salt, 1000, 64, `sha512`).toString(`hex`); 
    return this.hash === hash; 
}; 

var Users = mongoose.model("Users", UserSchema);

module.exports = Users;