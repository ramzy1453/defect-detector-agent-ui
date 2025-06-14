"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useIclStore } from "@/hooks/useIcl";

const FormSchema = z.object({
  promptingMethod: z.enum(["direct", "icl"], {
    required_error: "You need to select a notification type.",
  }),
});

export function PromptingForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const uploadedImages = useIclStore((state) => state.uploadedImages);
  const setUploadedImages = useIclStore((state) => state.setUploadedImages);
  const addImage = useIclStore((state) => state.addImage);
  const removeImage = useIclStore((state) => state.removeImage);
  const clearImages = useIclStore((state) => state.clearImages);

  const [showClearAll, setShowClearAll] = useState(false);

  console.log({ uploadedImages });

  // Handle image upload
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newImages = Array.from(files).map((file) => ({
      file,
      label: "",
    }));
    addImage(newImages[0]);
    // Reset input value so same file can be uploaded again if needed
    e.target.value = "";
  };

  // Remove one image
  const handleRemoveImage = (idx: number) => {
    removeImage(idx);
    // If no images left, hide the clear all button
    if (uploadedImages.length === 1) {
      setShowClearAll(false);
    }
  };

  // Remove all images
  const handleClearAll = () => {
    setUploadedImages([]);
    setShowClearAll(false);
  };

  // Handle query change for each image
  const handleQueryChange = (idx: number, value: string) => {
    const updatedImages = [...uploadedImages];
    updatedImages[idx].label = value;
    setUploadedImages(updatedImages);
  };

  const promptingMethod = form.watch("promptingMethod");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6 border p-6 rounded-lg shadow-md"
      >
        <FormField
          control={form.control}
          name="promptingMethod"
          defaultValue="direct"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Choose Prompting Method</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col"
                >
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="direct" />
                    </FormControl>
                    <FormLabel className="font-normal">Direct</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="icl" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      In-Contexte Learning
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {promptingMethod === "icl" && (
          <div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Uploaded Images</h3>
              {/* Custom file input */}
              <label className="inline-flex items-center gap-2 cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700 transition mb-4 w-fit">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
                  />
                </svg>
                Upload images
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              {/* Clear all button */}
              {uploadedImages.length > 0 && (
                <div className="flex justify-end mb-2">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => setShowClearAll(true)}
                  >
                    Clear All
                  </Button>
                </div>
              )}
              {/* Images list */}
              <ul className="flex flex-col gap-4 max-h-64 overflow-y-auto pr-2">
                {uploadedImages.map((image, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-4 rounded-md p-2 shadow"
                  >
                    <Image
                      width={50}
                      height={50}
                      src={URL.createObjectURL(image.file)}
                      alt={`Sample Image ${index + 1}`}
                      className="w-12 h-12 rounded-md object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/images/placeholder.png";
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Query for this image..."
                      value={image.label}
                      onChange={(e) => handleQueryChange(index, e.target.value)}
                      className="flex-1 border bg-transparent border-gray-300 rounded px-2 py-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveImage(index)}
                      className="text-red-500 hover:bg-red-100"
                      title="Remove image"
                    >
                      <span role="img" aria-label="remove">
                        🗑️
                      </span>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
            <Button type="submit" className="mt-4">
              Submit
            </Button>
            {/* Clear All Confirmation Modal */}
            <Dialog open={showClearAll} onOpenChange={setShowClearAll}>
              <DialogContent className="flex flex-col items-center gap-4">
                <div className="text-lg font-semibold text-red-700">
                  Are you sure you want to remove all images?
                </div>
                <div className="flex gap-4 mt-2">
                  <Button variant="destructive" onClick={handleClearAll}>
                    Yes, clear all
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowClearAll(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </form>
    </Form>
  );
}
