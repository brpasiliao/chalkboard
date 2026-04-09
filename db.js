require("dotenv").config();
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

async function testConnection() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");
    await client.close();
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
  }
}

testConnection();

module.exports = client;