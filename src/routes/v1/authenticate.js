let joi = require("@hapi/joi");
let ErrorCodes = require("../../const/error-codes");
let to = require("await-to-js").to;

let inSchema = joi.object().keys({
    username: joi.string().min(3),
    password: joi.string().min(3)
});

module.exports = ({ router, db }) => {

    router.post("/authenticate", async (req, res) => {
        let user;
        let { error, value } = inSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                code: ErrorCodes.ERR_VALIDATION,
                message: "Validation Failed",
                details: error
            });
        }

        let { username, password } = value;

        [error, user] = await to(db.getUser(username, password));
        
        if (error) return res.status(500).end();

        if (!user) return res.json({
            code: ErrorCodes.ERR_UNAUTHORIZED,
            message: "Invalid credentials given"
        });
        

        let result = await to(db.createToken(username));

        if (result[0]) return res.status(500).end();
        
        let { token, eat: expiresIn } = result[1];

        return res.json({
            token,
            expiresIn
        });

    });    
};