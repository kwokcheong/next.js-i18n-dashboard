"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface Prescription {
  id: number;
  name: string;
  dose: string;
  freq: string;
  days: string;
  totalQty: string;
  totalPrice: string;
}

interface InvoiceRow {
  desc: string;
  qty: number;
  unit: number;
  price: number;
}

interface Prescription {
  id: number;
  name: string;
  dose: string;
  freq: string;
  days: string;
  totalQty: string;
  totalPrice: string;
}
const TAX_RATE = 0.07;

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

export default function InvoiceSummary() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  // Convert each prescription into an invoice row.
  const medicationRows: InvoiceRow[] = prescriptions?.map((presc) => {
    // Parse the quantity and price values from string to number.
    const qty = parseFloat(presc.totalQty) || 0;
    const totalPrice = parseFloat(presc.totalPrice) || 0;
    // Calculate unit price if possible.
    const unit = qty > 0 ? totalPrice / qty : 0;
    // Build description from prescription details.
    const desc = `${presc.name} (Dose: ${presc.dose}, Frequency: ${presc.freq}, Days: ${presc.days})`;
    return { desc, qty, unit, price: totalPrice };
  });

  // Retrieve prescriptions from localStorage on mount
  useEffect(() => {
    const storedPrescriptions = localStorage.getItem("prescriptions");
    if (storedPrescriptions) {
      setPrescriptions(JSON.parse(storedPrescriptions));
    }
  }, []);

  // Add one default consultation row.
  const consultationRow: InvoiceRow = {
    desc: "Consultation",
    qty: 1,
    unit: 75,
    price: 75,
  };

  // Combine the medication rows with the consultation row.
  const invoiceRows: InvoiceRow[] = [...(medicationRows || []), consultationRow];

  // Calculate invoice totals.
  const invoiceSubtotal = invoiceRows.reduce((sum, row) => sum + row.price, 0);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceSubtotal + invoiceTaxes;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="invoice summary table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Unit Price ($)</TableCell>
            <TableCell align="right">Sum ($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoiceRows?.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.desc}</TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{ccyFormat(row.unit)}</TableCell>
              <TableCell align="right">{ccyFormat(row.price)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
