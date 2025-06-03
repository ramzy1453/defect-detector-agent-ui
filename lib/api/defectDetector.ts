import axios from "axios";

export class DefectDetector {
  constructor(private baseUrl: string) {}

  async preprocessImage(file: File): Promise<File> {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post(
      "http://localhost:8000/preprocess",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      }
    );

    return response.data;
  }

  async overlayImage(file: File): Promise<File> {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post(
      "http://localhost:8000/overlay",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      }
    );

    return response.data;
  }
}
