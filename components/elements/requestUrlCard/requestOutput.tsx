import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { responseDataInterface } from "./interface";

export function RequestOutput({
  responseData,
  isLoading,
}: {
  responseData: responseDataInterface | undefined;
  isLoading: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Output</CardTitle>
        <CardDescription>
          Status code:{" "}
          <span className="font-bold">
            {responseData?.status} - {responseData?.statusMessage}{" "}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre">
          {isLoading ? "Please wait..." : responseData?.data}
        </p>
      </CardContent>
    </Card>
  );
}
