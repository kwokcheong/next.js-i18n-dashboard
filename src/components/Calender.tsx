"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

export default function CalendarClient() {
  const [date, setDate] = useState(new Date());

  return (
    <Calendar mode="single" selected={date} onSelect={(day) => day && setDate(day)} className="rounded-md border" />
  );
}
