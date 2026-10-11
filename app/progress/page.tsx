"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import BottomNav from "../components/BottomNav";

export default function ProgressPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  // 🌍 Language toggle
  const [lang, setLang] = useState<"en" | "ar">("en");

  // 📉 Weight data
  const weight = [78, 77.5, 77, 76.2, 75.8, 75.2, 74.8];

  const stats = {
    caloriesBurned: 12400,
    workoutsCompleted: 18,
    streak: 5,
    goalProgress: 72,
  };

  const history = [
    { day: "Mon", completed: true },
    { day: "Tue", completed: true },
    { day: "Wed", completed: false },
    { day: "Thu", completed: true },
    { day: "Fri", completed: true },
    { day: "Sat", completed: true },
    { day: "Sun", completed: false },
  ];

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData?.user) {
        router.push("/login");
        return;
      }

      setLoading(false);
    }

    load();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-zinc-950 text-white"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-6xl mx-auto px-6 py-8 pb-28 space-y-8">

        {/* HEADER */}
        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold">
              {lang === "en" ? "Progress" : "التقدم"}
            </h1>

            <p className="text-zinc-400 text-sm mt-1">
              {lang === "en"
                ? "Track your fitness transformation"
                : "تابع تقدم رحلتك الرياضية"}
            </p>
          </div>

          {/* LANGUAGE TOGGLE */}
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sm"
          >
            {lang === "en" ? "AR" : "EN"}
          </button>

        </div>

        {/* HERO CARD */}
        <div className="relative overflow-hidden rounded-3xl h-52">

          <img
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10 h-full flex flex-col justify-end p-6">
            <h2 className="text-2xl font-bold">
              {lang === "en"
                ? "Your Fitness Journey"
                : "رحلتك الرياضية"}
            </h2>

            <p className="text-zinc-200 text-sm mt-1">
              {lang === "en"
                ? "Stay consistent. Results are coming."
                : "استمر، النتائج قادمة"}
            </p>
          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-4">

          <div className="p-5 rounded-3xl bg-white/5 border border-white/10">
            <p className="text-zinc-400 text-sm">
              {lang === "en"
                ? "Calories Burned"
                : "السعرات المحروقة"}
            </p>

            <h2 className="text-3xl font-bold text-emerald-400 mt-2">
              {stats.caloriesBurned}
            </h2>
          </div>

          <div className="p-5 rounded-3xl bg-white/5 border border-white/10">
            <p className="text-zinc-400 text-sm">
              {lang === "en"
                ? "Workouts"
                : "التمارين"}
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {stats.workoutsCompleted}
            </h2>
          </div>

        </div>

        {/* STREAK + GOAL */}
        <div className="grid grid-cols-2 gap-4">

          <div className="p-5 rounded-3xl bg-white/5 border border-white/10">
            <p className="text-zinc-400 text-sm">
              {lang === "en" ? "Streak" : "السلسلة"}
            </p>

            <h2 className="text-3xl font-bold text-orange-400 mt-2">
              🔥 {stats.streak} {lang === "en" ? "days" : "أيام"}
            </h2>
          </div>

          <div className="p-5 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center justify-center">

            <div className="relative w-24 h-24">

              <div className="absolute inset-0 rounded-full border-[10px] border-white/10" />

              <div
                className="absolute inset-0 rounded-full border-[10px] border-emerald-400"
                style={{
                  clipPath: `inset(0 ${100 - stats.goalProgress}% 0 0)`,
                }}
              />

              <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
                {stats.goalProgress}%
              </div>

            </div>

            <p className="text-xs text-zinc-400 mt-3">
              {lang === "en"
                ? "Goal Progress"
                : "تقدم الهدف"}
            </p>

          </div>

        </div>

        {/* WEEKLY ACTIVITY */}
        <div className="p-5 rounded-3xl bg-white/5 border border-white/10">

          <h3 className="font-semibold mb-5">
            {lang === "en"
              ? "Weekly Activity"
              : "النشاط الأسبوعي"}
          </h3>

          <div className="flex items-end justify-between h-36">

            {history.map((d, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2"
              >

                <div
                  className={`w-7 rounded-xl ${
                    d.completed
                      ? "bg-emerald-400 h-24"
                      : "bg-white/10 h-10"
                  }`}
                />

                <p className="text-xs text-zinc-400">
                  {d.day}
                </p>

              </div>
            ))}

          </div>

        </div>

        {/* 📈 REAL LINE GRAPH */}
        <div className="p-5 rounded-3xl bg-white/5 border border-white/10">

          <h3 className="font-semibold mb-5">
            {lang === "en"
              ? "Weight Progress"
              : "تقدم الوزن"}
          </h3>

          <div className="relative h-52">

            {/* Y AXIS */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] text-zinc-400">
              <span>80kg</span>
              <span>78kg</span>
              <span>76kg</span>
              <span>74kg</span>
            </div>

            {/* GRAPH */}
            <div className="ml-10 h-full">

              <svg
                className="w-full h-full"
                viewBox="0 0 300 120"
              >

                {/* GRID */}
                {[0, 1, 2, 3].map((i) => (
                  <line
                    key={i}
                    x1="0"
                    x2="300"
                    y1={(i * 120) / 3}
                    y2={(i * 120) / 3}
                    stroke="rgba(255,255,255,0.06)"
                  />
                ))}

                {/* LINE */}
                <polyline
                  fill="none"
                  stroke="#60A5FA"
                  strokeWidth="3"
                  points={weight
                    .map((w, i) => {
                      const x =
                        (i / (weight.length - 1)) * 300;

                      const y =
                        120 - (w - 74) * 18;

                      return `${x},${y}`;
                    })
                    .join(" ")}
                />

                {/* POINTS */}
                {weight.map((w, i) => {
                  const x =
                    (i / (weight.length - 1)) * 300;

                  const y =
                    120 - (w - 74) * 18;

                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#60A5FA"
                    />
                  );
                })}

              </svg>

            </div>

            {/* X AXIS */}
            <div className="ml-10 flex justify-between text-[10px] text-zinc-400 mt-2">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>

          </div>

        </div>

      </div>

      <BottomNav />
    </div>
  );
}