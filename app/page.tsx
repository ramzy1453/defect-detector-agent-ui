"use client";

import { zbot } from "@/lib/api";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

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
              const parsed = JSON.parse(line.trim());
              console.log({ parsed });
              if (parsed?.event === "RunResponse") {
                setMessage((prev) => prev + " " + parsed?.content);
              } else {
                setMessage((prev) => prev + `- ${parsed?.content}\n\n`);
              }
            }
          );
        }}
        className="border border-gray-300 rounded p-2 mb-4"
      />
      (
      <div className="bg-white p-4">
        <h2 className="text-lg font-semibold mb-2">Message: </h2>
        <ReactMarkdown>
          {message || "*No result yet. Run the pipeline to generate output.*"}
        </ReactMarkdown>
      </div>
      )
    </div>
  );
}
