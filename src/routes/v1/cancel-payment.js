let ErrorCodes = require("../../const/error-codes");
let validateToken = require("../../middlewares/validate-token");


module.exports = ({ router, db }) => {
    router.put("/payments/:id/cancel", validateToken(db), async (req, res) => {

        let username = req.appdata.username;
        let id = req.params.id;

        let payment = await db.getPayment(username, id);

        if (!payment) return res.status(404).json({
            code: ErrorCodes.ERR_NOT_FOUND,
            message: "No such payment"
        })

        if (payment.status !== "created") return res.status(400).json({
            code: ErrorCodes.ERR_CANNOT_CANCEL,
            message: payment.status === "approved"
                ? "Cannot cancel a payment that has already been approved"
                : "Payment is already cancelled"
        })
                    
        await db.cancelPayment(username, id);
        
        res.status(200).end();
    });
};