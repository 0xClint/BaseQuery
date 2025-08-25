export type AnswerFetchedItems = {
  id: number;
  questionId: number;
  provider: `0x${string}`;
  timestamp: number;
  upvotes: number;
  downvotes: number;
};
