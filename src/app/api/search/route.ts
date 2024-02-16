import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");


export async function POST(request: Request, response: Response) {

     // Connection URL for your MongoDB database
     const dbUrl = process.env.MONGODB_URI
     // Connect to the MongoDB database
     const client = await MongoClient.connect(dbUrl!);
     const db = client.db(); // Get the database instance

     try {
          const body = await request.json();
          console.log(body);

          // List of collection names to search
          const collections = ['Activities', 'Projects']; // Add your collection names here

          // Search each collection for the search term in the title key
          // const searchResults = await Promise.all(collections.map(async collectionName => {
          //      const collection = db.collection(collectionName);
          //      const results = collection.find({ title: { $regex: searchTerm.toString(), $options: 'i' } }).toArray()

          //      return results
          // }));
          const searchResults = await db.collection('Activities').find({ 'title': { $regex: `${body}`, $options: 'i' } }).toArray()

          // Combine search results from all collections into a single array
          // const combinedResults = searchResults.reduce((acc, curr) => acc.concat(curr), []);
          console.log(searchResults);

          return NextResponse.json({ responseStatus: response.status, responseData: searchResults })
     } catch (error) {
          console.error("Error:", error);
          return NextResponse.json({ responseStatus: response.status, responseData: [] })
     } finally {
          client.close();
     }


};