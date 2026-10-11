"use client";

import { useRouter, usePathname } from "next/navigation";

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { label: "Home", path: "/dashboard" },
    { label: "Workouts", path: "/workouts" },
    { label: "Nutrition", path: "/nutrition" }, // ✅ ADDED
    { label: "Progress", path: "/progress" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 flex justify-around py-3 z-50">

      {tabs.map((tab) => {
        const active = pathname === tab.path;

        return (
          <button
            key={tab.path}
            onClick={() => router.push(tab.path)}
            className={`text-sm transition ${
              active ? "text-emerald-400" : "text-zinc-400"
            }`}
          >
            {tab.label}
          </button>
        );
      })}

    </div>
  );
}