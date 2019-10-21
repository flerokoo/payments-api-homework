let joi = require("@hapi/joi");
let ErrorCodes = require("../../const/error-codes");
let paymentSchema = require("../../validation/payment-schema");
let validateToken = require("../../middlewares/validate-token");

let outSchema = joi.array().items(paymentSchema)

module.exports = ({ router, db }) => {
    router.get("/payments", validateToken(db), async (req, res) => {
        let username = req.appdata.username;
        let payments = await db.getPayments(username);
        
        let { error, value: validatedPayments } = outSchema.validate(payments);

        if (error) return res.status(500).end();

        return res.json(validatedPayments);        
    });
};