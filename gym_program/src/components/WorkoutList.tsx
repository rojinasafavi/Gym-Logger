import { WorkoutEntry as WorkoutEntryType } from "@/types";
import WorkoutEntry from "./WorkoutEntry";

export default function WorkoutList({ entries }: { entries: WorkoutEntryType[] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold px-1">Today's Entries</h3>
      <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
        {entries.length === 0 ? (
          <p className="p-8 text-center text-muted-foreground italic">
            No entries yet. Start logging!
          </p>
        ) : (
          entries.map((entry, index) => (
            <WorkoutEntry key={index} entry={entry} />
          ))
        )}
      </div>
    </div>
  );
}
