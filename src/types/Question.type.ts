import { AnswerFetchedItems } from "./Answers.type";

export type QuestionItem = {
  id?: string | number;
  title: string;
  content: string;
  tags: string[];
  owner?: string;
};

export type AllQuestionItem = QuestionItem & {
  id: string | number;
  ownerAddress: string;
  amount: number;
  isPool: boolean;
  isActive: boolean;
  createdAt: number;
};

export type AnwserItem = {
  id?: string | number;
  content: string;
  upvote: number;
  downvote: number;
  tags: string[];
};

export type QuestionFetchedItems = {
  id: number;
  owner: `0x${string}`;
  question: QuestionItem | null;
  bountyAmount: number;
  poolAmount: number;
  poolEndTime: number;
  selectedAnswerId: number;
  answers: AnswerFetchedItems[];
  isActive: boolean;
  isPoolQuestion: boolean;
  timestamp: number;
};
