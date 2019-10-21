const mongoose = require("mongoose");

module.exports = ({mongoConnection}) => {
    let schema = mongoose.Schema({
        username: String,
        token: String,
        iat: Date,
        eat: Date
    });

    schema.methods.isExpired = function() {
        return this.eat <= new Date();
    };

    let Token = mongoConnection.model("Token", schema);    
    
    return Token;
};