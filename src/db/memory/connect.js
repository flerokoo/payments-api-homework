let interface = require("../../validation/db-adapter-interface");

let users = [{
    username: "Bob",
    password: "123"
}];

let payments = [];

let tokens = [];

let adapter = {
    
    // TOKENS

    async createToken(username) {
        let o = {
            username,
            token: 'token123',
            iat: new Date(),
            eat: new Date(Date.now() + 1000 * 60 * 60)
        };

        tokens.push(o);

        return o;
    },

    async validateToken(token) {
        let o = tokens.find(t => t.token === token);
        if (!o)
            return false;
        if (new Date(o.eat) <= new Date())
            return false;
        
        return o;
    },


    // USERS

    async createUser(username, password) {
        return users.push({ username, password })
    },

    async getUser(u, p) {
        return users.find(({ username, password }) => username === u && password === p)
    },


    // PAYMENTS

    async getPayments(username) {
        return payments.filter(p => p.username === username);
    },

    async createPayment(data) {
        let o = {
            ...data,
            _id: "id123",
            status: "created",
            created: new Date().toString(),
            updated: new Date().toString()
        };

        payments.push(o)

        return o;
    },

    async getPayment(username, id) {
        return payments.find(p => p._id === id && username === p.username);
    },

    async approvePayment(username, id) {
        let payment = await this.getPayment(username, id);
        payment.updated = new Date().toString()
        payment.status = "approved";
    },

    async cancelPayment(username, id) {
        let payment = await this.getPayment(username, id);
        payment.updated = new Date().toString()
        payment.status = "cancelled";
    },
};

let { error, value: validatedAdapter } = interface.validate(adapter);

if (error) {
    throw new Error(JSON.stringify(error));
}

module.exports = () => Promise.resolve(validatedAdapter);