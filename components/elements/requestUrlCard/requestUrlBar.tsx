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
import { UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { requestDataSchema } from "./schema";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { RequestOutput } from "./requestOutput";
import { responseDataInterface } from "./interface";

type CardProps = React.ComponentProps<typeof Card>;

export function RequestURLCard({
  className,
  form,
  method,
  ...props
}: CardProps & {
  form: UseFormReturn<z.infer<typeof requestDataSchema>>;
  method: "GET" | "POST" | "DELETE" | "PATCH" | "PUT" | null;
}) {
  const [responseData, setResponseData] = useState<responseDataInterface>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof requestDataSchema>) {
    if (method === null) return;

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    setIsLoading(true);
    const res = await fetch("/api" + values.endpoint, {
      method: method,
      headers: headers,
      body: method === "GET" ? undefined : JSON.stringify(values.data),
    });

    console.log(res.statusText);

    try {
      setResponseData({
        status: res.status,
        statusMessage: res.statusText,
        data: JSON.stringify(await res.json(), null, 4),
      });
    } catch (error) {
      setResponseData({
        status: -1,
        statusMessage: "Input error",
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
                  <p className="text-sm font-medium leading-none">
                    {method === null ? "None" : method}
                  </p>
                </div>
                <div className="w-[90%]">
                  <FormField
                    control={form.control}
                    name="endpoint"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Insert the parameter for the request"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
      <RequestOutput responseData={responseData} isLoading={isLoading} />
    </>
  );
}
