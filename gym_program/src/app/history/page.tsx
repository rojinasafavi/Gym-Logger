"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Calendar, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { getWorkoutHistory } from "@/lib/firebase";
import { Workout } from "@/types";

export default function HistoryPage() {
  const [history, setHistory] = useState<{ date: string; movements: string[]; totalExercises: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const data = await getWorkoutHistory();
        
        // Group by date
        const groups: Record<string, Workout[]> = {};
        data.forEach((w) => {
          const dateStr = w.date.toDate().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          });
          if (!groups[dateStr]) groups[dateStr] = [];
          groups[dateStr].push(w);
        });

        const formattedHistory = Object.entries(groups).map(([date, items]) => ({
          date,
          movements: Array.from(new Set(items.map(i => i.movement))),
          totalExercises: items.length
        }));

        setHistory(formattedHistory);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

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
            {loading ? (
              <div className="flex items-center justify-center h-48">
                <Loader2 className="w-8 h-8 animate-spin text-primary opacity-20" />
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-20 opacity-30 uppercase font-black tracking-widest text-xs">No History Found</div>
            ) : (
              history.map((session, idx) => (
                <Card key={idx} className="overflow-hidden hover:border-primary/30 transition-all shadow-md group">
                  <CardContent className="p-0">
                    <div className="bg-primary/5 p-4 flex justify-between items-center group-hover:bg-primary/10 transition-colors">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary opacity-60" />
                        <span className="font-bold text-sm tracking-tight">{session.date}</span>
                      </div>
                      <span className="text-[10px] uppercase font-black bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                        {session.totalExercises} Sets
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
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </main>
  );
}
