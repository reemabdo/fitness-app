"use client";

import { useState } from "react";
import BottomNav from "../components/BottomNav";

export default function NutritionPage() {
  const [week] = useState([
    { day: "Mon", calories: 2100, protein: 130, carbs: 220, fats: 60 },
    { day: "Tue", calories: 1950, protein: 125, carbs: 200, fats: 55 },
    { day: "Wed", calories: 2250, protein: 140, carbs: 240, fats: 70 },
    { day: "Thu", calories: 1800, protein: 120, carbs: 190, fats: 50 },
    { day: "Fri", calories: 2300, protein: 145, carbs: 250, fats: 75 },
    { day: "Sat", calories: 2500, protein: 150, carbs: 270, fats: 80 },
    { day: "Sun", calories: 2000, protein: 128, carbs: 210, fats: 58 },
  ]);

  const meals = [
    {
      name: "Breakfast",
      items: "Oats, Banana, Peanut Butter",
      calories: 520,
    },
    {
      name: "Lunch",
      items: "Chicken, Rice, Broccoli",
      calories: 680,
    },
    {
      name: "Snack",
      items: "Greek Yogurt, Berries",
      calories: 220,
    },
    {
      name: "Dinner",
      items: "Salmon, Sweet Potato, Greens",
      calories: 610,
    },
  ];

  const today = week[week.length - 1];

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-28">

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-semibold">Nutrition</h1>
          <p className="text-zinc-400 text-sm">
            Weekly breakdown of your food intake
          </p>
        </div>

        {/* TODAY SUMMARY */}
        <div className="grid grid-cols-3 gap-3">

          <div className="p-4 rounded-3xl bg-white/5 border border-white/10">
            <p className="text-xs text-zinc-400">Calories</p>
            <h2 className="text-xl font-bold text-emerald-400">
              {today.calories}
            </h2>
          </div>

          <div className="p-4 rounded-3xl bg-white/5 border border-white/10">
            <p className="text-xs text-zinc-400">Protein</p>
            <h2 className="text-xl font-bold text-blue-400">
              {today.protein}g
            </h2>
          </div>

          <div className="p-4 rounded-3xl bg-white/5 border border-white/10">
            <p className="text-xs text-zinc-400">Carbs</p>
            <h2 className="text-xl font-bold text-yellow-400">
              {today.carbs}g
            </h2>
          </div>

        </div>

        {/* WEEKLY CHART */}
        <div className="p-5 rounded-3xl bg-white/5 border border-white/10">

          <h3 className="font-semibold mb-4">Weekly Calories</h3>

          <div className="flex items-end justify-between h-40">

            {week.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-2">

                <div
                  className="w-6 bg-emerald-400 rounded-xl"
                  style={{
                    height: `${(d.calories / 2600) * 140}px`,
                  }}
                ></div>

                <p className="text-xs text-zinc-400">{d.day}</p>

              </div>
            ))}

          </div>

        </div>

        {/* MACROS BREAKDOWN */}
        <div className="p-5 rounded-3xl bg-white/5 border border-white/10">

          <h3 className="font-semibold mb-4">Macros (Today)</h3>

          <div className="space-y-4">

            <div>
              <div className="flex justify-between text-sm">
                <span>Protein</span>
                <span className="text-blue-400">{today.protein}g</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full mt-1">
                <div
                  className="h-2 bg-blue-400 rounded-full"
                  style={{ width: `${(today.protein / 160) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <span>Carbs</span>
                <span className="text-yellow-400">{today.carbs}g</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full mt-1">
                <div
                  className="h-2 bg-yellow-400 rounded-full"
                  style={{ width: `${(today.carbs / 300) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <span>Fats</span>
                <span className="text-pink-400">{today.fats}g</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full mt-1">
                <div
                  className="h-2 bg-pink-400 rounded-full"
                  style={{ width: `${(today.fats / 90) * 100}%` }}
                />
              </div>
            </div>

          </div>

        </div>

        {/* MEALS */}
        <div className="p-5 rounded-3xl bg-white/5 border border-white/10">

          <h3 className="font-semibold mb-4">Today's Meals</h3>

          <div className="space-y-3">

            {meals.map((m, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-black/40 border border-white/10"
              >

                <div className="flex justify-between">
                  <p className="font-medium">{m.name}</p>
                  <span className="text-emerald-400 text-sm">
                    {m.calories} kcal
                  </span>
                </div>

                <p className="text-xs text-zinc-400 mt-1">
                  {m.items}
                </p>

              </div>
            ))}

          </div>

        </div>

      </div>

      <BottomNav />
    </div>
  );
}