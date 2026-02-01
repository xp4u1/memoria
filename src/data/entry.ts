import { v4 as uuidv4 } from "uuid";

export interface Entry {
  _id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Format a Date as a local ISO-like date string (YYYY-MM-DD)
 * in the runtime's local timezone
 */
const localISODate = (date: Date) => {
  const pad = (number: number) => String(number).padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());

  return `${year}-${month}-${day}`;
};

/**
 * Generate the fixed reflection id (YYYY-MM-DD-reflection)
 * for a given date.
 */
export const generateReflectionID = (date: Date) => {
  return localISODate(date) + "-reflection";
};

/**
 * Generate the new memory id (YYYY-MM-DD-memory-UUID)
 * for a given date.
 */
export const generateMemoryID = (date: Date) => {
  return `${localISODate(date)}-memory-${uuidv4()}`;
};
