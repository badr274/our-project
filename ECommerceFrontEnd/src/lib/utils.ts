import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const truncateText = (text: string, num: number = 100) => {
  return text.length > num ? text.slice(0, num) + "..." : text;
};
