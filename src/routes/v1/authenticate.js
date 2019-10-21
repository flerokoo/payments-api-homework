let joi = require("@hapi/joi");
let ErrorCodes = require("../../const/error-codes");

let inSchema = joi.object().keys({
    username: joi.string().min(3),
    password: joi.string().min(3)
})

let outSchema = joi.object().keys({
    authToken: joi.string().length(32), // TODO something else
    expiresIn: joi.string().min(5) // TODO regex
})


module.exports = ({ router, db }) => {

    router.post("/authenticate", async (req, res) => {

        let { error, value } = inSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                code: ErrorCodes.ERR_VALIDATION,
                message: "Validation Failed",
                details: error
            });
        }

        let { username, password } = value;

        // TODO await to js
        let user = await db.getUser(username, password);

        if (!user) return res.json({
            code: ErrorCodes.ERR_UNATHORIZED,
            message: "Invalid credentials given"
        })
        

        let { token, eat: expiresIn } = await db.createToken(username);

        return res.json({
            token,
            expiresIn
        });

    })    
}