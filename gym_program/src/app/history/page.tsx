import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function HistoryPage() {
  // Mock history data
  const mockHistory = [
    {
      date: "April 3, 2026",
      totalExercises: 3,
      movements: ["Bench Press", "Squat", "Pull Ups"],
    },
    {
      date: "April 1, 2026",
      totalExercises: 2,
      movements: ["Deadlift", "Shoulder Press"],
    },
    {
      date: "March 30, 2026",
      totalExercises: 4,
      movements: ["Bicep Curls", "Tricep Pushdowns", "Squat", "Leg Press"],
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-zinc-950 p-4 md:p-8">
      <div className="max-w-md mx-auto space-y-6">
        <header className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm border border-border">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors h-10 w-10">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-secondary italic">HISTORY</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground opacity-60">Your Progress Journey</p>
          </div>
        </header>

        <ScrollArea className="h-[calc(100vh-160px)]">
          <div className="space-y-4 pb-8 pr-4">
            {mockHistory.map((session, idx) => (
              <Card key={idx} className="overflow-hidden hover:border-primary/30 transition-all shadow-md group">
                <CardContent className="p-0">
                  <div className="bg-primary/5 p-4 flex justify-between items-center group-hover:bg-primary/10 transition-colors">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary opacity-60" />
                      <span className="font-bold text-sm tracking-tight">{session.date}</span>
                    </div>
                    <span className="text-[10px] uppercase font-black bg-primary text-primary-foreground px-2 py-1 rounded-full px-2 py-0.5">
                      {session.totalExercises} Exercises
                    </span>
                  </div>
                  <div className="p-4 bg-white dark:bg-zinc-900">
                    <div className="flex flex-wrap gap-2 pt-1">
                      {session.movements.map((move, mIdx) => (
                        <span key={mIdx} className="text-xs font-semibold px-3 py-1 bg-muted rounded-full border border-border">
                          {move}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </main>
  );
}
