import { WorkoutEntry as WorkoutEntryType } from "@/types";
import WorkoutEntry from "./WorkoutEntry";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function WorkoutList({ entries }: { entries: WorkoutEntryType[] }) {
  return (
    <div className="flex flex-col h-full bg-background/50 rounded-2xl p-4 lg:p-6 border shadow-inner">
      <div className="flex justify-between items-baseline mb-4">
        <h3 className="text-xl font-extrabold tracking-tight">Today&apos;s Workout</h3>
        <span className="text-xs uppercase font-bold text-muted-foreground opacity-70 tracking-widest leading-none">
          {entries.length} Exercises
        </span>
      </div>
      
      <ScrollArea className="flex-1 w-full rounded-md pr-4 -mr-4">
        <div className="space-y-3 pb-4">
          {entries.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-xl border-muted opacity-50 bg-muted/5">
              <span className="text-sm font-medium text-muted-foreground">No entries yet. Start logging!</span>
            </div>
          ) : (
            entries.map((entry, index) => (
              <WorkoutEntry key={index} entry={entry} />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
