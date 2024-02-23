import { NextRequest, NextResponse } from "next/server";
import projectsServices from "src/services/project-services";


export async function POST(request: NextRequest, response: NextResponse) {

     const searchTerm = await request.json()

     const searchResults = await projectsServices().getSearchTermResults(searchTerm)

     if (searchResults.length == 0) {
          return new NextResponse(JSON.stringify({ success: false, message: 'No items found', data: [] }), { status: 404, headers: { 'content-type': 'application/json' } });
     }

     return Response.json({ data: searchResults })
};