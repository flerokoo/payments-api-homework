let joi = require("@hapi/joi");

let paymentSchema = joi.object().keys({
    // id: joi.string().min(3),
    payeeId: joi.string().min(3),
    payerId: joi.string().min(3),
    paymentSystem: joi.string().min(3),
    paymentMethod: joi.string().min(3),
    amount: joi.number().positive(),
    currency: joi.string().length(3),
    status: joi.string().min(3),
    comment: joi.optional(),
    created: joi.string().min(3),
    updated: joi.string().min(3),
    username: joi.strip(),
    _id: joi.allow()
}).options({ presence: 'required' });



module.exports = paymentSchema;