"use client";

import { addToPlan, PLAN_LIMIT, toggleSaved, useFitnessPlan } from "../lib/fitness-plan";

export default function WorkoutActions({ workout }) {
  const { plan, saved, ready, storageError } = useFitnessPlan();
  const inPlan = plan.some((item) => item.id === String(workout.id));
  const isSaved = saved.some((item) => item.id === String(workout.id));
  const full = plan.length >= PLAN_LIMIT;

  return (
    <div className="mt-8">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={!ready || inPlan || full}
          onClick={() => addToPlan(workout)}
          className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#d5ff00] px-5 py-3 text-xs font-bold text-[#11150a] transition-colors hover:bg-[#e2ff4d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5ff00] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span aria-hidden="true">{inPlan ? "✓" : "+"}</span>
          {inPlan ? "Added to today's plan" : full ? "Today's plan is full" : "Add to today's plan"}
        </button>
        <button
          type="button"
          disabled={!ready}
          aria-pressed={isSaved}
          onClick={() => toggleSaved(workout)}
          className={`inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border px-5 py-3 text-xs font-medium transition-colors hover:border-[#999faa] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5ff00] disabled:cursor-wait disabled:opacity-60 ${isSaved ? "border-[#d5ff00] text-[#d5ff00]" : "border-[#34363d] text-[#b1b5bd] hover:text-white"}`}
        >
          <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
            <path d="M6 4h12v17l-6-4-6 4V4Z" />
          </svg>
          {isSaved ? "Saved for later" : "Save for later"}
        </button>
      </div>
      {full && !inPlan ? <p className="mt-3 text-xs text-[#999faa]">Finish or remove a workout to make room. Your plan holds up to five lifts.</p> : null}
      {storageError ? <p role="alert" className="mt-2 text-xs text-amber-300">{storageError}</p> : null}
    </div>
  );
}
