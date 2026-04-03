import WorkoutForm from "@/components/WorkoutForm";
import WorkoutList from "@/components/WorkoutList";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";

export default function Home() {
  // Mock data for UI development
  const mockEntries = [
    { movement: "Bench Press", reps: 8, weight: 80 },
    { movement: "Squat", reps: 5, weight: 120 },
    { movement: "Squat", reps: 5, weight: 120 },
  ];

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-zinc-950 p-4 md:p-8">
      <div className="max-w-md mx-auto space-y-6">
        <header className="flex justify-between items-center bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm border border-border">
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-primary italic">GYM LOGGER</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground opacity-60">Push Your Limits</p>
          </div>
          <Link href="/history">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors h-10 w-10">
              <History className="w-5 h-5" />
            </Button>
          </Link>
        </header>

        <section className="space-y-6">
          <WorkoutForm />
          
          <div className="h-[400px]">
            <WorkoutList entries={mockEntries} />
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
