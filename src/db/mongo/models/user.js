const mongoose = require("mongoose");
const crypto =  require('crypto');

module.exports = ({mongoConnection}) => {
    let schema = mongoose.Schema({
        username: String,
        hash: String,
        salt: String
    });

    schema.methods.setPassword = function(password) {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    };

    schema.methods.validatePassword = function (password) {
        let salt = this.salt;
        return this.hash == crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');        
    };

    let User = mongoConnection.model("User", schema);    

    return User;
};