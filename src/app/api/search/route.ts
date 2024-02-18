import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import projectsServices from "src/services/project-services";


export async function POST(request: Request, response: Response) {

     const searchTerm = await request.json()

     const searchResults = projectsServices().getSearchTermResults(searchTerm)

     return Response.json({ response: response.status, data: searchResults })
};