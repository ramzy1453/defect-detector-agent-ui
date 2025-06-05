import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

type Props = {
  markdown: string;
};

export default function MarkdownResult({ markdown }: Props) {
  return (
    <Card className="mt-8 shadow-lg animate-fade-in-up">
      <CardHeader>
        <CardTitle className="text-xl text-white flex items-center gap-2">
          <span role="img" aria-label="note">
            📝
          </span>
          Generated Result (Markdown)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-indigo text-white rounded p-4 min-h-[120px]">
          {markdown === "" && <p className="text-sm">Streaming result...</p>}
          {markdown !== "" && <ReactMarkdown>{markdown}</ReactMarkdown>}
        </div>
      </CardContent>
    </Card>
  );
}
