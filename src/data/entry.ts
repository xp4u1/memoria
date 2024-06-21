import { v4 as uuidv4 } from "uuid";

export interface Entry {
  _id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

// reflection-YYYY-MM-DD
export const generateReflectionID = (date: Date) => {
  const pad = (number: number) => String(number).padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());

  return `reflection-${year}-${month}-${day}`;
};

// memory-UUID
export const generateMemoryID = () => {
  return "memory-" + uuidv4();
};
