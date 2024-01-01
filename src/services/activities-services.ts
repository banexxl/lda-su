import { MongoClient } from "mongodb"
import { ObjectId } from "mongodb"
import { Activity } from "src/types/activity"

const activityServices = () => {

     const getAllActivities = async () => {

          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)

          try {
               const db = client.db('LDA_DB')
               let data: Activity[] = await db.collection('Activities').find({}).toArray()
               return data
          } catch (error: any) {
               console.log({ message: error.message })
          }
          finally {
               await client.close();
          }
     }

     const getCompletedActivities = async () => {

          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)

          try {
               const db = client.db('LDA_DB')
               let data: Activity[] = await db.collection('Activities').find({ 'status': 'completed' }).toArray()
               return data
          } catch (error: any) {
               console.log({ message: error.message })
          }
          finally {
               await client.close();
          }
     }

     const getFeaturedCompletedActivities = async () => {

          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)

          try {
               const db = client.db('LDA_DB')
               let data: Activity[] = await db.collection('Activities').find({ 'status': 'completed' }).limit(5).toArray()
               return data
          } catch (error: any) {
               console.log({ message: error.message })
          }
          finally {
               await client.close();
          }
     }

     const getInProgressActivities = async () => {

          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)

          try {
               const db = client.db('LDA_DB')
               let data: Activity[] = await db.collection('Activities').find({ 'status': 'in-progress' }).toArray()
               return data
          } catch (error: any) {
               console.log({ message: error.message })
          }
          finally {
               await client.close();
          }
     }

     const getToDoActivities = async () => {

          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)

          try {
               const db = client.db('LDA_DB')
               let data: Activity[] = await db.collection('Activities').find({ 'status': 'to-do' }).toArray()
               return data
          } catch (error: any) {
               console.log({ message: error.message })
          }
          finally {
               await client.close();
          }
     }

     const getActivityByTitle = async (link: string) => {

          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)

          try {
               const db = client.db('LDA_DB')
               let data: Activity[] = await db.collection('Activities').find({ 'link': `${link}` }).toArray()
               return data
          } catch (error: any) {
               console.log({ message: error.message })
          }
          finally {
               await client.close();
          }
     }



     return {
          getAllActivities,
          getCompletedActivities,
          getToDoActivities,
          getInProgressActivities,
          getFeaturedCompletedActivities,
          getActivityByTitle,
     }
}

export default activityServices