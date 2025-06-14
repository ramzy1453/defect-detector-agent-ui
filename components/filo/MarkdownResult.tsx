import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
        <div className="text-white border rounded p-4 prose markdown-body">
          {markdown === "" && <p className="text-sm">Streaming result...</p>}
          {markdown !== "" && (
            <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
