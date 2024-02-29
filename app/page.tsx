"use client";
import { EndpointsSheet } from "@/components/elements/endpointsSheet/endpointsSheet";
import { RequestURLBar } from "@/components/elements/requestUrlBar";
import { useState } from "react";

export default function Home() {
  const [method, setMethod] = useState<
    "GET" | "POST" | "DELETE" | "PATCH" | "PUT" | null
  >(null);
  const [endpoint, setEndpoint] = useState<string>("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <RequestURLBar endpoint={endpoint} method={method} />
      <EndpointsSheet setEndpoint={setEndpoint} setMethod={setMethod} />
    </main>
  );
}
