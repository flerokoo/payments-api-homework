let fs = require("fs");
let path = require("path");

module.exports = (directory, routesDir = "./src/routes") => ({ router, app, db, config }) => {
    let basePath = path.join(routesDir, directory);

    directory = directory.trim("/");
    
    fs.readdirSync(basePath)
        .map(f => path.join(basePath, f))
        .filter(f => !fs.statSync(f).isDirectory())
        .forEach(routeFile => {   
            let relative = "./" + path.relative(__dirname, routeFile);
            require(relative)({ router, db, config });
        });    
    
    
    app.use("/" + directory, router);
};