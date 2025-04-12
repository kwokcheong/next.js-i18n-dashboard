"use client";
import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Chip,
} from "@mui/material";
import { TeamMember } from "@/lib/definitions";
import { Activity } from "@/lib/definitions";

interface Appointment {
  id: number;
  name: string;
  appointmentTime: string;
  status: "Waiting" | "In Progress" | "Completed" | "Cancelled";
}

const initialAppointments: Appointment[] = [
  { id: 1, name: "John Doe", appointmentTime: "09:00 AM", status: "Waiting" },
  { id: 2, name: "Jane Smith", appointmentTime: "09:15 AM", status: "In Progress" },
  { id: 3, name: "Michael Brown", appointmentTime: "09:30 AM", status: "Completed" },
  { id: 4, name: "Emily Davis", appointmentTime: "09:45 AM", status: "Cancelled" },
];

export default function AppointmentsTable({
  teamMembers,
  activities,
}: {
  teamMembers: TeamMember[];
  activities: Activity[];
}) {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "Waiting":
        return "default";
      case "In Progress":
        return "info";
      case "Completed":
        return "success";
      case "Cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="appointments table">
          <TableHead>
            <TableRow>
              <TableCell>Patient Name</TableCell>
              <TableCell>Appointment Time</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((appt) => (
              <TableRow hover key={appt.id}>
                <TableCell>{appt.name}</TableCell>
                <TableCell>{appt.appointmentTime}</TableCell>
                <TableCell>
                  <Chip label={appt.status} color={statusColor(appt.status)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={appointments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
