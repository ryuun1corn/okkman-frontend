"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EndpointsAccordion } from "./nodeAccordion";
import { Dispatch, SetStateAction } from "react";
import { UseFormSetValue } from "react-hook-form";
import { requestDataSchema } from "../requestUrlCard/schema";
import { z } from "zod";

export function EndpointsSheet({
  setMethod,
  setEndpoint,
}: {
  setMethod: Dispatch<
    SetStateAction<"GET" | "POST" | "DELETE" | "PATCH" | "PUT" | null>
  >;
  setEndpoint: UseFormSetValue<z.infer<typeof requestDataSchema>>;
}) {
  return (
    <Sheet key="left">
      <SheetTrigger asChild>
        <Button>Select endpoint</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>OKK-Man Endpoints</SheetTitle>
          <SheetDescription>
            Change endpoints for testing different parts of the API. Click
            &apos;Change&apos; when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[80%] w-full rounded-md border p-4 bg-slate-300 bg-opacity-35 my-4">
          <div>
            <EndpointsAccordion
              setMethod={setMethod}
              setEndpoint={setEndpoint}
            />
          </div>
        </ScrollArea>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
