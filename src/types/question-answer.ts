export type QuestionAnswer = {
     _id?: string;
     fullName: string;
     email: string;
     question: string;
     answer?: string;
     archived: boolean;
     questionDateTime: Date | string;
     answerDateTime?: Date | string | null;
};