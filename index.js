let { createContainer, asValue, asClass, asFunction } = require("awilix");
let connectToDb = require("./src/db/memory/connect");
let express = require("express")
let configureApp = require("./src/configure-app");
let config = require("./src/config");
let defineRoutes = require("./src/routes/define-routes");

connectToDb().then(db => {
    let container = createContainer();

    container.register("config", asValue(config));    
    container.register("db", asValue(db));
    container.register("app", asFunction(() => express()).singleton());
    container.register("router", asFunction(() => express.Router()));

    container.build(configureApp);
    container.build(defineRoutes("v1"));
    
    let app = container.resolve("app");
    app.listen(config.PORT);
    console.log(`Listening on port ${config.PORT}`)

});
