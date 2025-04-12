"use client";
import React, { useState } from "react";
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <form>
        <Card className="rounded-lg mb-5">
          <CardHeader className="bg-blue-50 rounded-t-lg border-b border-gray-300 py-4">
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Box className="grid grid-cols-3 gap-4">
              <TextField
                label="Patient Name"
                size="small"
                name="patientName"
                value={formData.patientName}
                onChange={handleInputChange}
              />
              <TextField
                label="Patient ID"
                size="small"
                name="patientID"
                value={formData.patientID}
                onChange={handleInputChange}
              />
              <TextField label="NRIC" size="small" name="NRIC" value={formData.NRIC} onChange={handleInputChange} />

              <TextField
                select
                label="Gender"
                size="small"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </TextField>
              <TextField
                type="date"
                label="Date of Birth"
                InputLabelProps={{ shrink: true }}
                size="small"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
              />
              <TextField label="Age" size="small" name="age" value={formData.age} disabled />

              <TextField
                select
                label="Citizenship Status"
                size="small"
                name="citizenshipStatus"
                value={formData.citizenshipStatus}
                onChange={handleInputChange}
              >
                <MenuItem value="Singaporean">Singaporean</MenuItem>
                <MenuItem value="PR">PR</MenuItem>
                <MenuItem value="Foreigner">Foreigner</MenuItem>
              </TextField>
              <TextField
                select
                label="Ethnicity"
                size="small"
                name="ethnicity"
                value={formData.ethnicity}
                onChange={handleInputChange}
              >
                <MenuItem value="Chinese">Chinese</MenuItem>
                <MenuItem value="Malay">Malay</MenuItem>
                <MenuItem value="Indian">Indian</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </TextField>
              <TextField
                label="Ethnicity for Others"
                size="small"
                name="ethnicityOthers"
                value={formData.ethnicityOthers}
                onChange={handleInputChange}
              />

              <TextField
                label="Home Phone"
                size="small"
                name="homePhone"
                value={formData.homePhone}
                onChange={handleInputChange}
              />
              <TextField
                label="Patient Referral Source"
                size="small"
                name="patientReferralSource"
                value={formData.patientReferralSource}
                onChange={handleInputChange}
              />
              <TextField
                label="Patient Type"
                size="small"
                name="patientType"
                value={formData.patientType}
                onChange={handleInputChange}
              />

              <Box className="col-span-3 flex items-center space-x-4 mt-4">
                <Typography variant="subtitle2">Smoker:</Typography>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="smoker"
                    value="Yes"
                    checked={formData.smoker === "Yes"}
                    onChange={handleInputChange}
                  />
                  <Typography className="ml-2">Yes</Typography>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="smoker"
                    value="No"
                    checked={formData.smoker === "No"}
                    onChange={handleInputChange}
                  />
                  <Typography className="ml-2">No</Typography>
                </label>
              </Box>

              <TextField
                type="date"
                label="Smoking Assessment Date"
                InputLabelProps={{ shrink: true }}
                size="small"
                name="smokingAssessmentDate"
                value={formData.smokingAssessmentDate}
                onChange={handleInputChange}
                className="col-span-3 mt-2"
              />
            </Box>
          </CardContent>
        </Card>
        <Button variant="contained" type="submit" className="mt-4">
          Submit
        </Button>
      </form>
    </div>
  );
};
