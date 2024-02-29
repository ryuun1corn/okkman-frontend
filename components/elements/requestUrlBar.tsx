"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Separator } from "@radix-ui/react-separator";

type CardProps = React.ComponentProps<typeof Card>;

export function RequestURLBar({
  className,
  endpoint,
  method,
  ...props
}: CardProps & {
  endpoint: string;
  method: "GET" | "POST" | "DELETE" | "PATCH" | "PUT" | null;
}) {
  return (
    <Card className={cn("w-full md:w-[80%]", className)} {...props}>
      <CardHeader>
        <CardTitle>Send a request to: </CardTitle>
        {/* <CardDescription>You have 3 unread messages.</CardDescription> */}
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <div>
            <p className="text-sm font-medium leading-none">
              {method === null ? "None" : method}
            </p>
          </div>
          <Separator />
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              {!endpoint ? "Please select an endpoint" : endpoint}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          Send <PaperPlaneIcon className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
