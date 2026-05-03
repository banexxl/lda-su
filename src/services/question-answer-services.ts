import { MongoClient, WithId } from "mongodb";
import { QuestionAnswer } from "src/types/question-answer";
import { withStringId } from "src/utils/plain-object-creator";

type CreateQuestionInput = Pick<QuestionAnswer, 'fullName' | 'email' | 'question'>;

const questionAnswerServices = () => {

     const buildQuestionDocument = ({ fullName, email, question }: CreateQuestionInput): Omit<QuestionAnswer, '_id'> => ({
          fullName,
          email,
          question,
          answer: '',
          archived: 0,
          questionDateTime: new Date(),
          answerDateTime: null,
     });

     const getAllQuestionsAndAnswers = async () => {
          const client: MongoClient = await MongoClient.connect(process.env.MONGODB_URI!);

          try {
               const db = client.db('LDA_DB');
               const data: WithId<QuestionAnswer>[] = await db
                    .collection<QuestionAnswer>('Q&A')
                    .find({ archived: 0 })
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

     const createQuestion = async (input: CreateQuestionInput) => {
          const client: MongoClient = await MongoClient.connect(process.env.MONGODB_URI!);
          const questionDocument = buildQuestionDocument(input);

          try {
               const db = client.db('LDA_DB');
               const result = await db.collection<Omit<QuestionAnswer, '_id'>>('Q&A').insertOne(questionDocument);

               return {
                    acknowledged: result.acknowledged,
                    insertedId: result.insertedId.toString(),
                    question: {
                         ...questionDocument,
                         _id: result.insertedId.toString(),
                    },
               };
          } catch (error: any) {
               console.log({ message: error.message });
               return {
                    acknowledged: false,
                    insertedId: undefined,
                    question: undefined,
               };
          } finally {
               await client.close();
          }
     };

     return {
          buildQuestionDocument,
          createQuestion,
          getAllQuestionsAndAnswers,
     };
};

export default questionAnswerServices;