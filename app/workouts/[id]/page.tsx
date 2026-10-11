"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { workouts } from "@/lib/workouts";

export default function WorkoutMode() {
  const { id } = useParams();

  const workout = workouts.find((w) => w.id === id);

  const [index, setIndex] = useState(0);
  const [resting, setResting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  if (!workout) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Workout not found
      </div>
    );
  }

  const current = workout.exercises[index];
  const total = workout.exercises.length;

  // REST TIMER
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (resting && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    }

    if (resting && timeLeft === 0) {
      setResting(false);
      setTimeLeft(30);
      handleNext();
    }

    return () => clearTimeout(timer);
  }, [resting, timeLeft]);

  function handleNext() {
    if (index < total - 1) {
      setIndex((i) => i + 1);
    }
  }

  function startRest() {
    setResting(true);
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-black to-black" />

      {/* TOP PROGRESS */}
      <div className="relative px-6 pt-6">
        <div className="flex justify-between text-sm text-zinc-400">
          <span>{workout.title}</span>
          <span>
            {index + 1} / {total}
          </span>
        </div>

        <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-400 transition-all"
            style={{
              width: `${((index + 1) / total) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative flex flex-col items-center justify-center px-6 pt-10 text-center">

        {/* EXERCISE NAME */}
        <h1 className="text-3xl font-semibold">{current.name}</h1>
        <p className="text-zinc-400 mt-1">{current.sets}</p>

        {/* VIDEO (FOCAL POINT) */}
        <div className="mt-6 w-full max-w-md aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <iframe
            src={current.video}
            className="w-full h-full"
            allowFullScreen
          />
        </div>

        {/* MOTIVATION TEXT */}
        <p className="text-zinc-500 text-sm mt-6">
          Stay controlled. Focus on form.
        </p>
      </div>

      {/* FLOATING CONTROLS */}
      <div className="fixed bottom-6 left-0 right-0 px-6">

        <div className="max-w-md mx-auto grid grid-cols-2 gap-3">

          <button
            onClick={startRest}
            className="
              py-4 rounded-2xl
              bg-white/5 border border-white/10
              backdrop-blur-xl
            "
          >
            Rest
          </button>

          <button
            onClick={handleNext}
            className="
              py-4 rounded-2xl
              bg-emerald-400 text-black font-medium
            "
          >
            Next
          </button>

        </div>
      </div>

      {/* REST OVERLAY */}
      {resting && (
        <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center text-center">

          <p className="text-2xl text-zinc-400">Rest</p>

          <p className="text-6xl font-semibold text-emerald-400 mt-4">
            {timeLeft}
          </p>

          <p className="text-zinc-500 mt-2 text-sm">
            Recover before next set
          </p>

        </div>
      )}

    </div>
  );
}