import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
type Props = {
  steps: { label: string }[];
  selectedImage: File | null;
  preprocessedUrl: Blob | null;
  overlayedUrl: Blob | null;
  activeStep: number;
  handleStepClick: (stepIndex: number) => void;
};

export default function TimelineAnalyze({
  steps,
  selectedImage,
  preprocessedUrl,
  overlayedUrl,
  activeStep = 0,
  handleStepClick,
}: Props) {
  return (
    <Card className="shadow-lg animate-fade-in-up">
      <CardHeader>
        <CardTitle className="text-xl text-white flex items-center gap-2">
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
                        ? "text-white"
                        : idx < activeStep
                        ? "text-green-600"
                        : "text-gray-400"
                    }
                  `}
              >
                {step.label}
              </span>
              {idx < steps.length - 1 && <div className={`w-full h-1 mt-2`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          {activeStep === 0 && selectedImage && (
            <Image
              width={300}
              height={300}
              src={URL.createObjectURL(selectedImage)}
              alt="Original"
              className="rounded-xl border-2 border-indigo-200 shadow-lg max-h-72 transition-all duration-500"
            />
          )}
          {activeStep === 1 && preprocessedUrl && (
            <Image
              width={300}
              height={300}
              src={URL.createObjectURL(preprocessedUrl)}
              alt="Preprocessed"
              className="rounded-xl border-2 border-green-200 shadow-lg max-h-72 transition-all duration-500"
            />
          )}
          {activeStep === 2 && overlayedUrl && (
            <Image
              width={300}
              height={300}
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
  );
}
