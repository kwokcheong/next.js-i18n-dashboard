"use client";

import { AppointmentsTable } from "./appointmentTable";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const age = searchParams.get("age");
  const id = searchParams.get("id");
  const nric = searchParams.get("nric");
  const gender = searchParams.get("gender");
  const dob = searchParams.get("dob");

  const [patientData, setPatientData] = useState<{
    name?: string;
    age?: string;
    id?: string;
    nric?: string;
    gender?: string;
    dob?: string;
  } | null>(null);

  // Store patientData in localStorage and retrieve it on page load
  useEffect(() => {
    const storedData = localStorage.getItem("patientData");
    if (storedData) {
      setPatientData(JSON.parse(storedData));
    }

    if (name || age || id || nric || gender || dob) {
      const newPatientData = {
        name: name || undefined,
        age: age || undefined,
        id: id || undefined,
        nric: nric || undefined,
        gender: gender || undefined,
        dob: dob || undefined,
      };
      setPatientData(newPatientData);
      localStorage.setItem("patientData", JSON.stringify(newPatientData));
    }
  }, [name, age, id, nric, gender, dob]);

  return (
    <div>
      <h3>Appointments Page</h3>
      <AppointmentsTable patientData={patientData} />
    </div>
  );
}
