"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CardBody from "@/components/CardBody";
import PatientOutcomeDashboard from "./PatientOutcomeDashboard";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AnalyticsTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Patient Outcomes" {...a11yProps(0)} />
          <Tab label="Clinic Outcomes" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <PatientOutcomeDashboard />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Card>
          <CardHeader>Analytics Overview</CardHeader>
          <CardBody>
            <p>This tab contains general information and context for your analytics dashboard.</p>
          </CardBody>
        </Card>
      </CustomTabPanel>
    </Box>
  );
}
