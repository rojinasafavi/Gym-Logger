export default function HistoryPage() {
  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-tight">Workout History</h1>
      </header>
      <section className="space-y-4">
        {/* We will load history from Firestore here in later steps */}
        <p className="text-center py-10 text-muted-foreground border-2 border-dashed rounded-xl border-border">
          Your past workouts will appear here. Stay consistent!
        </p>
      </section>
    </div>
  );
}
