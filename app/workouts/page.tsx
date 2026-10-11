"use client";

import Link from "next/link";
import BottomNav from "../components/BottomNav";
import { workouts } from "@/lib/workouts";
import { assets } from "@/lib/assets";

export default function WorkoutsPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src={assets.gymDark}
          className="w-full h-full object-cover opacity-25"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />

      {/* CONTENT */}
      <div className="relative max-w-6xl mx-auto px-6 py-8 space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-semibold">Workouts</h1>
          <p className="text-zinc-400 text-sm">
            Choose a plan and start training
          </p>
        </div>

        {/* WORKOUT CARDS */}
        <div className="space-y-5">

          {workouts.map((w, i) => (
            <Link
              key={w.id}
              href={`/workouts/${w.id}`}
              className="
                block rounded-3xl overflow-hidden
                border border-white/10
                bg-white/5 backdrop-blur-xl
                hover:scale-[1.01] transition
              "
            >

              {/* IMAGE SECTION */}
              <div className="relative h-44">

                <img
                  src={
                    i === 0
                      ? assets.workoutPush
                      : assets.workoutPull
                  }
                  className="w-full h-full object-cover"
                />

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-black/50" />

                {/* TEXT OVER IMAGE */}
                <div className="absolute bottom-0 p-4">
                  <h2 className="text-xl font-semibold">
                    {w.title}
                  </h2>

                  <p className="text-zinc-300 text-sm">
                    {w.level} • {w.duration}
                  </p>
                </div>

              </div>

              {/* DETAILS */}
              <div className="p-4 flex justify-between items-center">

                <p className="text-sm text-zinc-400">
                  {w.exercises.length} exercises
                </p>

                <span className="
                  px-4 py-2 rounded-xl
                  bg-emerald-400 text-black text-sm font-medium
                ">
                  Start
                </span>

              </div>

            </Link>
          ))}

        </div>

      </div>

      <BottomNav />
    </div>
  );
}