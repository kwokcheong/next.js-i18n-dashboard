// components/ClinicForm.tsx
"use client";
import React from "react";
import { TextField, Box, Typography } from "@mui/material";

interface ClinicFormProps {
  formData: {
    clinicName: string;
    clinicCode: string;
    clinicCommenceDate: string;
  };
  formErrors: {
    clinicName: string;
    clinicCode: string;
    clinicCommenceDate: string;
  };
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ClinicForm = ({ formData, formErrors, onInputChange }: ClinicFormProps) => {
  return (
    <Box>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Typography variant="subtitle2" gutterBottom>
            <strong>PCN GP Clinic Name</strong>
            <span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            name="clinicName"
            value={formData.clinicName}
            onChange={onInputChange}
            placeholder="Enter clinic name"
            error={Boolean(formErrors.clinicName)}
            helperText={formErrors.clinicName}
          />
        </div>
        <div>
          <Typography variant="subtitle2" gutterBottom>
            <strong>PCN GP Clinic Code</strong>
            <span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            name="clinicCode"
            value={formData.clinicCode}
            onChange={onInputChange}
            placeholder="Enter clinic code"
            error={Boolean(formErrors.clinicCode)}
            helperText={formErrors.clinicCode}
          />
        </div>
        <div>
          <Typography variant="subtitle2" gutterBottom>
            <strong>Clinic Commence Date</strong>
            <span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            type="date"
            name="clinicCommenceDate"
            value={formData.clinicCommenceDate}
            onChange={onInputChange}
            error={Boolean(formErrors.clinicCommenceDate)}
            helperText={formErrors.clinicCommenceDate}
          />
        </div>
      </div>
    </Box>
  );
};

export default ClinicForm;
