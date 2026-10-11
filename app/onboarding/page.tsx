"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

const choiceButtonBase =
  "w-full rounded-2xl border px-5 py-4 text-left text-sm font-medium tracking-tight transition";

const choiceButtonIdle =
  "border-white/10 bg-white/[0.03] text-zinc-200 hover:border-white/18 hover:bg-white/[0.05]";

const choiceButtonSelected =
  "border-emerald-400 bg-emerald-500 text-black shadow-md";

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [goal, setGoal] = useState("");
  const [activity, setActivity] = useState("");
  const [diet, setDiet] = useState("");

  function next() {
    setStep((s) => s + 1);
  }

  function back() {
    setStep((s) => s - 1);
  }

  async function finish() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    console.log("USER:", user);
  
    if (!user) {
      console.error("No user found");
      return;
    }
  
    const { data, error } = await supabase
  .from("profiles")
  .upsert(
    {
      id: user.id,
      goal,
      activity,
      diet,
    },
    { onConflict: "id" }
  )
  .select();
  
    console.log("INSERT DATA:", data);
    console.log("INSERT ERROR:", error);
  
    if (error) return;
  
    router.push("/dashboard");
  }
  

  return (
    <div className="min-h-screen bg-zinc-950 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(52,211,153,0.25),transparent),radial-gradient(ellipse_80%_50%_at_50%_120%,rgba(34,211,238,0.10),transparent)] text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
              FitFuel
            </p>
            <p className="text-sm font-semibold">Onboarding</p>
          </Link>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {/* TITLE + PROGRESS */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight">
            Onboarding
          </h1>

          <div className="mt-3 flex items-center gap-3">
            <div className="h-1.5 w-28 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-emerald-400 transition-all duration-300"
                style={{
                  width: step === 1 ? "33%" : step === 2 ? "66%" : "100%",
                }}
              />
            </div>

            <p className="text-sm text-white/80">
              Step {step} of 3
            </p>
          </div>
        </div>

        {/* CARD */}
        <div className="mx-auto max-w-xl">
          <div className="rounded-3xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-xl shadow-xl">
            {step === 1 && (
              <>
                <h2 className="text-2xl font-semibold">
                  What&apos;s your main goal?
                </h2>

                <div className="mt-6 space-y-3">
                  {["Lose fat", "Build muscle", "Maintain weight"].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGoal(g)}
                      className={`${choiceButtonBase} ${
                        goal === g ? choiceButtonSelected : choiceButtonIdle
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-2xl font-semibold">
                  Activity level?
                </h2>

                <div className="mt-6 space-y-3">
                  {["Sedentary", "Moderate", "Very active"].map((a) => (
                    <button
                      key={a}
                      onClick={() => setActivity(a)}
                      className={`${choiceButtonBase} ${
                        activity === a
                          ? choiceButtonSelected
                          : choiceButtonIdle
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="text-2xl font-semibold">
                  Dietary preference?
                </h2>

                <div className="mt-6 space-y-3">
                  {["No preference", "High protein", "Vegetarian"].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDiet(d)}
                      className={`${choiceButtonBase} ${
                        diet === d ? choiceButtonSelected : choiceButtonIdle
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* NAV */}
            <div className="mt-8 flex justify-between">
              {step > 1 ? (
                <button
                  onClick={back}
                  className="text-sm text-white/70 hover:text-white"
                >
                  Back
                </button>
              ) : (
                <span />
              )}

              {step < 3 ? (
                <button
                  onClick={next}
                  className="rounded-xl bg-emerald-500 px-5 py-2 text-sm font-medium text-black"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={finish}
                  className="rounded-xl bg-emerald-500 px-5 py-2 text-sm font-medium text-black"
                >
                  Finish
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}