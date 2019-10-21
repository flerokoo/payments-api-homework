
let joi = require("@hapi/joi");
let validateToken = require("../../middlewares/validate-token");
let ErrorCodes = require("../../const/error-codes");
let paymentSchema = require("../../validation/payment-schema");

let inSchema = joi.object().keys({
    payeeId: joi.string().min(3),
    payerId: joi.string().min(3),
    paymentSystem: joi.string().min(3),
    paymentMethod: joi.string().min(3),
    amount: joi.number().positive(),
    currency: joi.string().length(3),
    comment: joi.optional()
});

let outSchema = paymentSchema;

module.exports = ({ router, db }) => {
    router.post("/payments", validateToken(db), async (req, res) => {

        let { error, value } = inSchema.validate(req.body);

        if (error) return res.status(400).json({
            code: ErrorCodes.ERR_VALIDATION,
            message: "Validation failed",
            details: error
        });

        

        let username = req.appdata.username;       
        value.username = username;
        
        let payment = await db.createPayment(value);
                    
        ({ error, value } = outSchema.validate(payment));

        if (error) return res.status(500).end();

        return res.status(201).json(value);
        
        
    });
};