
let interface = require("../../validation/db-adapter-interface");
let uuid = require("uuid/v4");

let getToken = () => uuid();

module.exports = ({ TokenModel, UserModel, PaymentModel }) => {
    
    let createToken = async (username, duration = 3600 * 1000) => {
        let token = new TokenModel({
            username,
            token: getToken(),
            iat: new Date(Date.now()),
            eat: new Date(Date.now() + duration)
        });

        await token.save();
        return token;
    };

    let validateToken = async token => {
        let tokenObj = await TokenModel.findOne({token});
        
        if (!tokenObj) {
            return false;
        }

        if (tokenObj.isExpired()) {
            return false;
        }

        return tokenObj.toObject();
    };

    let createUser = async (username, password) => {
        let user = new UserModel({
            username
        });

        user.setPassword(password);
        await user.save();
        return user.toObject();
    };

    let getUser = async (username, password) => {
        let user = await UserModel.findOne({username});

        if (!user || !user.validatePassword(password)) {
            return null;
        }

        return user.toObject();
    };

    let getPayments = async username => {
        let payments = await PaymentModel.find({ username });
        return payments.map(p => p.toObject());
    };

    let createPayment = async data => {
        let payment = new PaymentModel({
            ...data,
            status: "created",
            created: new Date(),
            updated: new Date()
        });

        await payment.save();
        return payment.toObject();
    };

    let getPayment = async (username, id) => {
        let payment = await PaymentModel.findOne({username, _id: id});
        return payment.toObject();
    };

    let approvePayment = async (username, id) => {
        let payment = await PaymentModel.findOne({username, _id: id});
        if (payment) {
            payment.status = "approved";
            payment.updated = new Date();
        }
        await payment.save();
    };

    let cancelPayment = async (username, id) => {
        let payment = await PaymentModel.findOne({username, _id: id});
        if (payment) {
            payment.status = "cancelled";
            payment.updated = new Date();
        }
        await payment.save();
    };

    let adapter = {
        createToken,
        validateToken,
        createUser,
        getUser,
        getPayments,
        createPayment,
        getPayment,
        approvePayment,
        cancelPayment
    };

    let {error, value: validatedAdapter} = interface.validate(adapter);

    if (error) {
        throw new Error(JSON.stringify(error));
    }

    return validatedAdapter;
};