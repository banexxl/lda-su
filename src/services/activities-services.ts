import { Project } from "src/types/project"
import { MongoClient } from "mongodb"
import { ObjectId } from "mongodb"

const productsServices = () => {

     const getAllProducts = async () => {

          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)

          try {
               const db = client.db('DAR_DB')
               let data: Project[] = await db.collection('Products').find({}).toArray()
               return data
          } catch (error: any) {
               return { message: error.message }
          }
          finally {
               await client.close();
          }
     }

     const getRandomApotekaProducts = async () => {

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
               let data: Project[] = await db.collection('Products')
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

     const getRandomHerbalabProducts = async () => {

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
               let data: Project[] = await db.collection('Products')
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
               const mainCategories = await db.collection('Products').distinct('mainCategory')
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
               let product: Project = await db.collection('Products').findOne({ _id: new ObjectId(_id) })
               return product
          } catch (error: any) {
               return { message: error.message }
          }
          finally {
               await client.close();
          }
     }

     const getProductsByManufacturer = async (manufacturer: string) => {

          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)
          try {
               const db = client.db('DAR_DB')
               let products: Project[] = await db.collection('Products')
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

     const getProductsByNameAndOrManufacturer = async (searchTerm: any) => {

          const searchTermArray = searchTerm.split(" ")

          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)
          try {
               const db = client.db('DAR_DB')
               let products: Project[] = await db.collection('Products')
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

     const getProductsByDiscount = async () => {
          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)
          try {
               const db = client.db('DAR_DB')
               let products: Project[] = await db.collection('Products')
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

     const getLimitedProductsByMainCategory = async (mainCategory: string, loadedParts: number) => {

          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)

          try {
               const db = client.db('DAR_DB')
               let products: Project[] = await db.collection('Products')
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

     const getProductsByMainCategoryMidCategory = async (mainCategory: string, midCategory: string, loadedParts: any) => {

          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)
          try {
               const db = client.db('DAR_DB')
               let products: Project[] = await db.collection('Products').
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

     const getProductsByMainCategoryMidCategorySubCategory = async (mainCategory: string, midCategory: string, subCategory: string, loadedParts: any) => {

          const client: any = await MongoClient.connect(process.env.MONGODB_URI!)

          try {
               const db = client.db('DAR_DB')
               let products: Project[] = await db.collection('Products')
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
               const productsCollection = db.collection('Products');

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
          getAllProducts,
          getAllMainCategories,
          getProductById,
          getProductsByNameAndOrManufacturer,
          getProductsByManufacturer,
          getProductsByDiscount,
          getLimitedProductsByMainCategory,
          getProductsByMainCategoryMidCategory,
          getProductsByMainCategoryMidCategorySubCategory,
          getAllLogos,
          getAllManufacturers,
          getRandomHerbalabProducts,
          getRandomApotekaProducts
     }
}

export default productsServices