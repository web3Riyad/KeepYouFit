import Link from "next/link";

export default function WorkoutNotFound() {
  return (
    <main className="flex-1 bg-[#0c0d0f] px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl font-medium">Workout not found</h1>
        <p className="mt-3 text-[#999faa]">This workout is no longer in the library.</p>
        <Link href="/" className="mt-6 inline-block text-[#d5ff00] underline">Back to workouts</Link>
      </div>
    </main>
  );
}
