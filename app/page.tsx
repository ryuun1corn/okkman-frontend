"use client";
import { ModeToggle } from "@/components/elements/ThemesProvider/ThemeButton";
import { DatePicker } from "@/components/elements/datePicker/DatePicker";
import { EndpointsSheet } from "@/components/elements/endpointsSheet/endpointsSheet";
import { RequestURLCard } from "@/components/elements/requestUrlCard/requestUrlBar";
import { requestDataSchema } from "@/components/elements/requestUrlCard/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Home() {
  const form = useForm<z.infer<typeof requestDataSchema>>({
    resolver: zodResolver(requestDataSchema),
  });

  return (
    <main className="flex min-h-screen flex-col gap-5 items-center justify-around p-5">
      <div className="my-10 flex flex-col items-center">
        <h1 className="scroll-m-20 text-7xl font-extrabold tracking-tight lg:text-9xl">
          OKK-Man
        </h1>
        <h3 className="mt-6 pl-6 italic">&quot;Requests penuh makna&quot;</h3>
      </div>
      <div className="w-full md:w-[80%] flex flex-col gap-4">
        <div className="flex flex-row items-stretch gap-3">
          <EndpointsSheet setForm={form.setValue} />
          <DatePicker />
          <ModeToggle />
        </div>
        <RequestURLCard form={form} />
      </div>
    </main>
  );
}
