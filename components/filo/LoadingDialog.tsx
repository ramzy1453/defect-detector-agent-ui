import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type Props = {
  open: boolean;
};

export default function LoadingDialog({ open }: Props) {
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="flex flex-col items-center gap-4">
        <svg
          className="w-12 h-12 text-indigo-500 animate-spin"
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
        <div className="text-lg font-semibold text-white">
          Traitement en cours...
        </div>
        <div className="text-sm text-gray-500 text-center">
          Wait please while we process your request. This may take a few
          moments.
        </div>
      </DialogContent>
    </Dialog>
  );
}
