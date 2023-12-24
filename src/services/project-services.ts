import { Project } from "src/types/project"
import { MongoClient } from "mongodb"
import { ObjectId } from "mongodb"

const projectsServices = () => {

     const getAllProjects = async () => {
          console.log('usao u getallprojects');

          const client = await MongoClient.connect(process.env.MONGODB_URI!);

          try {
               const db = client.db('LDA_DB');
               const data: any = await db.collection('Projects').find({}).toArray()
               console.log('data', data);

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
               let data: Project[] = await db.collection('Projects').distinct('link')
               const returnData = JSON.parse(JSON.stringify(data))
               return returnData
          } catch (error: any) {
               console.log({ message: error.message })
          }
          finally {
               await client.close();
          }
     }

     const getProjectByLink = async (link: string) => {

          console.log('usao u getProjectByLink');

          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)

          try {
               const db = client.db('LDA_DB')
               let data: Project = await db.collection('Projects').find({ link: link }).toArray()
               console.log(data);

               return data
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
               const db = client.db('DAR_DB')
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

     const getRandomHerbalabProjects = async () => {

          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)

          try {
               const db = client.db('DAR_DB')
               // Get one random document from the mycoll collection.
               //db.mycoll.aggregate([{ $sample: { size: 1 } }])
               // Get one random document matching {a: 10} from the mycoll collection.
               // db.mycoll.aggregate([
               //      { $match: { a: 10 } },
               //      { $sample: { size: 1 } }
               // ])
               let data: Project[] = await db.collection('Projects')
                    .find({ "manufacturer": "herbalab" })
                    .limit(8)
                    .toArray()
               return data
          } catch (error: any) {
               return { message: error.message }
          }
          finally {
               await client.close();
          }
     }

     const getAllMainCategories = async () => {

          const client = new MongoClient(process.env.MONGODB_URI!);

          try {
               await client.connect();
               const db = client.db('DAR_DB');
               const mainCategories = await db.collection('Projects').distinct('mainCategory')
               return mainCategories;
          } catch (error: any) {
               console.error('Error fetching main categories:', error);
               return { message: error.message };
          } finally {
               await client.close();
          }
     }

     const getAllLogos = async () => {

          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)

          try {
               const db = client.db('DAR_DB')
               let data: Project[] = await db.collection('LogoURLs').find().toArray()
               return data
          } catch (error: any) {
               return { message: error.message }
          }
          finally {
               await client.close();
          }
     }

     const getProductById = async (_id: any) => {
          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)
          try {
               const db = client.db('DAR_DB')
               let product: Project = await db.collection('Projects').findOne({ _id: new ObjectId(_id) })
               return product
          } catch (error: any) {
               return { message: error.message }
          }
          finally {
               await client.close();
          }
     }

     const getProjectsByManufacturer = async (manufacturer: string) => {

          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)
          try {
               const db = client.db('DAR_DB')
               let products: Project[] = await db.collection('Projects')
                    .find({ "manufacturer": { $regex: `${manufacturer}`, $options: 'i' } })
                    .limit(2)
                    .toArray()

               return products
          } catch (error: any) {
               return { message: error.message }
          }
          finally {
               await client.close();
          }
     }

     const getProjectsByNameAndOrManufacturer = async (searchTerm: any) => {

          const searchTermArray = searchTerm.split(" ")

          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)
          try {
               const db = client.db('DAR_DB')
               let products: Project[] = await db.collection('Projects')
                    .find({
                         $or: [
                              { "name": { $regex: `${searchTermArray[0]}`, $options: 'i' } },
                              { "manufacturer": { $regex: `${searchTermArray[0]}`, $options: 'i' } },
                              { "name": { $regex: `${searchTermArray[1]}`, $options: 'i' } },
                              { "manufacturer": { $regex: `${searchTermArray[1]}`, $options: 'i' } },
                         ]
                    }
                    ).toArray()

               return products
          } catch (error: any) {
               return { message: error.message }
          }
          finally {
               await client.close();
          }
     }

     const getProjectsByDiscount = async () => {
          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)
          try {
               const db = client.db('DAR_DB')
               let products: Project[] = await db.collection('Projects')
                    .find({ "discount": true })
                    .limit(10)
                    .toArray()

               return products
          } catch (error: any) {
               return { message: error.message }
          }
          finally {
               await client.close();
          }
     }

     const getLimitedProjectsByMainCategory = async (mainCategory: string, loadedParts: number) => {

          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)

          try {
               const db = client.db('DAR_DB')
               let products: Project[] = await db.collection('Projects')
                    .find({ mainCategory: `${mainCategory}` })
                    .skip(12 * (loadedParts - 1)) // Adjust the skip based on loadedParts
                    .limit(12)
                    .toArray()
               return products
          } catch (error: any) {
               return { message: error.message }
          }
          finally {
               await client.close();
          }
     }

     const getProjectsByMainCategoryMidCategory = async (mainCategory: string, midCategory: string, loadedParts: any) => {

          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)
          try {
               const db = client.db('DAR_DB')
               let products: Project[] = await db.collection('Projects').
                    find({ mainCategory: mainCategory, midCategory: midCategory })
                    .skip(10 * (loadedParts - 1)) // Adjust the skip based on loadedParts
                    .limit(10)
                    .toArray()
               return products
          } catch (error: any) {
               return { message: error.message }
          }
          finally {
               await client.close();
          }
     }

     const getProjectsByMainCategoryMidCategorySubCategory = async (mainCategory: string, midCategory: string, subCategory: string, loadedParts: any) => {

          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)

          try {
               const db = client.db('DAR_DB')
               let products: Project[] = await db.collection('Projects')
                    .find({ mainCategory: mainCategory, midCategory: midCategory, subCategory: subCategory })
                    .skip(10 * (loadedParts - 1)) // Adjust the skip based on loadedParts
                    .limit(10)
                    .toArray()
               return products
          } catch (error: any) {
               return { message: error.message }
          }
          finally {
               await client.close();
          }
     }

     const getAllManufacturers = async () => {
          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)

          try {
               await client.connect();
               const db = client.db('DAR_DB');
               const productsCollection = db.collection('Projects');

               const manufacturers = await new Promise((resolve, reject) => {
                    productsCollection.distinct("manufacturer", (error: any, manufacturers: any) => {
                         if (error) {
                              reject(error);
                         } else {
                              resolve(manufacturers);
                         }
                    });
               });
               return manufacturers;
          } catch (error) {
               return { message: error };
          } finally {
               client.close();
          }
     }


     return {
          getAllProjects,
          getProjectByLink,
          getAllProjectLinks,
          getAllMainCategories,
          getProductById,
          getProjectsByNameAndOrManufacturer,
          getProjectsByManufacturer,
          getProjectsByDiscount,
          getLimitedProjectsByMainCategory,
          getProjectsByMainCategoryMidCategory,
          getProjectsByMainCategoryMidCategorySubCategory,
          getAllLogos,
          getAllManufacturers,
          getRandomHerbalabProjects,
     }
}

export default projectsServices