/**
 * Firestore Security Rules (Development Only):
 * 
 * rules_version = '2';
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     match /workouts/{document=**} {
 *       allow read, write: if true;
 *     }
 *   }
 * }
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  orderBy, 
  Timestamp,
  serverTimestamp 
} from "firebase/firestore";
import { Workout } from "@/types";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);

/**
 * Persist a new workout session to Firestore
 */
export async function addWorkout(workout: Omit<Workout, "id" | "createdAt">) {
  try {
    const workoutsRef = collection(db, "workouts");
    const docRef = await addDoc(workoutsRef, {
      ...workout,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding workout: ", error);
    throw error;
  }
}

/**
 * Fetch entries for today's workout
 */
export async function getTodaysWorkouts() {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const workoutsRef = collection(db, "workouts");
    const q = query(
      workoutsRef,
      where("date", ">=", Timestamp.fromDate(startOfDay)),
      where("date", "<=", Timestamp.fromDate(endOfDay)),
      orderBy("date", "desc")
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Workout[];
  } catch (error) {
    console.error("Error getting today's workouts: ", error);
    throw error;
  }
}

/**
 * Retrieve all past workouts ordered by date
 */
export async function getWorkoutHistory() {
  try {
    const workoutsRef = collection(db, "workouts");
    const q = query(workoutsRef, orderBy("date", "desc"));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Workout[];
  } catch (error) {
    console.error("Error getting workout history: ", error);
    throw error;
  }
}
