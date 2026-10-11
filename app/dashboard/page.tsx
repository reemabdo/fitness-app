"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import BottomNav from "../components/BottomNav";
import { assets } from "@/lib/assets";

type Profile = {
  id: string;
  goal: string;
  activity: string;
  diet: string;
};

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Dashboard() {
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const [calories, setCalories] = useState(0);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hey 👋 I’m your fitness assistant." },
  ]);

  const nextWorkout = {
    name: "Push Day",
    focus: "Chest • Shoulders • Triceps",
    duration: "45 min",
    image: assets.workoutPush,
  };

  const completedWorkouts = [
    { name: "Push Day", status: "completed", date: "Today" },
    { name: "Pull Day", status: "completed", date: "Yesterday" },
    { name: "Leg Day", status: "missed", date: "2 days ago" },
  ];

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;

      if (!user) {
        router.push("/login");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!data) {
        router.push("/onboarding");
        return;
      }

      setProfile(data);

      const base = 2000;

      const multiplier =
        data.activity === "Sedentary"
          ? 1.2
          : data.activity === "Moderate"
          ? 1.55
          : 1.85;

      const adjustment =
        data.goal === "Lose fat"
          ? -450
          : data.goal === "Build muscle"
          ? 300
          : 0;

      setCalories(Math.round(base * multiplier + adjustment));
      setLoading(false);
    }

    load();
  }, [router]);

  function toggleTheme() {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  function sendMessage() {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
      { role: "assistant", content: "Got it — updating your plan." },
    ]);

    setInput("");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div
      className={`min-h-screen relative transition-colors duration-300 ${
        theme === "dark"
          ? "bg-black text-white"
          : "bg-white text-zinc-900"
      }`}
    >

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src={assets.gymDark}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            theme === "light" ? "opacity-10" : "opacity-20"
          }`}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-8 space-y-8 pb-28">

        {/* HEADER */}
        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3">

            <img
              src={assets.avatar}
              className="w-10 h-10 rounded-full border object-cover"
            />

            <div>
              <h1 className="text-xl font-semibold">Dashboard</h1>
              <p className={theme === "dark" ? "text-zinc-400 text-sm" : "text-zinc-600 text-sm"}>
                Welcome back 👋
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <div className="text-emerald-500 font-semibold">
              🔥 5 day streak
            </div>

            <button
              onClick={toggleTheme}
              className={`px-3 py-2 rounded-xl text-sm border transition ${
                theme === "dark"
                  ? "border-white/20 bg-white/5 text-white"
                  : "border-zinc-300 bg-white text-zinc-900 shadow-sm"
              }`}
            >
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </button>

          </div>

        </div>

        {/* DAILY TARGET */}
        <div
          className={`rounded-3xl overflow-hidden relative h-44 border transition ${
            theme === "dark"
              ? "border-white/10 bg-white/5"
              : "border-zinc-200 bg-white shadow-sm"
          }`}
        >

          <img
            src={assets.nutritionBalanced}
            className="w-full h-full object-cover opacity-80"
          />

          <div
            className={`absolute inset-0 p-6 flex flex-col justify-center ${
              theme === "dark"
                ? "bg-black/60 text-white"
                : "bg-white/40 text-zinc-900"
            }`}
          >
            <p className={theme === "dark" ? "text-zinc-300 text-sm" : "text-zinc-600 text-sm"}>
              Daily Target
            </p>
            <h2 className="text-3xl font-semibold text-emerald-400">
              {calories} kcal
            </h2>
          </div>

        </div>

        {/* NEXT WORKOUT */}
        <div className="rounded-3xl overflow-hidden relative h-40">

          <img
            src={nextWorkout.image}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60 p-5 flex flex-col justify-end text-white">

            <p className="text-xs text-zinc-300">Next Workout</p>
            <h3 className="text-xl font-semibold">{nextWorkout.name}</h3>
            <p className="text-sm text-zinc-300">{nextWorkout.focus}</p>

            <button className="mt-3 px-4 py-2 bg-emerald-400 text-black rounded-xl w-fit">
              Start Workout ▶
            </button>

          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-3">

          {[profile.goal, profile.activity, profile.diet].map((item, i) => (
            <div
              key={i}
              className={`p-4 rounded-2xl border transition ${
                theme === "dark"
                  ? "bg-white/5 border-white/10"
                  : "bg-white border-zinc-200 shadow-sm"
              }`}
            >
              <p className={theme === "dark" ? "text-zinc-400 text-xs" : "text-zinc-500 text-xs"}>
                Info
              </p>
              <p className="font-semibold">{item}</p>
            </div>
          ))}

        </div>

        {/* WORKOUT HISTORY */}
        <div
          className={`rounded-3xl p-5 border transition ${
            theme === "dark"
              ? "bg-white/5 border-white/10"
              : "bg-white border-zinc-200 shadow-sm"
          }`}
        >

          <h3 className="text-lg font-semibold mb-3">
            Workout History
          </h3>

          <div className="space-y-2">

            {completedWorkouts.map((w, i) => (
              <div
                key={i}
                className="flex justify-between p-3 rounded-xl border border-white/10"
              >

                <div>
                  <p>{w.name}</p>
                  <p className={theme === "dark" ? "text-zinc-400 text-xs" : "text-zinc-500 text-xs"}>
                    {w.date}
                  </p>
                </div>

                <p className={w.status === "completed" ? "text-emerald-400" : "text-red-400"}>
                  {w.status}
                </p>

              </div>
            ))}

          </div>

        </div>

        {/* ASSISTANT */}
        <div className="rounded-3xl bg-white/5 border border-white/10 p-5 h-[380px] flex flex-col">

          <h3 className="font-semibold mb-3">
            Fitness Assistant
          </h3>

          <div className="flex-1 overflow-y-auto space-y-2">

            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl text-sm max-w-[80%] ${
                  m.role === "user"
                    ? "ml-auto bg-emerald-400 text-black"
                    : "bg-white/10"
                }`}
              >
                {m.content}
              </div>
            ))}

          </div>

          <div className="flex gap-2 mt-3">

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl bg-black/40 border border-white/10"
              placeholder="Ask something..."
            />

            <button
              onClick={sendMessage}
              className="bg-emerald-400 text-black px-4 py-2 rounded-xl"
            >
              Send
            </button>

          </div>

        </div>

      </div>

      <BottomNav />
    </div>
  );
}