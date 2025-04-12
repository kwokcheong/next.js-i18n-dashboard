"use client";
import React, { useState, useEffect } from "react";
import { Button, TextField, Box, Typography, MenuItem } from "@mui/material";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    patientID: "",
    NRIC: "",
    gender: "",
    citizenshipStatus: "",
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const errors: any = {};
    Object.entries(formData).forEach(([key, value]) => {
      // if (!value && key !== "ethnicityOthers" && key !== "homePhone") {
      //   errors[key] = "This field is required";
      // }
      errors[key] = "This field is required";
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
          <CardTitle>Consultation</CardTitle>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-2 gap-4">
            {[
              { name: "patientName", label: "Patient Name", type: "text", required: true },
              { name: "patientID", label: "Patient ID", required: true },
              { name: "NRIC", label: "NRIC", required: true },
              { name: "gender", label: "Gender", options: ["Male", "Female"], required: true },
              {
                name: "citizenshipStatus",
                label: "Citizenship Status",
                options: ["Singaporean", "PR", "Foreigner"],
                required: true,
              },
            ].map((field) => (
              <Box key={field.name}>
                <Typography variant="subtitle2" className="mb-1">
                  {field.label} {field.required ? <span className="text-red-500">*</span> : ""}
                </Typography>
                <TextField
                  select={!!field.options}
                  size="small"
                  fullWidth
                  type={field.type || "text"}
                  name={field.name}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleInputChange}
                  error={Boolean(formErrors[field.name as keyof typeof formErrors])}
                  helperText={formErrors[field.name as keyof typeof formErrors]}
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
          </Box>
        </CardContent>
      </Card>
      <Button variant="contained" type="submit" className="mt-4">
        Next
      </Button>
    </form>
  );
};
