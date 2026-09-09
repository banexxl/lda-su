import { supabaseAdmin } from "src/lib/supabase-admin";
import { QuestionAnswer } from "src/types/question-answer";

type CreateQuestionInput = Pick<QuestionAnswer, 'fullName' | 'email' | 'question'>;

const questionAnswerServices = () => {

     // Public list only ever shows answered, non-archived questions, and never the
     // submitter's name/email — this table has no public read policy, everything here
     // runs server-side with the service-role key.
     const getAllQuestionsAndAnswers = async (): Promise<QuestionAnswer[]> => {
          const { data, error } = await supabaseAdmin
               .from('questions')
               .select('id, question, answer, question_date_time, answer_date_time, archived')
               .eq('archived', false)
               .neq('answer', '')
               .order('question_date_time', { ascending: false });

          if (error) {
               console.log({ message: error.message });
               return [];
          }

          return (data ?? []).map((row) => ({
               _id: row.id,
               fullName: '',
               email: '',
               question: row.question,
               answer: row.answer,
               archived: row.archived,
               questionDateTime: row.question_date_time,
               answerDateTime: row.answer_date_time,
          }));
     };

     const createQuestion = async (input: CreateQuestionInput) => {
          const { data, error } = await supabaseAdmin
               .from('questions')
               .insert({
                    full_name: input.fullName,
                    email: input.email,
                    question: input.question,
                    answer: '',
                    archived: false,
                    question_date_time: new Date().toISOString(),
                    answer_date_time: null,
               })
               .select()
               .single();

          if (error || !data) {
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
