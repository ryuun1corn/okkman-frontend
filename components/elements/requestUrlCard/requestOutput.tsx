import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { responseDataInterface } from "./interface";
import { ReloadIcon } from "@radix-ui/react-icons";

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
          <br />
          Time: <span className="font-bold">{responseData?.time} ms</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs md:text-sm font-semibold whitespace-pre text-wrap break-all">
          {isLoading ? (
            <div className="w-full flex flex-col items-center justify-center gap-3 m-5">
              <ReloadIcon className="mr-2 h-10 w-10 animate-spin" />
              <br />
              Please wait...
            </div>
          ) : responseData === undefined ? (
            "No output yet? Try sending a request!"
          ) : (
            responseData.data
          )}
        </p>
      </CardContent>
    </Card>
  );
}
