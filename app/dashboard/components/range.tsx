"use client";

import DateRangeSelect from "@/components/date-range-select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function Range({defaultView}:any) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const range = searchParams.get("range") ?? defaultView ?? "last30days";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams();
    params.set("range", e.target.value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <DateRangeSelect value={range} onChange={handleChange}></DateRangeSelect>
  );
}
