"use client";
import React, { useState } from "react";
import { TextField, Box, Typography } from "@mui/material";

const ClinicForm = () => {
  const [clinicName, setClinicName] = useState("");

  const handleInputChange = (event: any) => {
    setClinicName(event.target.value);
  };

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
            value={clinicName}
            onChange={handleInputChange}
            placeholder="Enter clinic name"
          />
        </div>
        <div>
          <Typography variant="subtitle2" gutterBottom>
            <strong>PCN GP Clinic Name</strong>
            <span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            value={clinicName}
            onChange={handleInputChange}
            placeholder="Enter clinic name"
          />
        </div>
        <div>
          <Typography variant="subtitle2" gutterBottom>
            <strong>PCN GP Clinic Name</strong>
            <span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            value={clinicName}
            onChange={handleInputChange}
            placeholder="Enter clinic name"
          />
        </div>
      </div>
    </Box>
  );
};

export default ClinicForm;
