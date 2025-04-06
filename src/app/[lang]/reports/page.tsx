import React, { Suspense } from "react";
import CalendarClient from "@/components/Calender";
import Spinner from "@/components/Spinner";
import Image from "next/image";

import { getIntl } from "@/lib/intl";
import { getReports } from "@/lib/data";
import { Locale } from "@/lib/definitions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  const reports = await getReports();

  const isReportListEmpty = reports.length === 0;

  return (
    <>
      <h1 className="text-5xl font-bold mb-5">EMR</h1>
      <Card className="rounded-lg mb-5">
        <div className="flex justify-center items-center">
          <Image src="/images/deploy-nextjs-on-vercel.png" alt="Deploy Next.js on Vercel" width={300} height={203} />
        </div>
        <CardHeader className="">
          <CardTitle>Patient Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Age</p>
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 gap-4">
        {/* Left Column */}
        <div>
          <div>
            <Card className="rounded-lg mb-5">
              <CardHeader className="bg-blue-100 rounded-t-lg">
                <CardTitle>Patient Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Age</p>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="rounded-lg mb-5">
              <CardHeader className="bg-green-100 rounded-t-lg">
                <CardTitle>Allergies</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Age</p>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="rounded-lg mb-5">
              <CardHeader className="bg-purple-100 rounded-t-lg">
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Age</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column */}
        <div>
          <Card className="rounded-lg">
            <CardContent>
              <p>Some other content here</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
