const PORT = parseInt(process.env.PORT) || 3000;

module.exports = {
    DBHOST: process.env.DBHOST || "mongo",
    DBPORT: process.env.DBPORT || 27017,
    DBNAME: process.env.DBNAME || "admin",
    DBUSER: process.env.DBUSER || "root",
    DBPASSWORD: process.env.DBPASSWORD || "password",
    PORT,
    JWTSECRET: process.env.JWT_SECRET || "secret"
}