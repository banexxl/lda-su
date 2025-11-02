import { MongoClient, WithId } from "mongodb"
import { ProjectSummary } from "src/types/projectSummary";

const projectsServices = () => {

     const getAllPublications = async () => {

          const client = await MongoClient.connect(process.env.MONGODB_URI!);

          try {
               const db = client.db('LDA_DB');
               const data: any = await db.collection('Publications').find({}).sort({ publicationUploadedDateTime: -1 }).toArray()
               return data;
          } catch (error: any) {
               return []
          } finally {
               await client.close();
          }
     };

     const getAllProjectSummaries = async () => {
          const client: MongoClient = await MongoClient.connect(process.env.MONGODB_URI!);

          try {
               const db = client.db('LDA_DB');
               const data: WithId<ProjectSummary>[] = await db
                    .collection<ProjectSummary>('ProjectSummaries')
                    .find({})
                    .sort({ projectEndDateTime: -1 })
                    .toArray();
               return data
          } catch (error: any) {
               return []
          } finally {
               await client.close();
          }
     };

     const getInProgressProjectSummaries = async () => {

          const client = await MongoClient.connect(process.env.MONGODB_URI!);

          try {
               const db = client.db('LDA_DB');
               const data: any[] = await db
                    .collection('ProjectSummaries')
                    .find({ 'status': 'in-progress' })
                    .sort({ projectEndDateTime: -1 })
                    .toArray();
               return data
          } catch (error: any) {
               return []
          } finally {
               await client.close();
          }
     };

     const getCompletedProjectSummaries = async () => {

          const client = await MongoClient.connect(process.env.MONGODB_URI!);

          try {
               const db = client.db('LDA_DB');
               const data: any[] = await db
                    .collection('ProjectSummaries')
                    .find({ 'status': 'completed' })
                    .sort({ projectEndDateTime: -1 })
                    .toArray();
               return data
          } catch (error: any) {
               return []
          } finally {
               await client.close();
          }
     };

     const getRandomCompletedProjectSummaries = async () => {

          const client = await MongoClient.connect(process.env.MONGODB_URI!);

          try {
               const db = client.db('LDA_DB');
               const data: any[] = await db
                    .collection('ProjectSummaries')
                    .aggregate([
                         { $match: { status: 'completed' } },
                         { $sample: { size: 5 } }
                    ])
                    .sort({ projectEndDateTime: -1 })
                    .toArray();
               return data
          } catch (error: any) {
               return []
          } finally {
               await client.close();
          }
     };

     const getProjectSummaryByLink = async (link: string) => {

          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)

          try {
               const db = client.db('LDA_DB')
               const data: any[] = await db
                    .collection('ProjectSummaries')
                    .find({ 'projectSummaryURL': link })
                    .toArray();
               return data.length > 0 ? data[0] : [];
          } catch (error: any) {
               return { message: error.message }
          }
          finally {
               await client.close();
          }
     }

     const getAllProjects = async () => {

          const client = await MongoClient.connect(process.env.MONGODB_URI!);

          try {
               const db = client.db('LDA_DB');
               const data: any[] = await db.collection('Projects').find({}).toArray();
               return data
          } catch (error: any) {
               return []
          } finally {
               await client.close();
          }
     };

     const getInProgressProjects = async () => {

          const client = await MongoClient.connect(process.env.MONGODB_URI!);

          try {
               const db = client.db('LDA_DB');
               const data: any[] = await db.collection('Projects').find({ 'status': 'in-progress' }).toArray();
               return data
          } catch (error: any) {
               return []
          } finally {
               await client.close();
          }
     };

     const getAllProjectLinks = async () => {

          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)

          try {
               const db = client.db('LDA_DB')
               const data: string[] = await (db as any).collection('Projects').distinct('projectURL');
               return data;
          } catch (error: any) {
               return []
          }
          finally {
               await client.close();
          }
     }

     const getProjectByLink = async (projectURL: string) => {

          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)

          try {
               const db = client.db('LDA_DB')
               const data: any[] = await db.collection('Projects').find({ 'projectURL': projectURL }).toArray();
               return data.length > 0 ? data[0] : [];
          } catch (error: any) {
               return { message: error.message }
          }
          finally {
               await client.close();
          }
     }

     const getRandomProjects = async () => {

          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)

          try {
               const db = client.db('LDA_DB')
               const data: any[] = await db.collection('Projects')
                    .aggregate([
                         { $sample: { size: 10 } }
                    ])
                    .toArray();
               return data
          } catch (error: any) {
               return { message: error.message }
          }
          finally {
               await client.close();
          }
     }

     const getSearchTermResults = async (searchTerm: string) => {

          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)

          try {
               const db = client.db('LDA_DB')
               const data: any[] = await db
                    .collection('Projects')
                    .find({ subTitle: { $regex: searchTerm, $options: 'i' } })
                    .limit(5)
                    .toArray();
               return data.length > 0 ? data : [];
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
