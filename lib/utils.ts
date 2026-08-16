import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const EVENT_PAST_GRACE_PERIOD_MS = 3 * 60 * 60 * 1000;

export function isEventPast(timestamp: string) {
  return Date.now() > new Date(timestamp).getTime() + EVENT_PAST_GRACE_PERIOD_MS;
}
