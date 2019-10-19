let ErrorCodes = require("../../const/error-codes");
let validateToken = require("../../middlewares/validate-token");


module.exports = ({ router, db }) => {
    router.put("/payments/:id/approve", validateToken(db), async (req, res) => {

        let username = req.appdata.username;
        let id = req.params.id;

        let payment = await db.getPayment(username, id);

        if (!payment) return res.status(404).json({
            code: ErrorCodes.ERR_NOT_FOUND,
            message: "No such payment"
        })

        if (payment.status !== "created") return res.status(400).json({
            code: ErrorCodes.ERR_CANNOT_APPROVE,
            message: payment.status === "cancelled"
                ? "Cannot approve a payment that has already been cancelled"
                : "Payment is already approved"
        })
                    
        await db.approvePayment(username, id);
        
        res.status(200).end();
    });
};