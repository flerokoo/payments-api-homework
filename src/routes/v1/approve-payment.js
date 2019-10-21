let ErrorCodes = require("../../const/error-codes");
let validateToken = require("../../middlewares/validate-token");
let to = require("await-to-js").to;

module.exports = ({ router, db }) => {
    router.put("/payments/:id/approve", validateToken(db), async (req, res) => {
        // eslint-disable-next-line no-unused-vars
        let error, payment, _;
        let username = req.userdata.username;
        let id = req.params.id;

        [error, payment] = await to(db.getPayment(username, id));

        if (error) res.status(500).end();

        if (!payment) return res.status(404).json({
            code: ErrorCodes.ERR_NOT_FOUND,
            message: "No such payment"
        });

        if (payment.status !== "created") return res.status(400).json({
            code: ErrorCodes.ERR_CANNOT_APPROVE,
            message: payment.status === "cancelled"
                ? "Cannot approve a payment that has already been cancelled"
                : "Payment is already approved"
        });
                    
        [error, _] = await to(db.approvePayment(username, id));
        
        if (error) res.status(500).end();

        res.status(200).end();
    });
};