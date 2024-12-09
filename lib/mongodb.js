//lib/mongodb.js
const { MongoClient } = require("mongodb");

// Get the MongoDB URI from environment variables
const uri = process.env.MONGODB_URI;

// Create a MongoClient instance
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    // Connect the client to the server
    if (!client.isConnected()) {
      await client.connect();
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    }
    return client;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

module.exports = connectToDatabase;
