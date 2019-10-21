let bodyParser = require("body-parser");
let helmet = require("helmet");

module.exports = ({ app }) => {
    app.use(helmet());
    app.use(bodyParser.json());    
    app.use(bodyParser.urlencoded({ extended: true }));
};