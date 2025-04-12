"use client";
import React, { useState, useEffect } from "react";
import { Button, TextField, Box, Typography, MenuItem } from "@mui/material";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PatientForm = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    patientID: "",
    NRIC: "",
    gender: "",
    dob: "",
    age: "",
    citizenshipStatus: "",
    ethnicity: "",
    ethnicityOthers: "",
    homePhone: "",
    patientReferralSource: "",
    patientType: "",
    smoker: "No",
    smokingAssessmentDate: "",
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

  useEffect(() => {
    if (formData.dob) {
      const birthDate = new Date(formData.dob);
      const ageDifMs = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDifMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      setFormData((prev) => ({ ...prev, age: age.toString() }));
    }
  }, [formData.dob]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const errors: any = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value && key !== "ethnicityOthers" && key !== "homePhone") {
        errors[key] = "This field is required";
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Form data submitted:", formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="rounded-lg mb-5">
        <CardHeader className="bg-blue-50 rounded-t-lg border-b border-gray-300 py-4 mb-5">
          <CardTitle>Patient Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-3 gap-4">
            {[
              { name: "patientName", label: "Patient Name", required: true },
              { name: "patientID", label: "Patient ID", required: true },
              { name: "NRIC", label: "NRIC", required: true },
              { name: "gender", label: "Gender", options: ["Male", "Female"], required: true },
              { name: "dob", label: "Date of Birth", type: "date", required: true },
              { name: "age", label: "Age", disabled: true, required: true },
              {
                name: "citizenshipStatus",
                label: "Citizenship Status",
                options: ["Singaporean", "PR", "Foreigner"],
                required: true,
              },
              {
                name: "ethnicity",
                label: "Ethnicity",
                options: ["Chinese", "Malay", "Indian", "Others"],
                required: true,
              },
              { name: "ethnicityOthers", label: "Ethnicity for Others", required: false },
              { name: "homePhone", label: "Home Phone", required: false },
              { name: "patientReferralSource", label: "Patient Referral Source", required: true },
              { name: "patientType", label: "Patient Type", required: true },
            ].map((field) => (
              <Box key={field.name}>
                <Typography variant="subtitle2" className="mb-1">
                  {field.label} {field.disabled ? "" : field.required ? <span className="text-red-500">*</span> : ""}
                </Typography>
                <TextField
                  select={!!field.options}
                  size="small"
                  fullWidth
                  type={field.type || "text"}
                  disabled={field.disabled}
                  name={field.name}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleInputChange}
                  error={Boolean(formErrors[field.name as keyof typeof formErrors])}
                  helperText={formErrors[field.name as keyof typeof formErrors]}
                  InputProps={{
                    sx: {
                      "&.Mui-disabled": {
                        backgroundColor: "#f0f0f0", // gray background
                        color: "#555", // slightly darkened text color
                        WebkitTextFillColor: "#555",
                      },
                    },
                  }}
                >
                  {field.options &&
                    field.options.map((opt) => (
                      <MenuItem key={opt} value={opt}>
                        {opt}
                      </MenuItem>
                    ))}
                </TextField>
              </Box>
            ))}

            <Box className="col-span-3 flex items-center space-x-4 mt-4">
              <Typography variant="subtitle2">
                Smoker: <span className="text-red-500">*</span>
              </Typography>
              {"Yes,No".split(",").map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name="smoker"
                    value={option}
                    checked={formData.smoker === option}
                    onChange={handleInputChange}
                  />
                  <Typography className="ml-2">{option}</Typography>
                </label>
              ))}
            </Box>

            <TextField
              type="date"
              label="Smoking Assessment Date"
              InputLabelProps={{ shrink: true }}
              size="small"
              name="smokingAssessmentDate"
              value={formData.smokingAssessmentDate}
              onChange={handleInputChange}
              error={Boolean(formErrors.smokingAssessmentDate)}
              helperText={formErrors.smokingAssessmentDate}
              className="col-span-3 mt-2"
            />
          </Box>
        </CardContent>
      </Card>
      <Button variant="contained" type="submit" className="mt-4">
        Submit
      </Button>
    </form>
  );
};
