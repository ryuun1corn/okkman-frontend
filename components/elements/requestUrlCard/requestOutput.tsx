import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function RequestOutput({
  responseData,
  isLoading,
}: {
  responseData: string;
  isLoading: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Output</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre">
          {isLoading ? "Please wait..." : responseData}
        </p>
      </CardContent>
    </Card>
  );
}
