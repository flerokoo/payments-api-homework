
let ErrorCodes = require("../const/error-codes");
let to = require("await-to-js").to;
module.exports = db => async (req, res, next) => {
    let token = req.params.token || req.query.token;

    if (!token) return res.status(401).json({
        code: ErrorCodes.ERR_UNAUTHORIZED,
        message: "No auth token provided"
    });
    
    let [error, tokenObj] = await to(db.validateToken(token));

    if (error) return res.status(500).end();

    if (!tokenObj) return res.status(401).json({
        code: ErrorCodes.ERR_AUTH_TOKEN_EXPIRED,
        message: "Auth token expired"
    });

    let username = tokenObj.username;

    // eslint-disable-next-line require-atomic-updates
    req.userdata = {
        username
    };

    next();
};