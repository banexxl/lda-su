import { Project } from "src/types/project"
import { MongoClient } from "mongodb"
import { ObjectId } from "mongodb"
import { ProjectSummary } from "src/types/projectSummary";

const projectsServices = () => {

     const getAllPublications = async () => {

          const client = await MongoClient.connect(process.env.MONGODB_URI!);

          try {
               const db = client.db('LDA_DB');
               const data: any = await db.collection('Publications').find({}).toArray()
               return data[0].publications;
          } catch (error: any) {
               console.log({ message: error.message })
          } finally {
               await client.close();
          }
     };

     const getAllProjectSummaries = async () => {

          const client = await MongoClient.connect(process.env.MONGODB_URI!);

          try {
               const db = client.db('LDA_DB');
               const data: any = await db.collection('ProjectSummaries').find({}).sort({ projectEndDateTime: -1 }).toArray()
               return data;
          } catch (error: any) {
               console.log({ message: error.message })
          } finally {
               await client.close();
          }
     }

     const getInProgressProjectSummaries = async () => {

          const client = await MongoClient.connect(process.env.MONGODB_URI!);

          try {
               const db = client.db('LDA_DB');
               const data: any = await db.collection('ProjectSummaries').find({ 'status': 'in-progress' }).sort({ projectEndDateTime: -1 }).toArray()
               return data;
          } catch (error: any) {
               console.log({ message: error.message })
          } finally {
               await client.close();
          }
     };

     const getCompletedProjectSummaries = async () => {

          const client = await MongoClient.connect(process.env.MONGODB_URI!);

          try {
               const db = client.db('LDA_DB');
               const data: any = await db.collection('ProjectSummaries').find({ 'status': 'completed' }).sort({ projectEndDateTime: -1 }).toArray()
               return data;
          } catch (error: any) {
               console.log({ message: error.message })
          } finally {
               await client.close();
          }
     };

     const getRandomCompletedProjectSummaries = async () => {

          const client = await MongoClient.connect(process.env.MONGODB_URI!);

          try {
               const db = client.db('LDA_DB');
               const data: any = await db.collection('ProjectSummaries').aggregate([
                    { $match: { status: 'completed' } },  // Filter documents where completed is true
                    { $sample: { size: 4 } }         // Randomly sample 5 documents
               ]).sort({ projectEndDateTime: -1 }).toArray()
               return data;
          } catch (error: any) {
               console.log({ message: error.message })
          } finally {
               await client.close();
          }
     };

     const getProjectSummaryByLink = async (link: string) => {

          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)

          try {
               const db = client.db('LDA_DB')
               let data: ProjectSummary = await db.collection('ProjectSummaries').find({ 'projectSummaryURL': link }).toArray()
               return data
          } catch (error: any) {
               console.log({ message: error.message })
          }
          finally {
               await client.close();
          }
     }

     const getAllProjects = async () => {

          const client = await MongoClient.connect(process.env.MONGODB_URI!);

          try {
               const db = client.db('LDA_DB');
               const data: any = await db.collection('Projects').find({}).toArray()
               return data;
          } catch (error: any) {
               console.log({ message: error.message })
          } finally {
               await client.close();
          }
     };

     const getInProgressProjects = async () => {

          const client = await MongoClient.connect(process.env.MONGODB_URI!);

          try {
               const db = client.db('LDA_DB');
               const data: any = await db.collection('Projects').find({ 'status': 'in-progress' }).toArray()
               return data;
          } catch (error: any) {
               console.log({ message: error.message })
          } finally {
               await client.close();
          }
     };

     const getAllProjectLinks = async () => {

          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)

          try {
               const db = client.db('LDA_DB')
               let data: Project[] = await db.collection('Projects').distinct('projectURL')
               return data
          } catch (error: any) {
               console.log({ message: error.message })
          }
          finally {
               await client.close();
          }
     }

     const getProjectByLink = async (projectURL: string) => {

          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)

          try {
               const db = client.db('LDA_DB')
               let data: Project[] = await db.collection('Projects').find({ 'projectURL': projectURL }).toArray()
               return data[0]
          } catch (error: any) {
               console.log({ message: error.message })
          }
          finally {
               await client.close();
          }
     }

     const getRandomProjects = async () => {

          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)

          try {
               const db = client.db('LDA_DB')
               // Get one random document from the mycoll collection.
               //db.mycoll.aggregate([{ $sample: { size: 1 } }])
               // Get one random document matching {a: 10} from the mycoll collection.
               // db.mycoll.aggregate([
               //      { $match: { a: 10 } },
               //      { $sample: { size: 1 } }
               // ])
               let data: Project[] = await db.collection('Projects')
                    .aggregate([
                         // { $match: { mainCategory: 'apoteka' } },
                         { $sample: { size: 10 } }])
                    .toArray()
               return data
          } catch (error: any) {
               return { message: error.message }
          }
          finally {
               await client.close();
          }
     }

     const getSearchTermResults = async (searchTerm: string) => {

          // const searchTermArray = searchTerm.split(" ")

          // const collections = ['Activities', 'Projects', 'ProjectSummaries'];
          const collections = ['Projects'];
          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)

          try {
               const db = client.db('LDA_DB')
               const searchResults = await Promise.all(collections.map(async collectionName => {
                    const collection = db.collection(collectionName);

                    // Perform search in the title field
                    return collection.find({ title: { $regex: searchTerm, $options: 'i' } }).toArray();
               }));
               const combinedResults = searchResults.reduce((acc, curr) => acc.concat(curr), []);

               return combinedResults
          } catch (error: any) {
               return { message: error.message }
          }
          finally {
               await client.close();
          }
     }

     return {
          getAllPublications,
          getAllProjects,
          getSearchTermResults,
          getCompletedProjectSummaries,
          getRandomCompletedProjectSummaries,
          getInProgressProjects,
          getProjectByLink,
          getAllProjectLinks,
          getAllProjectSummaries,
          getProjectSummaryByLink,
          getInProgressProjectSummaries
     }
}

export default projectsServices