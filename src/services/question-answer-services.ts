import { asService } from "src/lib/db/rls";
import { toPlain } from "src/lib/db/serialize";
import { QuestionAnswer } from "src/types/question-answer";

type CreateQuestionInput = Pick<QuestionAnswer, 'fullName' | 'email' | 'question'>;

const questionAnswerServices = () => {

     // Public list only ever shows answered, non-archived questions, and never the
     // submitter's name/email — this table has no public read policy, everything here
     // runs server-side with the service_role (asService).
     const getAllQuestionsAndAnswers = async (): Promise<QuestionAnswer[]> => {
          try {
               const rows = await asService((tx) => tx.questions.findMany({
                    where: { archived: false, NOT: [{ answer: null }, { answer: '' }] },
                    orderBy: { question_date_time: { sort: 'desc', nulls: 'last' } },
                    select: {
                         id: true, question: true, answer: true,
                         question_date_time: true, answer_date_time: true, archived: true,
                    },
               }));

               return toPlain(rows).map((row) => ({
                    _id: row.id,
                    fullName: '',
                    email: '',
                    question: row.question,
                    answer: row.answer ?? '',
                    archived: row.archived,
                    questionDateTime: row.question_date_time ?? '',
                    answerDateTime: row.answer_date_time,
               }));
          } catch (error: any) {
               console.log({ message: error?.message });
               return [];
          }
     };

     const createQuestion = async (input: CreateQuestionInput) => {
          let data: any;
          try {
               const row = await asService((tx) => tx.questions.create({
                    data: {
                         full_name: input.fullName,
                         email: input.email,
                         question: input.question,
                         answer: '',
                         archived: false,
                         question_date_time: new Date().toISOString(),
                         answer_date_time: null,
                    },
               }));
               data = toPlain(row);
          } catch (error: any) {
               console.log({ message: error?.message });
               return {
                    acknowledged: false,
                    insertedId: undefined,
                    question: undefined,
               };
          }

          const question: QuestionAnswer = {
               _id: data.id,
               fullName: data.full_name,
               email: data.email,
               question: data.question,
               answer: data.answer,
               archived: data.archived,
               questionDateTime: data.question_date_time,
               answerDateTime: data.answer_date_time,
          };

          return {
               acknowledged: true,
               insertedId: data.id as string,
               question,
          };
     };

     return {
          createQuestion,
          getAllQuestionsAndAnswers,
     };
};

export default questionAnswerServices;
