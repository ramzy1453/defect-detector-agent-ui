"use client";

import { usePreprocessImage } from "@/lib/services/defectDetector";
import { useState } from "react";

export default function Home() {
  const [previewUrl, setPreviewUrl] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { mutateAsync: preprocessImage, isPending } = usePreprocessImage();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedImage(file);
    const url = await preprocessImage(file);
    console.log({ url });
    setPreviewUrl(url);
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-4 bg-gray-100 rounded-xl shadow">
      <h1 className="text-xl font-semibold">Upload an image</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="bg-white p-2 rounded"
      />

      {isPending && <p className="text-blue-600">Processing image...</p>}
      <div className="flex gap-8">
        {previewUrl && selectedImage && !isPending && (
          <div>
            <p className="text-green-600">Selected image:</p>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              className="rounded border mt-2"
            />
          </div>
        )}

        {previewUrl && !isPending && (
          <div>
            <p className="text-green-600">Preprocessed image:</p>
            <img
              src={URL.createObjectURL(previewUrl)}
              alt="Preprocessed"
              className="rounded border mt-2"
            />
          </div>
        )}
      </div>
    </div>
  );
}
