"use client";

import { useState, useEffect } from "react";
import { getTodaysWorkouts, addWorkout } from "@/lib/firebase";
import { Workout } from "@/types";
import { Timestamp } from "firebase/firestore";

export function useWorkouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const data = await getTodaysWorkouts();
      setWorkouts(data);
    } catch (err) {
      setError("Failed to fetch workouts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const saveWorkout = async (movement: string, reps: number, weight: number) => {
    const newEntry = {
      movement,
      reps,
      weight,
      date: Timestamp.now(),
    };

    // Optimistic Update
    const tempId = Math.random().toString(36).substring(7);
    const tempWorkout: Workout = {
      id: tempId,
      ...newEntry,
      createdAt: Timestamp.now(),
    };

    setWorkouts((prev) => [tempWorkout, ...prev]);

    try {
      await addWorkout(newEntry);
      // Refresh to get server timestamps/ids
      fetchWorkouts();
    } catch (err) {
      // Rollback on error
      setWorkouts((prev) => prev.filter((w) => w.id !== tempId));
      setError("Failed to save workout");
      throw err;
    }
  };

  return { workouts, loading, error, saveWorkout, refresh: fetchWorkouts };
}
