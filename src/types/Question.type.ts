export type QuestionItem = {
  id?: string | number;
  title: string;
  content: string;
  tags: string[];
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
  answerIds: number[];
  isActive: boolean;
  isPoolQuestion: boolean;
  timestamp: number;
};
