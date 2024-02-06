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
               return []
          }
          finally {
               await client.close();
          }
     }

     const getActivityByLink = async (activityURL: string) => {
          console.log('aktiviti servisi get by link', activityURL);

          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)

          try {
               const db = client.db('LDA_DB')
               let data: Activity[] = await db.collection('Activities').find({ activityURL: activityURL }).toArray()
               console.log('data iz get aktivnost', data);

               return data[0]
          } catch (error: any) {
               console.log({ message: error.message })
               return {}
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
               return []
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
               return []
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
               return []
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
               return []
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
               return []
          }
          finally {
               await client.close();
          }
     }



     return {
          getAllActivities,
          getActivityByLink,
          getCompletedActivities,
          getToDoActivities,
          getInProgressActivities,
          getFeaturedCompletedActivities,
          getActivityByTitle,
     }
}

export default activityServices