let joi = require("joi");
let ErrorCodes = require("../../const/error-codes");
let paymentSchema = require("../../validation/payment-schema");
let validateToken = require("../../middlewares/validate-token");

let outSchema = paymentSchema

module.exports = ({ router, db }) => {
    router.get("/payment/:id", validateToken(db), async (req, res) => {

        let username = req.appdata.username;
        let id = req.params.id;

        let payment = await db.getPayment(username, id);

        if (!payment) return res.status(404).json({
            code: ErrorCodes.ERR_NOT_FOUND,
            message: "No such payment"
        })
                    
        let { error, value: validatedPayment } = joi.validate(payment, outSchema);

        if (error) return res.status(500).end();

        return res.json(validatedPayment);
        
    });
};