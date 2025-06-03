import { DefectDetector } from "./defectDetector";

export class ZBot {
  defectDetector: DefectDetector;
  constructor(private baseUrl: string) {
    this.defectDetector = new DefectDetector(baseUrl);
  }
}

export const zbot = new ZBot("http://localhost:8000");
