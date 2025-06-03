"use client";

import { zbot } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState<string>("");

  return (
    <div className="bg-red-100 text-gray-900 min-h-screen flex items-center justify-center">
      <input
        type="file"
        accept="image/*"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          await zbot.defectDetector.analyseImage(
            file,
            "What is the defect?",
            (line) => {
              console.log({ line });
              setMessage((prev) => prev + " " + line);
            }
          );
        }}
        className="border border-gray-300 rounded p-2 mb-4"
      />
      (
      <div className="bg-white p-4">
        <h2 className="text-lg font-semibold mb-2">Message: {message}</h2>
      </div>
      )
    </div>
  );
}
