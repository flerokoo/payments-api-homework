let { createContainer, asValue, asFunction } = require("awilix");
let connectToDb = require("./db/mongo/connect");
let express = require("express");
let configureApp = require("./configure-app");
let config = require("./config");
let defineRoutes = require("./routes/define-routes");

process.on("uncaughtException", err => {
    console.error(err);
});

connectToDb(config).then(db => {
    let container = createContainer();

    // db.createUser("Bob", "123")

    container.register("config", asValue(config));    
    container.register("db", asValue(db));
    container.register("app", asFunction(() => express()).singleton());
    container.register("router", asFunction(() => express.Router()));

    container.build(configureApp);
    container.build(defineRoutes("v1"));
    
    let app = container.resolve("app");
    app.listen(config.PORT);
    console.log(`Listening on port ${config.PORT}`);

});
