"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Workout } from "@/types";
import { Zap } from "lucide-react";

const formSchema = z.object({
  movement: z.string().min(2, "Movement must be at least 2 characters"),
  reps: z.coerce.number().min(1, "Reps must be at least 1"),
  weight: z.coerce.number().min(0, "Weight cannot be negative"),
});

interface WorkoutFormProps {
  onSave: (movement: string, reps: number, weight: number) => Promise<void>;
  lastEntry?: Workout;
  unit: "kg" | "lbs";
  suggestions?: string[];
}

export default function WorkoutForm({ onSave, lastEntry, unit, suggestions = [] }: WorkoutFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      movement: lastEntry?.movement || "",
      reps: lastEntry?.reps || 0,
      weight: lastEntry?.weight || 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await onSave(values.movement, values.reps, values.weight);
      form.reset({
        movement: values.movement,
        reps: values.reps,
        weight: values.weight,
      });
    } catch (error) {
      console.error("Failed to save:", error);
    }
  }

  const handleQuickAdd = () => {
    if (lastEntry) {
      form.reset({
        movement: lastEntry.movement,
        reps: lastEntry.reps,
        weight: lastEntry.weight,
      });
    }
  };

  return (
    <Card className="shadow-xl border-ring/20 bg-card/50 backdrop-blur-sm border-2">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-black tracking-tight uppercase italic text-primary">Log Set</CardTitle>
        {lastEntry && (
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={handleQuickAdd}
            className="h-8 gap-1.5 text-[10px] font-black uppercase tracking-wider border-primary/20 hover:bg-primary/5 hover:text-primary transition-all"
          >
            <Zap className="w-3 h-3 fill-primary text-primary" />
            Quick Last Set
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="movement"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <div className="flex justify-between items-end mb-1">
                    <FormLabel className="text-[10px] font-black uppercase tracking-widest opacity-50">Movement</FormLabel>
                    <div className="flex gap-1">
                      {suggestions.slice(0, 2).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => form.setValue("movement", s)}
                          className="text-[9px] font-bold px-2 py-0.5 bg-muted hover:bg-primary/10 hover:text-primary rounded-full transition-colors border border-border"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <FormControl>
                    <Input list="movements" placeholder="e.g. Bench Press" {...field} className="h-12 text-lg font-bold bg-background/50 border-2 focus-visible:ring-primary/30" />
                  </FormControl>
                  <datalist id="movements">
                    {suggestions.map((s) => (
                      <option key={s} value={s} />
                    ))}
                  </datalist>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="reps"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black uppercase tracking-widest opacity-50">Reps</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className="h-12 text-xl font-black text-center bg-background/50 border-2" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black uppercase tracking-widest opacity-50">Weight ({unit})</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.5" {...field} className="h-12 text-xl font-black text-center bg-background/50 border-2" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full h-14 text-lg font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.98] transition-all bg-primary hover:bg-primary/90">
              Add Log
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
