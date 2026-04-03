"use client";

import { useState, useEffect } from "react";
import WorkoutForm from "@/components/WorkoutForm";
import WorkoutList from "@/components/WorkoutList";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { History, Loader2 } from "lucide-react";
import { useWorkouts } from "@/hooks/useWorkouts";

export default function Home() {
  const { workouts, saveWorkout, loading } = useWorkouts();
  const [unit, setUnit] = useState<"kg" | "lbs">("kg");

  useEffect(() => {
    const savedUnit = localStorage.getItem("gym-logger-unit");
    if (savedUnit === "kg" || savedUnit === "lbs") setUnit(savedUnit);
  }, []);

  const toggleUnit = () => {
    const newUnit = unit === "kg" ? "lbs" : "kg";
    setUnit(newUnit);
    localStorage.setItem("gym-logger-unit", newUnit);
  };

  const suggestions = Array.from(new Set(workouts.map(w => w.movement))).slice(0, 5);

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-zinc-950 p-4 md:p-8">
      <div className="max-w-md mx-auto space-y-6">
        <header className="flex justify-between items-center bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm border border-border">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black tracking-tighter text-primary italic">GYM LOGGER</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground opacity-60 leading-none">Push Your Limits</p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={toggleUnit}
              className="h-9 px-3 rounded-xl font-black text-[10px] uppercase tracking-widest border-2 hover:bg-primary/10 transition-all"
            >
              {unit}
            </Button>
            <Link href="/history">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors h-10 w-10">
                <History className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </header>

        <section className="space-y-6">
          <WorkoutForm 
            onSave={saveWorkout} 
            lastEntry={workouts.length > 0 ? workouts[0] : undefined}
            unit={unit}
            suggestions={suggestions}
          />
          
          <div className="h-[400px]">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-primary opacity-20" />
              </div>
            ) : (
              <WorkoutList entries={workouts} />
            )}
          </div>
        </section>

        <footer className="pt-8 pb-4 text-center">
          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest opacity-40">
            &copy; 2026 Gym Logger PWA
          </p>
        </footer>
      </div>
    </main>
  );
}
