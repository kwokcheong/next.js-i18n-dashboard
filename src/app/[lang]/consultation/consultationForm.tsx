"use client";
import React, { useState, useCallback } from "react";
import { Button, TextField, Box, Typography, Autocomplete } from "@mui/material";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDropzone } from "react-dropzone";

export const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    visitDate: "",
    chiefComplaint: "",
    physicalExamination: "",
    bodyImage: null as File | null,
    symptoms: "",
    disorder: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFormData((prev) => ({ ...prev, bodyImage: acceptedFiles[0] }));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { "image/*": [] } });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form data submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="rounded-lg mb-5">
        <CardHeader className="bg-blue-50 rounded-t-lg border-b border-gray-300 py-4">
          <CardTitle>Consultation</CardTitle>
        </CardHeader>
        <CardContent>
          <Box className="mb-5 mt-5">
            <Typography variant="subtitle2" className="mr-2">
              <b>Visit Date:</b> {new Date().toLocaleDateString("en-GB")}
            </Typography>
          </Box>

          <Box className="grid grid-cols-2 gap-4 mb-4">
            <Card className="rounded-lg p-4">
              <Typography variant="subtitle1" className="mb-2">
                Chief Complaint
              </Typography>
              <TextField
                multiline
                rows={8}
                fullWidth
                name="chiefComplaint"
                value={formData.chiefComplaint}
                onChange={handleInputChange}
              />
            </Card>

            <Card className="rounded-lg p-4 flex flex-col justify-between">
              <Box className="mb-4">
                <Typography variant="subtitle1" className="mb-2">
                  Physical Examination
                </Typography>
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  name="physicalExamination"
                  value={formData.physicalExamination}
                  onChange={handleInputChange}
                />
              </Box>

              <Card
                className="rounded-lg p-4 bg-gray-100 border-dashed border-2 border-gray-300 flex flex-col items-center justify-center cursor-pointer flex-grow"
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Typography variant="body2" className="text-gray-500">
                  Drag & drop or <span className="text-blue-600 font-medium">click to upload</span>
                </Typography>
              </Card>
            </Card>
          </Box>

          <Box className="grid grid-cols-2 gap-4">
            <Card className="rounded-lg p-4">
              <Typography variant="subtitle2" className="mb-2">
                Symptoms (SNOMED)
              </Typography>
              <Autocomplete
                size="small"
                options={["Symptom 1", "Symptom 2"]}
                renderInput={(params) => <TextField {...params} fullWidth />}
                value={formData.symptoms}
                onChange={(_, newValue) => setFormData((prev) => ({ ...prev, symptoms: newValue || "" }))}
              />
            </Card>

            <Card className="rounded-lg p-4">
              <Typography variant="subtitle2" className="mb-2">
                Disorder (SNOMED)
              </Typography>
              <Autocomplete
                size="small"
                options={["Disorder 1", "Disorder 2"]}
                renderInput={(params) => <TextField {...params} fullWidth />}
                value={formData.disorder}
                onChange={(_, newValue) => setFormData((prev) => ({ ...prev, disorder: newValue || "" }))}
              />
            </Card>
          </Box>
        </CardContent>
      </Card>
      <Button variant="contained" type="submit" className="mt-4">
        Next
      </Button>
    </form>
  );
};
