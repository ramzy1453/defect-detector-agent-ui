"use client";

import {
  usePreprocessImage,
  useOverlayImage,
  useAnalyseImageStream,
} from "@/lib/services/defectDetector";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PromptingForm } from "@/components/filo/PromptingForm";
import MarkdownResult from "@/components/filo/MarkdownResult";
import SuccessDialog from "@/components/filo/SuccessDialog";
import LoadingDialog from "@/components/filo/LoadingDialog";
import TimelineAnalyze from "@/components/filo/TimelineAnalyze";
import { ArrowLeftSquare } from "lucide-react";
import Link from "next/link";
import { useIclStore } from "@/hooks/useIcl";

const steps = [
  { label: "Original" },
  { label: "Preprocessed" },
  { label: "Overlayed" },
];

export default function GeneratePage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [inputText, setInputText] = useState<string>("");
  const [preprocessedUrl, setPreprocessedUrl] = useState<Blob | null>(null);
  const [overlayedUrl, setOverlayedUrl] = useState<string | null>(null);
  const [markdown, setMarkdown] = useState<string>("");
  const [activeStep, setActiveStep] = useState<number>(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const uploadedImages = useIclStore((state) => state.uploadedImages);

  const preprocessImage = usePreprocessImage();
  // const overlayImage = useOverlayImage();

  const analyseImage = useAnalyseImageStream();

  useEffect(() => {
    if (preprocessImage.isSuccess) {
      setShowSuccessModal(true);
    }
  }, [preprocessImage.isSuccess]);

  const handleRunPipeline = async () => {
    if (!selectedImage || !inputText) return;
    setActiveStep(1);

    try {
      const preprocessedBlob = await preprocessImage.mutateAsync(selectedImage);
      setPreprocessedUrl(preprocessedBlob);

      // const overlayedBlob = await overlayImage.mutateAsync(preprocessedBlob);
      // setOverlayedUrl(overlayedBlob);

      setMarkdown("");
      setActiveStep(2);

      analyseImage.mutate({
        file: new File([preprocessedBlob], "overlayed.png", {
          type: "image/png",
        }),
        uploadedImages,
        iclEnabled: uploadedImages.length > 0,
        query: inputText,
        onMessage: (line: string) => {
          const parsed = JSON.parse(line.trim());
          console.log({ parsed });
          if (
            parsed?.event === "RunResponse" ||
            parsed?.event === "RunCompleted"
          ) {
            setMarkdown((prev) => prev + " " + parsed?.content);
          } else if (parsed?.event === "OverlayedImage") {
            setOverlayedUrl(`data:${parsed?.mime};base64,${parsed?.content}`);
          } else {
            setLogs((prev) => [...prev, parsed?.content]);
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

  const handleStepClick = (idx: number) => {
    if (idx === 0) setActiveStep(0);
    if (idx === 1 && preprocessedUrl) setActiveStep(1);
    if (idx === 2 && overlayedUrl) setActiveStep(2);
  };

  return (
    <>
      <LoadingDialog open={preprocessImage.isPending} />
      <SuccessDialog
        open={showSuccessModal}
        onOpenChange={setShowSuccessModal}
        setActiveStep={setActiveStep}
      />
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="py-10 flex gap-8 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex-1 flex flex-col gap-8">
            <Button className="mb-4" asChild>
              <Link href="/">
                <ArrowLeftSquare /> Home
              </Link>
            </Button>

            <Card className="shadow-2xl animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
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
                    className="file:bg-white file:text-black file:rounded file:px-4 file:py-2 file:mr-4"
                    disabled={preprocessImage.isPending}
                  />
                  <Textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Describe the context or add notes..."
                    className="min-h-[60px] font-mono text-white"
                    disabled={preprocessImage.isPending}
                  />
                  <Button
                    className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-bold py-2 px-6 rounded shadow-lg hover:scale-105 transition"
                    onClick={handleRunPipeline}
                    disabled={
                      !selectedImage || !inputText || preprocessImage.isPending
                    }
                  >
                    {preprocessImage.isPending ? (
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
            <div>
              <PromptingForm />
            </div>
          </div>

          <div className="flex flex-col flex-1">
            <TimelineAnalyze
              steps={steps}
              selectedImage={selectedImage}
              preprocessedUrl={preprocessedUrl}
              overlayedUrl={overlayedUrl}
              activeStep={activeStep}
              handleStepClick={handleStepClick}
            />

            <MarkdownResult markdown={markdown} logs={logs} />
          </div>
        </div>
      </div>

      {/* <MarkdownResult markdown={markdown} /> */}
    </>
  );
}
