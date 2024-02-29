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
import { AccordionDemo } from "./nodeAccordion";

export function EndpointsSheet() {
  return (
    <Sheet key="left">
      <SheetTrigger asChild>
        <Button variant="outline">Change endpoint</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>OKK-Man Endpoints</SheetTitle>
          <SheetDescription>
            Change endpoints for testing different parts of the API. Click
            &apos;Change&apos; when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <AccordionDemo />
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
