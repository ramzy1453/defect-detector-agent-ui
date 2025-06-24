import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "../ui/button";

type Props = {
  markdown: string;
  logs?: string[];
};

export default function MarkdownResult({ markdown, logs }: Props) {
  const [showLogs, setShowLogs] = useState(true);
  return (
    <Card className="mt-8 shadow-lg animate-fade-in-up">
      <CardHeader className="flex justify-between items-center p-4">
        <CardTitle className="text-xl text-white flex items-center gap-2">
          <span role="img" aria-label="note">
            📝
          </span>
          Generated Result (Markdown)
        </CardTitle>
        <Button>
          <span
            className="text-sm text-gray-400 cursor-pointer"
            onClick={() => setShowLogs(!showLogs)}
          >
            {showLogs ? "Hide Logs" : "Show Logs"}
          </span>
        </Button>
      </CardHeader>
      <CardContent>
        {showLogs && logs && logs.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white">Logs:</h3>
            <ul className="list-disc pl-5 text-sm text-gray-300">
              {logs.map((log, index) => (
                <li key={index}>{log}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="text-white border rounded p-4 prose markdown-body max-w-full">
          {markdown === "" && <p className="text-sm">Streaming result...</p>}
          {markdown !== "" && (
            <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
