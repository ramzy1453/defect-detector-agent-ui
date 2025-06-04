import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setActiveStep: (step: number) => void;
};

export default function SuccessDialog({
  open,
  onOpenChange,
  setActiveStep,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col items-center gap-4">
        <svg
          className="w-12 h-12 text-green-500"
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
            d="M10 15l-3.5-3.5 1.41-1.41L10 12.17l5.09-5.09 1.41 1.41z"
          ></path>
        </svg>
        <div className="text-lg font-semibold text-green-700">
          Pipeline terminé !
        </div>
        <Button
          className="bg-green-600 text-white px-6 py-2 rounded"
          onClick={() => {
            onOpenChange(false);
            setActiveStep(2); // ou la prochaine étape que tu veux
          }}
        >
          OK
        </Button>
      </DialogContent>
    </Dialog>
  );
}
