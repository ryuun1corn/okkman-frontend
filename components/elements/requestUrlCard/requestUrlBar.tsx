"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";

import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { requestDataSchema } from "./schema";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

type CardProps = React.ComponentProps<typeof Card>;

export function RequestURLCard({
  className,
  endpoint,
  method,
  ...props
}: CardProps & {
  endpoint: string;
  method: "GET" | "POST" | "DELETE" | "PATCH" | "PUT" | null;
}) {
  const form = useForm<z.infer<typeof requestDataSchema>>({
    resolver: zodResolver(requestDataSchema),
  });

  const [responseData, setResponseData] = useState<string>(
    "No output yet, send a request?"
  );

  async function onSubmit(values: z.infer<typeof requestDataSchema>) {
    if (method === null) return;

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const res = await fetch(endpoint, {
      method: method,
      headers: headers,
      body: method === "GET" ? undefined : JSON.stringify(values.data),
    });

    setResponseData(JSON.stringify(await res.json(), null, 4));
  }

  const exampleData: string = '"name": "Yuda",\n"age": 15';

  return (
    <>
      <Card className={cn("w-full md:w-[80%]", className)} {...props}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Send a request to: </CardTitle>
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
              <FormField
                control={form.control}
                name="data"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payload</FormLabel>
                    <FormControl>
                      <Textarea placeholder={exampleData} {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the data needed for the request. <br />
                      Leave the field empty if no data is needed.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit">
                Send <PaperPlaneIcon className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Output</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre">{responseData}</p>
        </CardContent>
      </Card>
    </>
  );
}
