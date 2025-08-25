"use client";
import { questionType, selectBestAnswerType, voteType } from "@/types/submit";
import { INDEXER_ENDPOINT, INDEXER_HEADERS } from "@/lib/constants";
import {
  AllQuestionItem,
  QuestionFetchedItems,
  QuestionItem,
} from "@/types/Question.type";
import { useSession } from "next-auth/react";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import { encodeFunctionData } from "viem";
import { distributePoolType } from "@/app/api/submit/distribute/route";

interface WalletProviderProps {
  children: ReactNode;
}

const WalletProviderFn = () => {
  const { status, data: session } = useSession();
  const [evmAddress, setEvmAddress] = useState<`0x${string}`>("0x");
  const [accountId, setAccountId] = useState<string>();
  const [balances, setBalances] = useState<string>("0.00");
  const [questionList, setQuestionList] = useState<AllQuestionItem[]>([]);

  const fetchEvmAddress = useCallback(async () => {
    console.log(session);
    const res = await fetch("/api/account");
    if (res.ok) {
      const { address } = await res.json();
      console.log(address);
      setEvmAddress(address);
    }
  }, [session]);

  const refreshBalance = useCallback(async () => {
    if (!evmAddress) return;

    const res = await fetch(`/api/account/balance`);
    if (res.ok) {
      const { balance } = await res.json();
      setBalances(String(balance));
    }
  }, [evmAddress]);

  const requestFaucet = async () => {
    if (evmAddress) {
      try {
        const response = await fetch(
          `/api/account/faucet?address=${encodeURIComponent(evmAddress)}`
        );
        const data = await response.json();
        await refreshBalance();
        toast.success("Amount has been reflected to your account!");
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    if (status === "authenticated") {
      fetchEvmAddress();
    }
  }, [status, fetchEvmAddress]);

  useEffect(() => {
    if (evmAddress) {
      refreshBalance();
    }
  }, [evmAddress, refreshBalance]);

  const createQuestion = async (
    questionData: QuestionItem,
    bountyAmount: string,
    poolDuration: number
  ) => {
    const useAsPool = poolDuration > 0;
    const payload: questionType = {
      question: questionData,
      bountyAmount,
      poolDuration,
      useAsPool,
    };
    try {
      const res = await fetch("/api/submit/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createAnswer = async (questionId: number, answer: string) => {
    const payload = {
      questionId,
      answer,
    };
    try {
      const res = await fetch("/api/submit/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const upVote = async (
    questionId: number,
    answerId: number,
    isUpvote: boolean
  ) => {
    const payload: voteType = {
      questionId,
      answerId,
      isUpvote,
    };
    try {
      const res = await fetch("/api/submit/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const selectBestAnswer = async (questionId: number, answerId: number) => {
    const payload: selectBestAnswerType = {
      questionId,
      answerId,
    };
    try {
      const res = await fetch("/api/submit/select", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.log(error);
    }
  };
  const distributePool = async (questionId: number) => {
    const payload: distributePoolType = {
      questionId,
    };
    try {
      const res = await fetch("/api/submit/distribute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.log(error);
    }
  };
  const withdrawBounty = async (questionId: number) => {
    try {
      const res = await fetch("/api/bounty/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchQuestions = useCallback(async () => {
    try {
      const res = await fetch("/api/questions");
      if (!res.ok) throw new Error(`Failed to fetch questions: ${res.status}`);

      const { questions } = (await res.json()) as {
        questions: AllQuestionItem[];
      };
      console.log(questions);
      setQuestionList(questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
      // setQuestionList([]);
    }
  }, []);

  const fetchQuestionById = async (id: number) => {
    try {
      const res = await fetch(`/api/questions/${id}`);
      if (!res.ok) throw new Error(`Failed: ${res.status}`);

      const { question } = (await res.json()) as {
        question: QuestionFetchedItems;
      };

      console.log("Fetched question:", question);
      return question;
    } catch (error) {
      console.error("Error fetching question:", error);
      return null;
    }
  };

  useEffect(() => {
    if (evmAddress) {
      fetchQuestions();
    }
  }, [evmAddress, fetchQuestions]);

  return {
    evmAddress,
    accountId,
    fetchEvmAddress,
    createQuestion,
    createAnswer,
    selectBestAnswer,
    distributePool,
    withdrawBounty,
    questionList,
    requestFaucet,
    refreshBalance,
    balances,
    fetchQuestions,
    upVote,
    fetchQuestionById,
  };
};

type WalletContextProps = ReturnType<typeof WalletProviderFn>;

const WalletContext = createContext<WalletContextProps | null>(null);

export const WalletProvider = ({ children }: WalletProviderProps) => {
  return (
    <WalletContext.Provider value={WalletProviderFn()}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
