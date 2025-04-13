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
import { useRouter } from "next/navigation";

interface Prescription {
  id: number;
  name: string;
  dose: string;
  freq: string;
  days: string;
  totalQty: string;
  totalPrice: string;
}

const medications = [
  "Paracetamol",
  "Ibuprofen",
  "Amoxicillin",
  "Cetirizine",
  "Aspirin",
  "Vitamin C",
  "Zinc",
  "Antihistamine",
];

const frequencies = ["Once Daily", "Twice Daily", "Thrice Daily", "Every 6 hours"];
const numberOptions = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

export const PrescriptionTable = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [errors, setErrors] = useState<{ [key: number]: boolean }>({});
  const router = useRouter();

  const addPrescription = () => {
    setPrescriptions((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
        dose: "",
        freq: "",
        days: "",
        totalQty: "",
        totalPrice: "",
      },
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

  const handleMockIllness = () => {
    const baseId = Date.now();
    const mockData: Prescription[] = [
      {
        id: baseId,
        name: "Paracetamol",
        dose: "1",
        freq: "Thrice Daily",
        days: "3",
        totalQty: "9",
        totalPrice: "5",
      },
      {
        id: baseId + 1,
        name: "Ibuprofen",
        dose: "2",
        freq: "Twice Daily",
        days: "2",
        totalQty: "4",
        totalPrice: "10",
      },
      {
        id: baseId + 2,
        name: "Aspirin",
        dose: "1",
        freq: "Once Daily",
        days: "5",
        totalQty: "5",
        totalPrice: "7",
      },
      {
        id: baseId + 3,
        name: "Vitamin C",
        dose: "1",
        freq: "Once Daily",
        days: "7",
        totalQty: "7",
        totalPrice: "8",
      },
      {
        id: baseId + 4,
        name: "Zinc",
        dose: "1",
        freq: "Once Daily",
        days: "7",
        totalQty: "7",
        totalPrice: "9",
      },
      {
        id: baseId + 5,
        name: "Antihistamine",
        dose: "1",
        freq: "Once Daily",
        days: "7",
        totalQty: "7",
        totalPrice: "6",
      },
    ];
    setPrescriptions(mockData);
    setErrors({});
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

    // Save prescriptions to localStorage
    localStorage.setItem("prescriptions", JSON.stringify(prescriptions));

    // Navigate to the Summary Page
    router.push("/summary");
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
        <Stack direction="row" spacing={2}>
          <Button startIcon={<Add />} variant="contained" onClick={addPrescription}>
            Add Medication
          </Button>
          <Button variant="outlined" onClick={handleMockIllness}>
            Mock Illness
          </Button>
        </Stack>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          NEXT
        </Button>
      </Box>
    </Box>
  );
};
