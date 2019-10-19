
let ErrorCodes = require("../const/error-codes");

module.exports = db => async (req, res, next) => {
    let token = req.params.token || req.query.token;

    if (!token) return res.status(401).json({
        code: ErrorCodes.ERR_UNAUTHORIZED,
        message: "No auth token provided"
    });
    
    let tokenObj = await db.validateToken(token);

    if (!tokenObj) return res.status(401).json({
        code: ErrorCodes.ERR_AUTH_TOKEN_EXPIRED,
        message: "Auth token expired"
    });

    let username = tokenObj.username;

    req.appdata = {
        ...(req.appdata || {}),
        username
    };

    next();
}