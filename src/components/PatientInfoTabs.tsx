"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

export default function PatientInfoTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Vitals" {...a11yProps(0)} />
          <Tab label="Notes" {...a11yProps(1)} />
          <Tab label="Diagnosis" {...a11yProps(2)} />
          <Tab label="Orders" {...a11yProps(3)} />
          <Tab label="Prescript" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <p className="text-2xl font-medium mb-2">Vitals</p>
        <Card className="rounded-lg">
          <CardContent className="p-0">
            <div className="flex flex-col">
              <CardHeader>Blood Pressure</CardHeader>
              <hr className="my-2 border-gray-300" />
              <p>Heart Rate</p>
              <hr className="my-2 border-gray-300" />
              <p>Weight</p>
            </div>
          </CardContent>
        </Card>
        <p className="text-2xl font-medium mb-2 mt-5">Upcoming Appointments</p>
        <Card className="rounded-lg">
          <CardContent className="p-0">
            <div className="flex flex-col">
              <CardContent>Blood Pressure</CardContent>
            </div>
          </CardContent>
        </Card>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Item four
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        Item five
      </CustomTabPanel>
    </Box>
  );
}
