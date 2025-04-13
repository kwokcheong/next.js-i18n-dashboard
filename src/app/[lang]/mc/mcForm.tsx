"use client";
import React, { useState, useEffect } from "react";
import { Button, TextField, Box, Typography, MenuItem } from "@mui/material";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export const McForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    mc: "",
    patientName: "John Doe", // example patient data
    nric: "S1234567D", // example NRIC
    fromDate: "",
    toDate: "",
    days: "",
    doctor: "",
    type: "",
    issueDate: "",
    description: "",
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

  useEffect(() => {
    if (formData.fromDate && formData.toDate) {
      const from = new Date(formData.fromDate);
      const to = new Date(formData.toDate);
      const diffTime = to.getTime() - from.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setFormData((prev) => ({ ...prev, days: diffDays >= 0 ? diffDays.toString() : "0" }));
    }
  }, [formData.fromDate, formData.toDate]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const errors: any = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value && key !== "description") {
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
    router.push(`/en/prescriptions`);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card className="rounded-lg mb-5">
          <CardHeader className="bg-blue-50 rounded-t-lg border-b border-gray-300 py-4 mb-5">
            <CardTitle>Medical Certificate (MC)</CardTitle>
          </CardHeader>
          <CardContent>
            <Box className="grid grid-cols-3 gap-4">
              <TextField
                select
                size="small"
                label="MC"
                name="mc"
                value={formData.mc}
                onChange={handleInputChange}
                error={!!formErrors.mc}
                helperText={formErrors.mc}
              >
                <MenuItem value="MC1">Unfit for duty</MenuItem>
                <MenuItem value="MC2">Outpatient sick leave</MenuItem>
                <MenuItem value="MC3">Hospitalization leave</MenuItem>
              </TextField>

              <TextField size="small" label="Patient Name" name="patientName" value={formData.patientName} disabled />
              <TextField size="small" label="NRIC" name="nric" value={formData.nric} disabled />

              <TextField
                size="small"
                label="From Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                name="fromDate"
                value={formData.fromDate}
                onChange={handleInputChange}
                error={!!formErrors.fromDate}
                helperText={formErrors.fromDate}
              />

              <TextField
                size="small"
                label="To Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                name="toDate"
                value={formData.toDate}
                onChange={handleInputChange}
                error={!!formErrors.toDate}
                helperText={formErrors.toDate}
              />

              <TextField size="small" label="Days" name="days" value={formData.days} disabled />

              <TextField
                select
                size="small"
                label="Doctor"
                name="doctor"
                value={formData.doctor}
                onChange={handleInputChange}
                error={!!formErrors.doctor}
                helperText={formErrors.doctor}
              >
                <MenuItem value="Dr. Tan">Dr. Tan</MenuItem>
                <MenuItem value="Dr. Lim">Dr. Lim</MenuItem>
              </TextField>

              <TextField
                select
                size="small"
                label="Type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                error={!!formErrors.type}
                helperText={formErrors.type}
              >
                <MenuItem value="Type A">Type A</MenuItem>
                <MenuItem value="Type B">Type B</MenuItem>
              </TextField>

              <TextField
                size="small"
                label="Issue Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                name="issueDate"
                value={formData.issueDate || new Date().toISOString().split("T")[0]}
                onChange={handleInputChange}
                error={!!formErrors.issueDate}
                helperText={formErrors.issueDate}
              />

              <Box className="col-span-3">
                <Typography variant="subtitle2" className="mb-1">
                  Description
                </Typography>
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Box className="flex justify-end">
          <Button variant="contained" type="submit">
            Next
          </Button>
        </Box>
      </form>
    </>
  );
};
