import { useMutation } from "@tanstack/react-query";
import { zbot } from "../api";

export function usePreprocessImage() {
  return useMutation({
    mutationFn: zbot.defectDetector.preprocessImage,
  });
}
export function usOoverlayImage() {
  return useMutation({
    mutationFn: zbot.defectDetector.overlayImage,
  });
}
