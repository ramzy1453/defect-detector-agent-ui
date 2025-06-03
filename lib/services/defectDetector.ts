import { useMutation } from "@tanstack/react-query";
import { zbot } from "../api";

export function usePreprocessImage() {
  return useMutation({
    mutationFn: zbot.defectDetector.preprocessImage,
  });
}
export function useOverlayImage() {
  return useMutation({
    mutationFn: zbot.defectDetector.overlayImage,
  });
}

export function useAnalyseImageStream() {
  return useMutation({
    mutationFn: async ({
      file,
      query,
      onMessage,
    }: {
      file: File;
      query: string;
      onMessage: (line: string) => void;
    }) => {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("query", query);

      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to connect to analysis endpoint.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed) onMessage(trimmed);
        }
      }

      if (buffer.trim()) onMessage(buffer.trim());
    },
  });
}
