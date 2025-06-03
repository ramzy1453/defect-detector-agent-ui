import axios from "axios";
import { DefectDetector } from "./defectDetector";

export const api = axios.create({
  baseURL: "http://localhost:8000",
});

export class ZBot {
  defectDetector: DefectDetector;
  constructor() {
    this.defectDetector = new DefectDetector();
  }
}

export const zbot = new ZBot();
