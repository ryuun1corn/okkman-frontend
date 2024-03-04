"use client";
import { DatePicker } from "@/components/elements/datePicker/DatePicker";
import { EndpointsSheet } from "@/components/elements/endpointsSheet/endpointsSheet";
import { RequestURLCard } from "@/components/elements/requestUrlCard/requestUrlBar";
import { requestDataSchema } from "@/components/elements/requestUrlCard/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Home() {
  const [method, setMethod] = useState<
    "GET" | "POST" | "DELETE" | "PATCH" | "PUT" | null
  >(null);

  const form = useForm<z.infer<typeof requestDataSchema>>({
    resolver: zodResolver(requestDataSchema),
  });

  return (
    <main className="flex min-h-screen flex-col gap-5 items-center justify-around p-5">
      <div className="w-full md:w-[80%] flex flex-col gap-4">
        <div className="flex flex-row items-stretch gap-3">
          <EndpointsSheet setMethod={setMethod} setEndpoint={form.setValue} />
          <DatePicker />
        </div>
        {method === null ? (
          <p>Please select an endpoint.</p>
        ) : (
          <RequestURLCard form={form} method={method} />
        )}
      </div>
    </main>
  );
}
