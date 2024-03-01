"use client";
import { EndpointsSheet } from "@/components/elements/endpointsSheet/endpointsSheet";
import { RequestURLCard } from "@/components/elements/requestUrlCard/requestUrlBar";
import { useState } from "react";

export default function Home() {
  const [method, setMethod] = useState<
    "GET" | "POST" | "DELETE" | "PATCH" | "PUT" | null
  >(null);
  const [action, setAction] = useState<string>("");
  const [endpoint, setEndpoint] = useState<string>("");

  return (
    <main className="flex min-h-screen flex-col gap-5 items-center justify-around p-24">
      <EndpointsSheet
        setEndpoint={setEndpoint}
        setMethod={setMethod}
        setAction={setAction}
      />
      {method === null ? (
        <p>Please select an endpoint.</p>
      ) : (
        <RequestURLCard endpoint={endpoint} method={method} action={action} />
      )}
    </main>
  );
}
