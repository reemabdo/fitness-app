"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { assets } from "@/lib/assets";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Check your email for the login link.");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          src={assets.gymDark}
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />

      {/* LOGIN CARD */}
      <div className="relative w-full max-w-md mx-4">

        <div className="
          p-8 rounded-3xl
          bg-white/5 border border-white/10
          backdrop-blur-xl
          shadow-[0_0_80px_rgba(16,185,129,0.15)]
        ">

          {/* HEADER */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold">
              Welcome Back
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Sign in to continue your fitness journey
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-4">

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full px-4 py-3 rounded-xl
                bg-white/5 border border-white/10
                text-white outline-none
                focus:border-emerald-400/50
              "
            />

            <button
              disabled={loading}
              className="
                w-full py-3 rounded-xl
                bg-emerald-400 text-black font-medium
                hover:bg-emerald-300 transition
              "
            >
              {loading ? "Sending link..." : "Send Login Link"}
            </button>

          </form>

          {/* MESSAGE */}
          {message && (
            <p className="text-center text-sm text-zinc-400 mt-4">
              {message}
            </p>
          )}

        </div>

        {/* FOOTER TEXT */}
        <p className="text-center text-xs text-zinc-500 mt-6">
          Powered by your fitness system
        </p>

      </div>
    </div>
  );
}