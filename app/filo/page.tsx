"use client";

import {
  usePreprocessImage,
  useOverlayImage,
  useAnalyseImageStream,
} from "@/lib/services/defectDetector";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";

const steps = [
  { label: "Original" },
  { label: "Preprocessed" },
  { label: "Overlayed" },
];

export default function FiloPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [inputText, setInputText] = useState<string>("");
  const [preprocessedUrl, setPreprocessedUrl] = useState<Blob | null>(null);
  const [overlayedUrl, setOverlayedUrl] = useState<Blob | null>(null);
  const [markdown, setMarkdown] = useState<string>("");
  const [activeStep, setActiveStep] = useState<number>(0);

  const preprocessImage = usePreprocessImage();
  const overlayImage = useOverlayImage();

  const analyseImage = useAnalyseImageStream();

  const handleRunPipeline = async () => {
    if (!selectedImage || !inputText) return;
    setActiveStep(1);

    try {
      const preprocessedBlob = await preprocessImage.mutateAsync(selectedImage);
      setPreprocessedUrl(preprocessedBlob);

      const overlayedBlob = await overlayImage.mutateAsync(preprocessedBlob);
      setOverlayedUrl(overlayedBlob);

      setMarkdown("");
      setActiveStep(2);

      analyseImage.mutate({
        file: new File([overlayedBlob], "overlayed.png", { type: "image/png" }),
        query: inputText,
        onMessage: (line: string) => {
          console.log({ line });
          const parsed = JSON.parse(line.trim());
          console.log({ parsed });
          if (parsed?.event === "RunResponse") {
            setMarkdown((prev) => prev + " " + parsed?.content);
          } else {
            setMarkdown((prev) => prev + `- ${parsed?.content}\n\n`);
          }
        },
      });
    } catch (error) {
      console.error("Error running pipeline:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedImage(file);
    setPreprocessedUrl(null);
    setOverlayedUrl(null);
    setMarkdown("");
    setActiveStep(0);
  };

  // Stepper navigation
  const handleStepClick = (idx: number) => {
    if (idx === 0) setActiveStep(0);
    if (idx === 1 && preprocessedUrl) setActiveStep(1);
    if (idx === 2 && overlayedUrl) setActiveStep(2);
  };

  return (
    <div className="bg-red-100 text-gray-900 min-h-screen flex items-center justify-center">
      <div className="py-10 flex items-center gap-8 border border-red-300 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex-1">
          <Card className="shadow-2xl animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
                <span role="img" aria-label="upload">
                  📤
                </span>
                Run Defect Detection Pipeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file:bg-indigo-600 file:text-white file:rounded file:px-4 file:py-2 file:mr-4"
                  disabled={preprocessImage.isPending || overlayImage.isPending}
                />
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Describe the context or add notes..."
                  className="min-h-[60px] font-mono"
                  disabled={preprocessImage.isPending || overlayImage.isPending}
                />
                <Button
                  className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-bold py-2 px-6 rounded shadow-lg hover:scale-105 transition"
                  onClick={handleRunPipeline}
                  disabled={
                    !selectedImage ||
                    !inputText ||
                    preprocessImage.isPending ||
                    overlayImage.isPending
                  }
                >
                  {preprocessImage.isPending || overlayImage.isPending ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        ></path>
                      </svg>
                      Running...
                    </span>
                  ) : (
                    "Run Pipeline"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col flex-1">
          {/* Stepper Timeline */}
          <Card className="shadow-lg animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-xl text-indigo-700 flex items-center gap-2">
                <span role="img" aria-label="timeline">
                  🪄
                </span>
                Pipeline Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                {steps.map((step, idx) => (
                  <div
                    key={step.label}
                    className={`flex-1 flex flex-col items-center cursor-pointer transition group`}
                    onClick={() => handleStepClick(idx)}
                  >
                    <div
                      className={`
                    w-10 h-10 flex items-center justify-center rounded-full border-2
                    ${
                      activeStep === idx
                        ? "bg-indigo-600 border-indigo-600 text-white scale-110 shadow-lg"
                        : idx < activeStep
                        ? "bg-green-400 border-green-400 text-white"
                        : "bg-gray-200 border-gray-300 text-gray-400"
                    }
                    transition
                  `}
                    >
                      {idx + 1}
                    </div>
                    <span
                      className={`mt-2 text-xs font-semibold
                    ${
                      activeStep === idx
                        ? "text-indigo-700"
                        : idx < activeStep
                        ? "text-green-600"
                        : "text-gray-400"
                    }
                  `}
                    >
                      {step.label}
                    </span>
                    {idx < steps.length - 1 && (
                      <div
                        className={`w-full h-1 bg-gradient-to-r from-indigo-200 to-pink-200 mt-2`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                {activeStep === 0 && selectedImage && (
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Original"
                    className="rounded-xl border-2 border-indigo-200 shadow-lg max-h-72 transition-all duration-500"
                  />
                )}
                {activeStep === 1 && preprocessedUrl && (
                  <img
                    src={URL.createObjectURL(preprocessedUrl)}
                    alt="Preprocessed"
                    className="rounded-xl border-2 border-green-200 shadow-lg max-h-72 transition-all duration-500"
                  />
                )}
                {activeStep === 2 && overlayedUrl && (
                  <img
                    src={URL.createObjectURL(overlayedUrl)}
                    alt="Overlayed"
                    className="rounded-xl border-2 border-pink-200 shadow-lg max-h-72 transition-all duration-500"
                  />
                )}
                {!selectedImage && (
                  <p className="text-gray-400">No image selected.</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Markdown Result */}
          <Card className="mt-8 shadow-lg animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-xl text-indigo-700 flex items-center gap-2">
                <span role="img" aria-label="note">
                  📝
                </span>
                Generated Result (Markdown)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-indigo bg-indigo-50 rounded p-4 min-h-[120px]">
                {markdown === "" && (
                  <p className="text-sm text-indigo-500">Streaming result...</p>
                )}
                {markdown !== "" && <ReactMarkdown>{markdown}</ReactMarkdown>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
