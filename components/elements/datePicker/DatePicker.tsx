"use client";

import * as React from "react";
import { format } from "date-fns";

import { CalendarIcon, ClipboardCopyIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { PopoverClose } from "@radix-ui/react-popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function DatePicker() {
  const [date, setDate] = React.useState<Date>();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <CalendarIcon className="mr-2 h-3 w-3" />
          Date Picker
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 flex flex-col items-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
        <div className="flex items-center space-x-6 rounded-md border p-3 m-3">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              {date ? format(date, "PPP") : <span>Select a date</span>}:
            </p>
            <div className="flex flex-row items-center gap-4">
              <p className="text-sm text-muted-foreground">
                {date ? date.toISOString() : <span>No date selected</span>}
              </p>
              {date ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <PopoverClose>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            if (date !== undefined)
                              navigator.clipboard.writeText(
                                date?.toISOString()
                              );
                          }}
                        >
                          <ClipboardCopyIcon className="h-4 w-4" />
                        </Button>
                      </PopoverClose>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy to clipboard</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : null}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
