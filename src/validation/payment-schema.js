let joi = require("@hapi/joi");
let mongoose = require("mongoose");

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
    created: joi.alt([joi.string().min(3), joi.date()]),
    updated: joi.alt([joi.string().min(3), joi.date()]),
    username: joi.strip(),
    _id: joi.alt([
        joi.string().length("5dadb5e31701dc025e44ea7f".length),
        joi.custom(a => a instanceof mongoose.Types.ObjectId ? a : null)
    ])
}).options({ presence: 'required', stripUnknown: true });



module.exports = paymentSchema;