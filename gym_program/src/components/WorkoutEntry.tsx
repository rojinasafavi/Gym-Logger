import { WorkoutEntry as WorkoutEntryType } from "@/types";

export default function WorkoutEntry({ entry }: { entry: WorkoutEntryType }) {
  return (
    <div className="flex justify-between items-center p-3 bg-card border-b last:border-0 hover:bg-accent transition-colors">
      <div className="font-medium">{entry.movement}</div>
      <div className="text-sm font-mono text-muted-foreground tabular-nums">
        {entry.reps} × {entry.weight} kg
      </div>
    </div>
  );
}
