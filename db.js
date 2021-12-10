const MongoClient = require("mongodb").MongoClient;
const mongo_username = "admin";
const mongo_password = "admin";

const uri = `mongodb+srv://${mongo_username}:${mongo_password}@chalkboardcluster.jiuia.mongodb.net/cbdb?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });

module.exports = client;
