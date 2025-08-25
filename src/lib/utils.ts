import { AnswerFetchedItems } from "@/types/Answers.type";
import { clsx, type ClassValue } from "clsx";
import { createHash } from "crypto";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const shortenAddress = (address: string, starting = 4, ending = 4) => {
  if (!address) {
    return "";
  }

  const start = address.slice(0, starting);
  const end = address.slice(-ending);

  return `${start}...${end}`;
};

export function hashEmail(email: string): string {
  return `BsQry-${createHash("sha256")
    .update(email.toLowerCase())
    .digest("hex")
    .slice(0, 16)}bs`;
}

export const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp * 1000); // convert seconds → ms
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export function formatEndTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);

  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "PM" : "AM";

  return `${day} ${month} ${year}, ${hours}:${minutes}:${seconds} ${ampm}`;
}

export function parseResults(
  raw: (
    | { status: "success"; result: unknown }
    | { status: "failure"; error: Error }
  )[]
): AnswerFetchedItems[] {
  const parsed: AnswerFetchedItems[] = [];

  for (const item of raw) {
    if (item.status === "failure") {
      console.error("Multicall error:", item.error);
      continue; // skip failed item
    }

    if (!Array.isArray(item.result)) {
      console.warn("Unexpected result format:", item.result);
      continue;
    }

    const [
      id,
      questionId,
      address,
      metadata,
      createdAt,
      upvotes,
      downvotes,
      amount,
    ] = item.result as [
      bigint,
      bigint,
      `0x${string}`,
      string,
      bigint,
      bigint,
      bigint,
      bigint
    ];

    let parsedMetadata: { content: string; owner: string };
    try {
      parsedMetadata = JSON.parse(metadata);
    } catch {
      parsedMetadata = { content: "", owner: "" };
    }

    parsed.push({
      id: Number(id),
      questionId: Number(questionId),
      address,
      content: parsedMetadata.content,
      owner: parsedMetadata.owner,
      createdAt: Number(createdAt),
      upvotes: Number(upvotes),
      downvotes: Number(downvotes),
      amount: Number(amount),
    });
  }

  return parsed;
}

export function sortAnswersByVotes(
  answers: AnswerFetchedItems[]
): AnswerFetchedItems[] {
  return answers.sort((a, b) => {
    // Primary: higher upvotes first
    if (b.upvotes !== a.upvotes) return b.upvotes - a.upvotes;

    // Secondary: fewer downvotes first
    return a.downvotes - b.downvotes;
  });
}
