const { MongoClient } = require('mongodb');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

class DBUploader {
  constructor() {
    this.uri = process.env.MONGODB_URI;
    this.collectionName = process.env.MONGODB_COLLECTION;
    this.client = new MongoClient(this.uri, { useNewUrlParser: true});
  }

  connect = async() => {
    try {
      await this.client.connect();
      console.log("Connected to MongoDB");
      this.db = this.client.db();
      this.collection = this.db.collection(this.collectionName);
    } catch (error) {
      console.error('MongoDB connection failure:', error.message);
      throw error;
    }
  }

  disconnect = async() => {
    try {
      await this.client.close();
      console.log('Disconnected from MongoDB');
    } catch(error) {
      console.log('Error during disconnection:', error.message);
    }
  }

  clearCollection = async() => {
    try {
      await this.collection.deleteMany({});
      console.log('Cleared collection');
    } catch(errror) {
      console.error('Failed to clear collection:', error.message);
      throw error;
    }
  }

  uploadRestaurants = async(restaurants) => {
    if(!Array.isArray(restaurants) || restaurants.length == 0) {
      console.log('No restaurants to upload');
      return;
    }

    try {
      const result = await this.collection.insertMany(restaurants);
      console.log(`Inserted ${result.insertedCount} restaurants`);
    } catch(error) {
      console.error('Failed to insert restaurants:', error.message);
      throw error;
    }
  }
}

module.exports = DBUploader;
