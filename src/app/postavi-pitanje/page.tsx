import { AskQuestionView } from 'src/sections/view/ask-question-view';
import questionAnswerServices from 'src/services/question-answer-services';
import { QuestionAnswer } from 'src/types/question-answer';

export const metadata = {
     title: 'LDA Subotica: Postavi pitanje',
};

export const dynamic = 'force-dynamic';

const getAllQuestionsAndAnswers = async () => {
     const questions = await questionAnswerServices().getAllQuestionsAndAnswers();
     return questions;
};

export default async function AskQuestionPage() {
     const questions: QuestionAnswer[] = await getAllQuestionsAndAnswers();

     return <AskQuestionView initialQuestions={questions} />;
}