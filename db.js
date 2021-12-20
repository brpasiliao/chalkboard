const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://admin:admin@chalkboardcluster.jiuia.mongodb.net/cbdb?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true });

module.exports = client;
