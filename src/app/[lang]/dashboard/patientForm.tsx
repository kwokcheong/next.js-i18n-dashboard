"use client";
import React, { useState } from "react";
import ClinicForm from "@/components/ClinicForm";
import { Button } from "@mui/material";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PatientForm = () => {
  const [formData, setFormData] = useState({
    clinicName: "",
    clinicCode: "",
    clinicCommenceDate: "",
  });

  const [formErrors, setFormErrors] = useState({
    clinicName: "",
    clinicCode: "",
    clinicCommenceDate: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error message for this field when changed
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Basic validation
    const errors = {
      clinicName: formData.clinicName.trim() ? "" : "Clinic name is required",
      clinicCode: formData.clinicCode.trim() ? "" : "Clinic code is required",
      clinicCommenceDate: formData.clinicCommenceDate.trim() ? "" : "Clinic commence date is required",
    };

    setFormErrors(errors);

    // If any error messages exist, do not proceed
    const hasError = Object.values(errors).some((error) => error !== "");
    if (!hasError) {
      // Proceed with form submission (e.g., call API)
      console.log("Submitted data", formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* {JSON.stringify(formData, null, 2)} */}
      <Card className="rounded-lg mb-5">
        <CardHeader className="bg-blue-50 rounded-t-lg mb-2 border-b border-gray-300 py-4 mb-5">
          <CardTitle>Clinic Information</CardTitle>
        </CardHeader>
        <CardContent>
          <ClinicForm formData={formData} formErrors={formErrors} onInputChange={handleInputChange} />
        </CardContent>
      </Card>
      <Card className="rounded-lg mb-5">
        <CardHeader className="bg-blue-50 rounded-t-lg mb-4 border-b border-gray-300 py-4">
          <CardTitle>Patient Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {/* Left Column */}
            <div>LEFT</div>
            {/* Right Column */}
            <div>RIGHT</div>
          </div>
        </CardContent>
      </Card>
      <Button type="submit" variant="contained" style={{ marginTop: "1rem" }}>
        Submit
      </Button>
    </form>
  );
};
