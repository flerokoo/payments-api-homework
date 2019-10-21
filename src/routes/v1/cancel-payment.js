let ErrorCodes = require("../../const/error-codes");
let validateToken = require("../../middlewares/validate-token");
let to = require("await-to-js").to;

module.exports = ({ router, db }) => {
    router.put("/payments/:id/cancel", validateToken(db), async (req, res) => {
        // eslint-disable-next-line no-unused-vars
        let error, payment, _;
        let username = req.userdata.username;
        let id = req.params.id;

        [error, payment] = await to(db.getPayment(username, id));

        if (error) return res.status(500).end();

        if (!payment) return res.status(404).json({
            code: ErrorCodes.ERR_NOT_FOUND,
            message: "No such payment"
        });

        if (payment.status !== "created") return res.status(400).json({
            code: ErrorCodes.ERR_CANNOT_CANCEL,
            message: payment.status === "approved"
                ? "Cannot cancel a payment that has already been approved"
                : "Payment is already cancelled"
        });
                    
        [error, _] = await db.cancelPayment(username, id);

        if (error) return res.status(500).end();
       
        res.status(200).end();
    });
};