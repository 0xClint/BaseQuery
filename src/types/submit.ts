import { QuestionItem } from "./Question.type";

export type questionType = {
  question: QuestionItem;
  bountyAmount: string;
  poolDuration: number;
  useAsPool: boolean;
};

export type selectBestAnswerType = {
  questionId: number;
  answerId: number;
};

export type voteType = {
  questionId: number;
  answerId: number;
  isUpvote: boolean;
};


