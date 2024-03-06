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
import { cn } from "@/lib/utils";

import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { requestDataSchema } from "./schema";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { RequestOutput } from "./requestOutput";
import { responseDataInterface } from "./interface";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CardProps = React.ComponentProps<typeof Card>;

export function RequestURLCard({
  className,
  form,
  ...props
}: CardProps & {
  form: UseFormReturn<z.infer<typeof requestDataSchema>>;
}) {
  const [responseData, setResponseData] = useState<responseDataInterface>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof requestDataSchema>) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    setIsLoading(true);
    const start = performance.now();

    const res = await fetch("/api" + values.endpoint, {
      method: values.method,
      headers: headers,
      body: values.method === "GET" ? undefined : JSON.stringify(values.data),
    });

    const resText = await res.text();

    const end = performance.now();

    try {
      setResponseData({
        status: res.status,
        statusMessage: res.statusText,
        time: end - start,
        data:
          resText.length === 0
            ? ""
            : JSON.stringify(JSON.parse(resText), null, 4),
      });
    } catch (error) {
      setResponseData({
        status: null,
        statusMessage: "Input error",
        time: 0,
        data: "Please input the correct parameters.",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const exampleData: string = '"name": "Yuda",\n"age": 15';

  return (
    <>
      <Card className={cn("w-full", className)} {...props}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Send a request to:</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className=" flex flex-row items-center justify-between space-x-4 rounded-md border p-4">
                <div>
                  <FormField
                    control={form.control}
                    name="method"
                    render={({ field }) => (
                      <FormItem>
                        <Select {...field} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="GET">GET</SelectItem>
                            <SelectItem value="POST">POST</SelectItem>
                            <SelectItem value="PUT">PUT</SelectItem>
                            <SelectItem value="PATCH">PATCH</SelectItem>
                            <SelectItem value="DELETE">DELETE</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-[90%]">
                  <FormField
                    control={form.control}
                    name="endpoint"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter the endpoint for the request"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <p className="text-muted-foreground text-sm">
                For URLs that have an &apos;:id&apos; in them, replace them with
                valid IDs
              </p>

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
                      Leave the field empty if no data is needed. <br />
                      To know what data is required, try sending an empty body
                      request.
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
