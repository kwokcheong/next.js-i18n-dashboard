import React, { Suspense } from "react";
import Spinner from "@/components/Spinner";
import { getIntl } from "@/lib/intl";
import { getReports, getSingleMember } from "@/lib/data";
import { Locale } from "@/lib/definitions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileBanner from "@/components/ProfileBanner";
import { TextField } from "@mui/material";

import PatientInfoTabs from "@/components/PatientInfoTabs";
import ClinicForm from "@/components/ClinicForm";

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
        <Card className="rounded-lg mb-5">
          <CardHeader className="bg-blue-50 rounded-t-lg mb-2 border-b border-gray-300 py-4 mb-5">
            <CardTitle>Clinic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <ClinicForm />
          </CardContent>
        </Card>

        <Card className="rounded-lg mb-5">
          <CardHeader className="bg-blue-50 rounded-t-lg mb-4 border-b border-gray-300 py-4">
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {/* Left Column */}
              <div>LEFT</div>

              {/* Right Column */}
              <div>RIGHT</div>
            </div>
          </CardContent>
        </Card>
      </Card>
    </>
  );
}
