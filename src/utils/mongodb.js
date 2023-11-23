import mongo from 'mongodb';
import dotenv from 'dotenv';
import process from 'process';

dotenv.config();
export const mongodb = new mongo.MongoClient(process.env["MONGODB_URL"], {
	serverApi: {
		version: mongo.ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	}
});