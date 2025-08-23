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
