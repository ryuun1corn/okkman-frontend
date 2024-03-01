"use client";
import { EndpointsSheet } from "@/components/elements/endpointsSheet/endpointsSheet";
import { RequestURLCard } from "@/components/elements/requestUrlCard/requestUrlBar";
import { useState } from "react";

export default function Home() {
  const [method, setMethod] = useState<
    "GET" | "POST" | "DELETE" | "PATCH" | "PUT" | null
  >(null);
  const [endpoint, setEndpoint] = useState<string>("");

  return (
    <main className="flex min-h-screen flex-col gap-5 items-center justify-between p-24">
      <RequestURLCard endpoint={endpoint} method={method} />
      <EndpointsSheet setEndpoint={setEndpoint} setMethod={setMethod} />
    </main>
  );
}
