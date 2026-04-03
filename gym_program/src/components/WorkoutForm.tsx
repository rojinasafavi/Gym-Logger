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

const formSchema = z.object({
  movement: z.string().min(2, "Movement must be at least 2 characters"),
  reps: z.coerce.number().min(1, "Reps must be at least 1"),
  weight: z.coerce.number().min(0, "Weight cannot be negative"),
});

export default function WorkoutForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      movement: "",
      reps: 0,
      weight: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted (Mock):", values);
    form.reset({ movement: values.movement, reps: values.reps, weight: values.weight });
  }

  return (
    <Card className="shadow-lg border-2 border-primary/10">
      <CardHeader>
        <CardTitle className="text-xl font-bold tracking-tight">Log Set</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="movement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Movement</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Bench Press" {...field} className="h-12 text-lg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="reps"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reps</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className="h-12 text-lg text-center" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (kg)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.5" {...field} className="h-12 text-lg text-center" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full h-14 text-lg font-bold shadow-md hover:scale-[1.02] active:scale-95 transition-all">
              Log Exercise
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
