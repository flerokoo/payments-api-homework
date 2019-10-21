let joi = require("@hapi/joi");

module.exports = joi.object().keys({
    createToken: joi.func().arity(1),
    validateToken: joi.func().arity(1),
    createUser: joi.func().arity(2),
    getUser: joi.func().arity(2),
    getPayments: joi.func().arity(1),
    createPayment: joi.func().arity(1),
    getPayment: joi.func().arity(2),
    approvePayment: joi.func().arity(2),
    cancelPayment: joi.func().arity(2)
}).options({ presence: 'required' });