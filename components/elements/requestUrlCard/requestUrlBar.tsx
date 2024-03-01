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
import { Input } from "@/components/ui/input";
import { RequestOutput } from "./requestOutput";

type CardProps = React.ComponentProps<typeof Card>;

export function RequestURLCard({
  className,
  endpoint,
  method,
  action,
  ...props
}: CardProps & {
  endpoint: string;
  method: "GET" | "POST" | "DELETE" | "PATCH" | "PUT" | null;
  action: string;
}) {
  const form = useForm<z.infer<typeof requestDataSchema>>({
    resolver: zodResolver(requestDataSchema),
  });

  const [responseData, setResponseData] = useState<string>(
    "No output yet, send a request?"
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof requestDataSchema>) {
    if (method === null) return;

    const regex = new RegExp(":[a-zA-Z]+", "g");

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    setIsLoading(true);
    const res = await fetch(
      "/api" +
        endpoint.replace(regex, values.param !== undefined ? values.param : ""),
      {
        method: method,
        headers: headers,
        body: method === "GET" ? undefined : JSON.stringify(values.data),
      }
    );

    setResponseData(JSON.stringify(await res.json(), null, 4));
    setIsLoading(false);
  }

  const exampleData: string = '"name": "Yuda",\n"age": 15';

  return (
    <>
      <Card className={cn("w-full md:w-[80%]", className)} {...props}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>
                Send a request to: <span>{action}</span>
              </CardTitle>
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
              <div className={`${!endpoint.includes(":id") && "hidden"}`}>
                <FormField
                  control={form.control}
                  name="param"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Query Params</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Insert the parameter for the request"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This field is for the &apos;:id&apos; in the request
                        URL.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
      <RequestOutput responseData={responseData} isLoading={isLoading} />
    </>
  );
}
