let to = require("await-to-js").to;
let ErrorCodes = require("../../const/error-codes");
let paymentSchema = require("../../validation/payment-schema");
let validateToken = require("../../middlewares/validate-token");
let joi = require("@hapi/joi");

let outSchema = paymentSchema;

let idSchema = joi.string()
    .alphanum()
    .length("5dadb5e31701dc025e44ea7f".length);

module.exports = ({ router, db }) => {
    router.get("/payment/:id", validateToken(db), async (req, res) => {
        let error, payment, validatedPayment, validatedId;
        let username = req.userdata.username;
        let id = req.params.id;

        ({ error, value: validatedId } = idSchema.validate(id));

        if (error) return res.status(401).json({
            code: ErrorCodes.ERR_VALIDATION,
            message: "Wrong id format",
            details: JSON.stringify(error)
        });

        [error, payment] = await to(db.getPayment(username, validatedId));
        
        if (error) return res.status(500).end();

        if (!payment) return res.status(404).json({
            code: ErrorCodes.ERR_NOT_FOUND,
            message: "No such payment"
        });
                    
        ({ error, value: validatedPayment } = outSchema.validate(payment));

        if (error) return res.status(500).end();

        return res.json(validatedPayment);
        
    });
};