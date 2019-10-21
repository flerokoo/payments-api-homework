const mongoose = require("mongoose");

module.exports = ({mongoConnection}) => {
    let schema = mongoose.Schema({
        payeeId: String,
        payerId: String,
        paymentSystem: String,
        paymentMethod: String,
        amount: String,
        currency: String,
        status: String,
        comment: String,
        created: Date,
        updated: Date,
        username: String
    });

    let Payment = mongoConnection.model("Payment", schema);    

    return Payment;
};