const mongoose = require('mongoose');
const mongoUser = require("./mongoUser");
const { mongoConnectionString } = require("./mongoPrivateInfos");

class MongooseConnect {
    static checkConnected = false;

    static async connect() {
        if(!this.checkConnected) {
            try {
                await mongoose.connect(mongoConnectionString);
                console.log("MongoDB connected");
                this.checkConnected = true;
            } catch (e) {
                console.error(e);
            }
        }
    }
}

class UserRegistrar {
    async register(username, email, password) {
        try {
            let user = await mongoUser.create({
                username: username,
                email: email,
                password: password
            });
            console.log(user);     
        }  catch (e) {
            console.error(e);
        }
    }
}

module.exports = {MongooseConnect, UserRegistrar};