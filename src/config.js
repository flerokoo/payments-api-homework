const PORT = parseInt(process.env.PORT) || 3000;

module.exports = {
    DBHOST: "mongo",
    DBPORT: 27017,
    DBNAME: "admin",
    DBUSER: "root",
    DBPASSWORD: "password",
    PORT,
    JWTSECRET: process.env.JWT_SECRET || "secret"
}