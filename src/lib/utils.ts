import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: Array<string | undefined | null | Record<string, boolean>>) {
  // Merge conditional class names safely with tailwind-merge
  // Using any here would be unsafe; narrow types above for clarity
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return twMerge(clsx(inputs as any));
}


