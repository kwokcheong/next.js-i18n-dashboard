"use client";
import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Autocomplete,
  Button,
  MenuItem,
  Stack,
} from "@mui/material";
import { Delete, Add } from "@mui/icons-material";

interface Prescription {
  id: number;
  name: string;
  dose: string;
  freq: string;
  days: string;
  totalQty: string;
  totalPrice: string;
}

const medications = ["Paracetamol", "Ibuprofen", "Amoxicillin", "Cetirizine"];
const frequencies = ["Once Daily", "Twice Daily", "Thrice Daily", "Every 6 hours"];
const numberOptions = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

export const PrescriptionTable = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [errors, setErrors] = useState<{ [key: number]: boolean }>({});

  const addPrescription = () => {
    setPrescriptions((prev) => [
      ...prev,
      { id: Date.now(), name: "", dose: "", freq: "", days: "", totalQty: "", totalPrice: "" },
    ]);
  };

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const updatePrescription = (id: number, field: keyof Prescription, value: any) => {
    setPrescriptions((prev) => prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
    setErrors((prev) => ({ ...prev, [id]: false }));
  };

  const deletePrescription = (id: number) => {
    setPrescriptions((prev) => prev.filter((row) => row.id !== id));
  };

  const handleSubmit = () => {
    const newErrors: { [key: number]: boolean } = {};

    prescriptions.forEach((row) => {
      if (!row.name || !row.dose || !row.freq || !row.days || !row.totalQty || !row.totalPrice) {
        newErrors[row.id] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert("Please fill in all required fields.");
      return;
    }

    console.log("Submitted Prescriptions:", prescriptions);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-label="prescription table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "250px" }}>Medication</TableCell>
                <TableCell>Dose</TableCell>
                <TableCell>Frequency</TableCell>
                <TableCell>Days</TableCell>
                <TableCell>Total Qty</TableCell>
                <TableCell>Total ($)</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prescriptions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow hover key={row.id}>
                  <TableCell>
                    <Autocomplete
                      size="small"
                      options={medications}
                      value={row.name}
                      onChange={(_, newValue) => updatePrescription(row.id, "name", newValue || "")}
                      renderInput={(params) => <TextField {...params} variant="standard" error={errors[row.id]} />}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      select
                      variant="standard"
                      size="small"
                      value={row.dose}
                      error={errors[row.id]}
                      onChange={(e) => updatePrescription(row.id, "dose", e.target.value)}
                    >
                      {numberOptions.map((num) => (
                        <MenuItem key={num} value={num}>
                          {num}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>
                  <TableCell>
                    <TextField
                      select
                      variant="standard"
                      size="small"
                      value={row.freq}
                      error={errors[row.id]}
                      onChange={(e) => updatePrescription(row.id, "freq", e.target.value)}
                    >
                      {frequencies.map((freq) => (
                        <MenuItem key={freq} value={freq}>
                          {freq}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>
                  <TableCell>
                    <TextField
                      select
                      variant="standard"
                      size="small"
                      value={row.days}
                      error={errors[row.id]}
                      onChange={(e) => updatePrescription(row.id, "days", e.target.value)}
                    >
                      {numberOptions.map((num) => (
                        <MenuItem key={num} value={num}>
                          {num}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>
                  <TableCell>
                    <TextField
                      select
                      variant="standard"
                      size="small"
                      value={row.totalQty}
                      error={errors[row.id]}
                      onChange={(e) => updatePrescription(row.id, "totalQty", e.target.value)}
                    >
                      {numberOptions.map((num) => (
                        <MenuItem key={num} value={num}>
                          {num}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="standard"
                      type="number"
                      size="small"
                      inputProps={{ min: 0, step: "any" }}
                      error={errors[row.id]}
                      value={row.totalPrice}
                      onChange={(e) =>
                        updatePrescription(row.id, "totalPrice", e.target.value.replace(/^0+(?=\d)/, ""))
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => deletePrescription(row.id)}>
                      <Delete color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={prescriptions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Box className="flex justify-between">
        <Button startIcon={<Add />} variant="contained" onClick={addPrescription}>
          Add Medication
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit & Next
        </Button>
      </Box>
    </Box>
  );
};
