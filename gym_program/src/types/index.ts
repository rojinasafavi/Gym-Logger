import { Timestamp } from "firebase/firestore";

export interface Workout {
  id?: string;
  movement: string;
  reps: number;
  weight: number;
  date: Timestamp;
  createdAt: Timestamp;
}
