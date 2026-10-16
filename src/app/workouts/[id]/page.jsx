import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import WorkoutActions from "../../../components/WorkoutActions";

export default async function WorkoutDetails({ params }) {
  const { id } = await params;
  let workouts;

  try {
    const response = await fetch("https://api.abcz.workers.dev/api/fitlog", {cache: "no-store"});
    if (!response.ok) throw new Error("Unable to load workouts");
    workouts = await response.json();
    if (!Array.isArray(workouts)) throw new Error("Invalid workout data");
  } catch {
    return (
      <main className="flex-1 bg-[#0c0d0f] px-6 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-2xl font-medium">Unable to load this workout</h1>
          <p className="mt-3 text-[#999faa]">Please try again in a moment.</p>
          <Link href="/" className="mt-6 inline-block text-[#d5ff00] underline">Back to workouts</Link>
        </div>
      </main>
    );
  }

  const workout = workouts.find((item) => String(item.id) === id);
  if (!workout) notFound();

  const statistics = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", workout.sets],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", workout.rating],
  ];

  return (
    <main className="flex-1 bg-[#0c0d0f] px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="mb-6 inline-block rounded text-sm text-[#d5ff00] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5ff00]">
          &larr; Back to workouts
        </Link>
        <article className="grid items-start gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-[#25272e]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              sizes="(min-width: 1280px) 592px, (min-width: 768px) calc((100vw - 96px) / 2), calc(100vw - 32px)"
              className="object-cover object-center"
            />
          </div>

          <div className="min-w-0">
              <h1 className="font-[Impact,'Arial_Narrow',sans-serif] text-3xl leading-tight font-normal tracking-[0.02em] uppercase sm:text-4xl">{workout.name}</h1>
              <p className="mt-2 text-sm leading-relaxed text-[#999faa]">{workout.description}</p>
              <ul aria-label="Muscle groups" className="mt-4 flex flex-wrap gap-2">
                {workout.muscleGroups.map((muscle) => (
                  <li key={muscle} className="rounded-full bg-[#d5ff00] px-3 py-0.5 text-[10px] font-bold text-[#11150a]">{muscle}</li>
                ))}
              </ul>
              <dl className="mt-6 overflow-hidden rounded-xl border border-[#25272e] bg-[#15171c]">
                {statistics.map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-4 border-b border-[#25272e]/60 px-4 py-3 last:border-b-0 sm:px-5">
                    <dt className="shrink-0 text-[10px] font-bold tracking-[0.06em] text-[#999faa] uppercase">{label}</dt>
                    <dd className="text-right text-xs text-[#d1d5db]">{value}</dd>
                  </div>
                ))}
              </dl>

          <section aria-labelledby="instructions-title" className="mt-7">
            <h2 id="instructions-title" className="text-sm font-bold tracking-wide uppercase">Instructions</h2>
            <ol className="mt-4 list-decimal space-y-3 pl-4 text-xs leading-relaxed text-[#999faa]">
              {workout.instructions.map((instruction, index) => (
                <li key={index} className="pl-1">{instruction}</li>
              ))}
            </ol>
          </section>

          <WorkoutActions workout={workout} />
          </div>
        </article>
      </div>
    </main>
  );
}
