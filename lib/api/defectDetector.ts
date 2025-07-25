import { api } from ".";

export class DefectDetector {
  constructor() {}

  async preprocessImage(fileOrBlob: File | Blob): Promise<Blob> {
    const formData = new FormData();

    const file =
      fileOrBlob instanceof File
        ? fileOrBlob
        : new File([fileOrBlob], "input.png", { type: "image/png" });

    formData.append("image", file);

    const response = await api.post("/preprocess", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "blob",
    });

    return response.data;
  }

  async overlayImage(fileOrBlob: File | Blob): Promise<Blob> {
    return new Promise(() => new Blob([fileOrBlob], { type: "image/png" }));
  }

  async analyseImage(
    file: File,
    query: string,
    onMessage: (line: string) => void
  ) {
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
  }
}
