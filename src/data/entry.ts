import { v4 as uuidv4 } from "uuid";

export interface Entry {
  _id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

const localISODate = (date: Date) => {
  const pad = (number: number) => String(number).padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());

  return `${year}-${month}-${day}`;
};

// YYYY-MM-DD-reflection
export const generateReflectionID = (date: Date) => {
  return localISODate(date) + "-reflection";
};

// YYYY-MM-DD-memory-UUID
export const generateMemoryID = (date: Date) => {
  return `${localISODate(date)}-memory-${uuidv4()}`;
};
