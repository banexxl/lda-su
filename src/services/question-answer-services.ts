import { MongoClient, WithId } from "mongodb";
import { QuestionAnswer } from "src/types/question-answer";
import { withStringId } from "src/utils/plain-object-creator";

const questionAnswerServices = () => {

     const getAllQuestionsAndAnswers = async () => {
          const client: MongoClient = await MongoClient.connect(process.env.MONGODB_URI!);

          try {
               const db = client.db('LDA_DB');
               const data: WithId<QuestionAnswer>[] = await db
                    .collection<QuestionAnswer>('Q&A')
                    .find({})
                    .sort({ questionDateTime: -1 })
                    .toArray();

               return data.map((item) => withStringId(item));
          } catch (error: any) {
               console.log({ message: error.message });
               return [];
          } finally {
               await client.close();
          }
     };

     const createQuestion = async (payload: Omit<QuestionAnswer, '_id'>) => {
          const client: MongoClient = await MongoClient.connect(process.env.MONGODB_URI!);

          try {
               const db = client.db('LDA_DB');
               const result = await db.collection<Omit<QuestionAnswer, '_id'>>('Q&A').insertOne(payload);

               return {
                    acknowledged: result.acknowledged,
                    insertedId: result.insertedId.toString(),
               };
          } catch (error: any) {
               console.log({ message: error.message });
               return {
                    acknowledged: false,
                    insertedId: undefined,
               };
          } finally {
               await client.close();
          }
     };

     return {
          createQuestion,
          getAllQuestionsAndAnswers,
     };
};

export default questionAnswerServices;