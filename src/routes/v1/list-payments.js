let joi = require("@hapi/joi");
let to = require("await-to-js").to;
let paymentSchema = require("../../validation/payment-schema");
let validateToken = require("../../middlewares/validate-token");

let outSchema = joi.array().items(paymentSchema);

module.exports = ({ router, db }) => {
    router.get("/payments", validateToken(db), async (req, res) => {
        let error, payments, validatedPayments;
        let username = req.userdata.username;
        [error, payments] = await to(db.getPayments(username));
        
        ({ error, value: validatedPayments } = outSchema.validate(payments));
        
        if (error) {
            console.error(error);
            return res.status(500).end();
        }

        return res.json(validatedPayments);        
    });
};