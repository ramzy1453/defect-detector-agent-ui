import { create } from "zustand";
import { persist } from "zustand/middleware";
//   const [uploadedImages, setUploadedImages] = useState<
//     { file: File; label: string }[]
//   >([]);
type IclState = {
  uploadedImages: { file: File; label: string }[];
  setUploadedImages: (images: { file: File; label: string }[]) => void;
  addImage: (image: { file: File; label: string }) => void;
  removeImage: (index: number) => void;
  clearImages: () => void;
};

export const useIclStore = create<IclState>((set) => ({
  uploadedImages: [],
  setUploadedImages: (images) => set({ uploadedImages: images }),
  addImage: (image) =>
    set((state) => ({
      uploadedImages: [...state.uploadedImages, image],
    })),
  removeImage: (index) => {
    set((state) => ({
      uploadedImages: state.uploadedImages.filter((_, i) => i !== index),
    }));
  },
  clearImages: () => set({ uploadedImages: [] }),
}));
