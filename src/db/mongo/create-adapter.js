
let getToken = () => "token111"

module.exports = ({ mongoConnection, TokenModel }) => {
    
    let createToken = async (durationSeconds = 3600) => {
        let token = new TokenModel({
            token: getToken(),
            iat: Date.now(),
            eat: Date.now() + durationSeconds
        });

        await token.save();
        return token.token;
    }


    return {
        createToken
    }

}