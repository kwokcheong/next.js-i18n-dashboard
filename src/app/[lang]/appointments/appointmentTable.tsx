"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  MenuItem,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

interface Appointment {
  pid: number;
  patientName: string;
  age: string;
  gender: string;
  doctor: string;
  type: string;
  apptTime: string;
  status: string;
  id?: string;
  nric?: string;
  dob?: string;
}

const statuses = ["Waiting", "In Progress", "Completed", "Cancelled"];

// Utility to create an appointment time that increments by 15 min from the last
function getNextApptTime(existingAppointments: Appointment[]): string {
  if (!existingAppointments.length) {
    const date = new Date();
    date.setMinutes(Math.ceil(date.getMinutes() / 15) * 15);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  const lastAppt = existingAppointments[existingAppointments.length - 1];
  const [hours, minutes] = lastAppt.apptTime.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes + 15);

  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export const AppointmentsTable = ({ patientData }: { patientData?: any }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Retrieve appointments from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("appointments");
    if (stored) {
      try {
        setAppointments(JSON.parse(stored));
      } catch (err) {
        console.error("Invalid JSON in localStorage for appointments:", err);
      }
    }
  }, []);

  // Save appointments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  // Add new appointment if `patientData` is provided
  useEffect(() => {
    if (patientData && patientData.name) {
      const newAppointmentTime = getNextApptTime(appointments);

      // Determine the next `pid`
      const nextPid = appointments.length > 0 ? appointments[appointments.length - 1].pid + 1 : 1;

      const newAppt: Appointment = {
        pid: nextPid,
        patientName: patientData.name,
        age: patientData.age || "",
        gender: patientData.gender || "",
        doctor: "Dr. Locum", // default
        type: "Consultation", // default
        apptTime: newAppointmentTime,
        status: "Waiting",
        id: patientData.id || "",
        nric: patientData.nric || "",
        dob: patientData.dob || "",
      };

      // Add new appointment to the end
      setAppointments((prev) => [...prev, newAppt]);
    }
  }, [patientData]); // only runs if `patientData` changes

  // Delete an appointment
  const deleteAppointment = (pid: number) => {
    setAppointments((prev) => prev.filter((appt) => appt.pid !== pid));
  };

  // Update the status of an appointment
  const handleStatusChange = (pid: number, status: string) => {
    setAppointments((prev) => prev.map((appt) => (appt.pid === pid ? { ...appt, status } : appt)));
  };

  return (
    <Box>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Patient Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>NRIC</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Doctor</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Appt Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {appointments.map((appt) => (
                <TableRow key={appt.pid}>
                  <TableCell>{appt.pid}</TableCell>
                  <TableCell>{appt.patientName}</TableCell>
                  <TableCell>{appt.age}</TableCell>
                  <TableCell>{appt.gender}</TableCell>
                  <TableCell>{appt.id || "N/A"}</TableCell>
                  <TableCell>{appt.nric || "N/A"}</TableCell>
                  <TableCell>{appt.dob || "N/A"}</TableCell>
                  <TableCell>{appt.doctor}</TableCell>
                  <TableCell>{appt.type}</TableCell>
                  <TableCell>{appt.apptTime}</TableCell>
                  <TableCell>
                    <TextField
                      select
                      variant="standard"
                      size="small"
                      value={appt.status}
                      onChange={(e) => handleStatusChange(appt.pid, e.target.value)}
                    >
                      {statuses.map((st) => (
                        <MenuItem key={st} value={st}>
                          {st}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => deleteAppointment(appt.pid)}>
                      <Delete color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {appointments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={12} align="center">
                    No Appointments
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
