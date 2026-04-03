import { WorkoutEntry as WorkoutEntryType } from "@/types";
import { Card } from "@/components/ui/card";

export default function WorkoutEntry({ entry }: { entry: WorkoutEntryType }) {
  return (
    <Card className="flex justify-between items-center px-4 py-3 bg-muted/30 border shadow-sm touch-manipulation hover:bg-muted/50 transition-colors rounded-lg">
      <div className="flex flex-col">
        <span className="font-bold text-lg text-primary">{entry.movement}</span>
      </div>
      <div className="flex items-center space-x-2 tabular-nums">
        <span className="text-2xl font-black text-foreground">{entry.reps}</span>
        <span className="text-muted-foreground text-sm">×</span>
        <span className="text-xl font-bold bg-primary/10 px-2 py-1 rounded text-primary">
          {entry.weight} <span className="text-[10px] font-normal uppercase opacity-70">kg</span>
        </span>
      </div>
    </Card>
  );
}
