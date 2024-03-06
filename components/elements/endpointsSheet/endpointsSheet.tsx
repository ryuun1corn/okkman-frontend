"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EndpointsAccordion } from "./nodeAccordion";
import { UseFormSetValue } from "react-hook-form";
import { requestDataSchema } from "../requestUrlCard/schema";
import { z } from "zod";

export function EndpointsSheet({
  setForm: setEndpoint,
}: {
  setForm: UseFormSetValue<z.infer<typeof requestDataSchema>>;
}) {
  return (
    <Sheet key="left">
      <SheetTrigger asChild>
        <Button>Select Endpoint</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>OKK-Man Endpoints</SheetTitle>
          <SheetDescription>
            Here are all the endpoints that are available for the API.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[80%] w-full rounded-md border p-4 bg-slate-300 bg-opacity-35 my-4">
          <div>
            <EndpointsAccordion setEndpoint={setEndpoint} />
          </div>
        </ScrollArea>
        <SheetFooter className="text-muted-foreground inline-block text-center w-full">
          Made with ❤️ by Yuda
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
