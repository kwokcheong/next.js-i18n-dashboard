import React, { Suspense } from "react";
import Spinner from "@/components/Spinner";
import { getIntl } from "@/lib/intl";
import { getReports, getSingleMember } from "@/lib/data";
import { Locale } from "@/lib/definitions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileBanner from "@/components/ProfileBanner";
import { TextField } from "@mui/material";

import PatientInfoTabs from "@/components/PatientInfoTabs";
import { PatientForm } from "./patientForm";

interface Props {
  params: {
    lang: Locale;
  };
}

export default function Page({ params: { lang: locale } }: Props) {
  return (
    <Suspense fallback={<Spinner />}>
      <PageContent locale={locale} />
    </Suspense>
  );
}

interface PageContentProps {
  locale: Locale;
}

async function PageContent({ locale }: PageContentProps) {
  const intl = await getIntl(locale);
  const member = await getSingleMember();

  return (
    <>
      <ProfileBanner teamMember={member} />
      <Card className="p-5">
        <Card className="mb-5 p-3">PCN YEAR: 2025</Card>
        <PatientForm />
      </Card>
    </>
  );
}
