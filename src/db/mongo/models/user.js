const mongoose = require("mongoose");
const crypto =  require('crypto');
const jwt = require("jsonwebtoken")

module.exports = ({mongoConnection, config}) => {
    let schema = mongoose.Schema({
        username: String,
        password: String,
        hash: String
    });

    // schema.methods.setPassword = function(password) {
    //     this.salt = crypto.randomBytes(16).toString('hex');
    //     this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    // }

    // schema.methods.validatePassword = function (password) {
    //     return this.hash == crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');        
    // }

    // schema.methods.generateJWT = function() {
    //     const today = new Date();
    //     const expirationDate = new Date(today);
    //     expirationDate.setDate(today.getDate() + 60);
      
    //     return jwt.sign({
    //         username: this.username,
    //         id: this._id,
    //         exp: parseInt(expirationDate.getTime() / 1000, 10),
    //     }, config.JWTSECRET);
    // }
    
    // schema.methods.toAuthJSON = function() {
    //     return {
    //         _id: this._id,
    //         username: this.username,
    //         token: this.generateJWT(),
    //     };
    // }; 

    let User = mongoConnection.model("User", schema);    

    return User;
}