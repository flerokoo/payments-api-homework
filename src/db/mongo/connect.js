const mongoose = require("mongoose");
const createTokenModel = require("./models/token");
const createUserModel = require("./models/user");
const createPaymentModel = require("./models/payment");
const { createContainer, asValue, asFunction } = require("awilix");
const createAdapter = require("./create-adapter");
module.exports = async (config) => new Promise((resolve, reject) => {
    const dbUrl = `mongodb://${config.DBUSER}:${config.DBPASSWORD}@${config.DBHOST}:${config.DBPORT}/${config.DBNAME}`;
    mongoose.connect(dbUrl, {useNewUrlParser: true, poolSize: 5});
    const mongoConnection = mongoose.connection;

    mongoConnection.once("open", () => {

        let container = createContainer();
        container.register("config", asValue(config));
        container.register("mongoConnection", asValue(mongoConnection));
        container.register("UserModel", asFunction(createUserModel));
        container.register("TokenModel", asFunction(createTokenModel));
        container.register("PaymentModel", asFunction(createPaymentModel));
        // container.register("RoomModel", asFunction(createRoomModel));

        resolve(container.build(createAdapter));
    });

    mongoConnection.on("error", err => {
        reject(err);
    });
});