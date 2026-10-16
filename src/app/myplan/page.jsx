

"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Footer from "../../components/Footer";
import { removeFromPlan, removeSaved, useFitnessPlan } from "../../lib/fitness-plan";

const headingFont = "font-[Impact,'Arial_Narrow',sans-serif] font-normal tracking-[0.025em] uppercase";
const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5ff00]";

function StatIcon({ type }) {
  return (
    <svg aria-hidden="true" className="size-3.5 shrink-0 text-[#d5ff00]" viewBox="0 0 24 24" fill={type === "calories" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {type === "duration" ? <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></> : type === "calories" ? <path d="M13.5 2c.5 4-2.5 5.5-2.5 8-1.5-.5-2-1.5-2-3C6 9.5 4 12 4 15a8 8 0 0 0 16 0c0-5-3-9-6.5-13Z" /> : <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />}
    </svg>
  );
}

function MyPlan() {
  const searchParams = useSearchParams();
  const savedTab = searchParams.get("tab") === "saved";
  const { plan, saved, ready, storageError } = useFitnessPlan();
    
  const [sortBy, setSortBy] = useState("duration");
    
  const items = [...(savedTab ? saved : plan)].sort((a, b) => {
    if (sortBy === "duration") return a.duration - b.duration;
    return b[sortBy] - a[sortBy];
  });
  const minutes = plan.reduce((sum, workout) => sum + workout.duration, 0);
  const calories = plan.reduce((sum, workout) => sum + workout.caloriesBurned, 0);

  return (
    <div className="flex flex-1 flex-col bg-[#0e1013] text-white">
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pt-9 pb-10 sm:px-6 sm:pt-10 sm:pb-9 lg:px-10">
        <h1 className={`${headingFont} text-[28px] leading-tight`}>My Plan</h1>
        <p className="mt-2 text-xs leading-5 text-[#999faa]">Cap of five lifts for today. Finish them, then load more.</p>

        <dl aria-label="Today's plan totals" aria-busy={!ready} className="mt-6 grid grid-cols-3 divide-x divide-[#1d2027] rounded-2xl border border-[#20232b] bg-[#12151b] px-1 py-7 sm:mt-6 sm:px-0">
          {[["Exercises", plan.length], ["Minutes", minutes], ["Calories", calories]].map(([label, value], index) => (
            <div key={label} className="px-4 sm:px-6">
              <dt className="text-[10px] leading-4 text-[#999faa] sm:text-xs">{label}</dt>
              <dd className={`${headingFont} mt-1 text-3xl leading-none sm:text-[34px] ${index === 0 ? "text-[#d5ff00]" : "text-white"}`}>{ready ? value : "—"}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Workout lists" className="inline-flex rounded-xl border border-[#20232b] bg-[#15181e] p-1 text-[11px] font-medium">
            <Link href="/myplan" scroll={false} aria-current={!savedTab ? "page" : undefined} className={`rounded-lg px-4 py-2 transition-colors ${focusRing} ${!savedTab ? "bg-[#22262f] text-white shadow-sm" : "text-[#999faa] hover:text-white"}`}>Today&apos;s Plan</Link>
            <Link href="/myplan?tab=saved" scroll={false} aria-current={savedTab ? "page" : undefined} className={`rounded-lg px-5 py-2 transition-colors ${focusRing} ${savedTab ? "bg-[#22262f] text-white shadow-sm" : "text-[#999faa] hover:text-white"}`}>Saved</Link>
          </nav>
          <label className="flex items-center gap-3 text-[11px] text-[#999faa]">
            Sort By
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className={`min-h-9 cursor-pointer rounded-lg border border-[#252831] bg-[#12151b] px-2 text-[11px] text-[#d1d5db] ${focusRing}`}>
              <option value="duration">Duration</option>
              <option value="caloriesBurned">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </label>
        </div>

        {storageError ? <p role="alert" className="mt-4 text-xs text-amber-300">{storageError}</p> : null}

        <section aria-label={savedTab ? "Saved workouts" : "Today's workouts"} aria-busy={!ready} className="mt-5">
          {!ready ? (
            <div className="flex min-h-64 items-center justify-center rounded-xl border border-dashed border-[#20232b] text-sm text-[#999faa]">Loading your workouts…</div>
          ) : items.length === 0 ? (
            <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed border-[#20232b] px-4 py-12 text-center">
              <h2 className={`${headingFont} text-lg`}>Nothing here yet</h2>
              <p className="mt-1 text-xs leading-5 text-[#999faa]">Browse the library and add a lift to get today moving.</p>
              <Link href="/" className={`mt-5 rounded-full bg-[#d5ff00] px-6 py-2.5 text-[11px] font-bold text-[#11150a] shadow-[0_5px_22px_#d5ff0012] transition-colors hover:bg-[#e2ff4d] ${focusRing}`}>Go to workouts</Link>
            </div>
          ) : (
            <ul className="space-y-3.5">
              {items.map((workout) => (
                <li key={workout.id}>
                  <article className="flex flex-wrap items-center gap-4 rounded-2xl border border-[#20232b] bg-[#14171d] p-3 sm:flex-nowrap">
                    <Link href={`/workouts/${encodeURIComponent(workout.id)}`} aria-label={`View ${workout.name} details`} className={`relative h-[74px] w-[126px] shrink-0 overflow-hidden rounded-lg ${focusRing}`}>
                      <Image src={workout.image} alt={workout.name} fill sizes="126px" className="object-cover" />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <h2 className={`${headingFont} text-base leading-tight`}>{workout.name}</h2>
                      <p className="mt-1 text-[11px] text-[#999faa]">{workout.equipment}</p>
                      <ul aria-label="Workout statistics" className="mt-2 flex flex-wrap gap-x-3 gap-y-2 text-[10px] text-[#b1b5bd]">
                        <li className="flex items-center gap-1"><StatIcon type="duration" />{workout.duration} min</li>
                        <li className="flex items-center gap-1"><StatIcon type="calories" />{workout.caloriesBurned} kcal</li>
                        <li className="flex items-center gap-1"><StatIcon type="rating" /><span className="sr-only">Rating: </span>{workout.rating}</li>
                      </ul>
                    </div>
                    <div className="flex w-full flex-wrap items-center justify-end gap-2.5 sm:ml-auto sm:w-auto sm:shrink-0">
                      <Link href={`/workouts/${encodeURIComponent(workout.id)}`} className={`rounded-full border border-[#343946] px-4 py-2 text-[10px] text-[#d1d5db] transition-colors hover:border-[#999faa] hover:text-white ${focusRing}`}>View Details<span className="sr-only"> for {workout.name}</span></Link>
                      {!savedTab ? (
                        <button type="button" onClick={() => removeFromPlan(workout.id, true)} className={`flex cursor-pointer items-center gap-2 rounded-full bg-[#d5ff00] px-4 py-2 text-[10px] font-bold text-[#11150a] transition-colors hover:bg-[#e2ff4d] ${focusRing}`}>
                          <span aria-hidden="true">✓</span> Mark as Done<span className="sr-only">: {workout.name}</span>
                        </button>
                      ) : null}
                      <button type="button" aria-label={`Remove ${workout.name} from ${savedTab ? "saved workouts" : "today's plan"}`} onClick={() => savedTab ? removeSaved(workout.id) : removeFromPlan(workout.id)} className={`flex size-9 cursor-pointer items-center justify-center rounded-full text-[#777f8e] transition-colors hover:bg-white/5 hover:text-white ${focusRing}`}>
                        <svg aria-hidden="true" className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m7 7 10 10M7 17 17 7" /></svg>
                      </button>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default function MyPlanPage() {
  return <Suspense fallback={<main className="flex-1 bg-[#0e1013] p-10 text-[#999faa]">Loading your plan…</main>}><MyPlan /></Suspense>;
}
