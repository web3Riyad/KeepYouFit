"use client";

import { useSyncExternalStore } from "react";
import { notify } from "./notify";

export const PLAN_LIMIT = 5;
export const STORAGE_KEY = "fitlog:workouts:v1";
const emptySnapshot = { plan: [], saved: [], ready: false, storageError: "" };
let snapshot = emptySnapshot;
const listeners = new Set();

function summarizeWorkout(workout) {
  if (!workout || !["string", "number"].includes(typeof workout.id) || !workout.name) return null;
  return {
    id: String(workout.id),
    name: String(workout.name),
    image: typeof workout.image === "string" ? workout.image : "/banner.png",
    equipment: String(workout.equipment ?? "Bodyweight"),
    duration: Math.max(0, Number(workout.duration) || 0),
    caloriesBurned: Math.max(0, Number(workout.caloriesBurned) || 0),
    rating: Math.max(0, Number(workout.rating) || 0),
  };
}

function restoreList(list) {
  const unique = new Map();
  if (Array.isArray(list)) {
    for (const item of list) {
      const workout = summarizeWorkout(item);
      if (workout) unique.set(workout.id, workout);
    }
  }
  return [...unique.values()];
}

function readStorage() {
  try {
    const data = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    return {
      plan: data?.version === 1 ? restoreList(data.plan).slice(0, PLAN_LIMIT) : [],
      saved: data?.version === 1 ? restoreList(data.saved) : [],
      ready: true,
      storageError: "",
    };
  } catch (error) {
    return {
      ...emptySnapshot,
      ready: true,
      storageError: error instanceof SyntaxError ? "" : "Browser storage is unavailable. Changes will last for this visit only.",
    };
  }
}

function emit() {
  listeners.forEach((listener) => listener());
}

function onStorage(event) {
  if (event.key === STORAGE_KEY || event.key === null) {
    snapshot = readStorage();
    emit();
  }
}

function subscribe(listener) {
  if (listeners.size === 0) {
    snapshot = readStorage();
    window.addEventListener("storage", onStorage);
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot() {
  return emptySnapshot;
}

function commit(next) {
  snapshot = { ...snapshot, ...next };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, plan: snapshot.plan, saved: snapshot.saved }));
    snapshot = { ...snapshot, storageError: "" };
  } catch {
    snapshot = { ...snapshot, storageError: "Browser storage is unavailable. Changes will last for this visit only." };
  }
  emit();
}

export function addToPlan(data) {
  const workout = summarizeWorkout(data);
  if (!workout) return notify("This workout could not be added.", "error");
  if (snapshot.plan.some((item) => item.id === workout.id)) return notify(`${workout.name} is already in today's plan.`, "info");
  if (snapshot.plan.length >= PLAN_LIMIT) return notify("Your plan is full. Finish or remove a workout before adding another.", "warning");
  commit({ plan: [...snapshot.plan, workout] });
  return notify(`${workout.name} added to today's plan.`);
}

export function removeFromPlan(id, completed = false) {
  const workout = snapshot.plan.find((item) => item.id === String(id));
  if (!workout) return "";
  commit({ plan: snapshot.plan.filter((item) => item.id !== String(id)) });
  return completed
    ? notify(`${workout.name} completed. You have room for another workout!`)
    : notify(`${workout.name} removed from today's plan.`, "info");
}

export function removeSaved(id) {
  const workout = snapshot.saved.find((item) => item.id === String(id));
  if (!workout) return "";
  commit({ saved: snapshot.saved.filter((item) => item.id !== String(id)) });
  return notify(`${workout.name} removed from saved workouts.`, "info");
}

export function toggleSaved(data) {
  const workout = summarizeWorkout(data);
  if (!workout) return notify("This workout could not be saved.", "error");
  if (snapshot.saved.some((item) => item.id === workout.id)) return removeSaved(workout.id);
  commit({ saved: [...snapshot.saved, workout] });
  return notify(`${workout.name} saved for later.`);
}

export function useFitnessPlan() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
