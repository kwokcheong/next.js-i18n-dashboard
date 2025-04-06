import React, { Suspense } from "react";
import CalendarClient from "@/components/Calender";
import Spinner from "@/components/Spinner";
import Image from "next/image";
import { getIntl } from "@/lib/intl";
import { getReports, getSingleMember } from "@/lib/data";
import { Locale } from "@/lib/definitions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Basictabs from "@/components/tabs";

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
      <h1 className="text-5xl font-bold mb-5">EMR</h1>
      <Card className="rounded-lg mb-5">
        <div className="flex items-center gap-2 mb-5 mt-5">
          <div className="flex justify-center items-center">
            <Image
              src={member.profileImage}
              alt="Profile image"
              width={90}
              height={90}
              className="rounded-full p-1 ml-5 mr-5"
            />
          </div>
          <div>
            <h1 className="text-4xl font-semibold">John Smith</h1>
            <p>Age 45</p>
          </div>
        </div>
      </Card>
      <div className="grid grid-cols-2 gap-4">
        {/* Left Column */}
        <div>
          <div>
            <Card className="rounded-lg mb-5">
              <CardHeader className="bg-blue-100 rounded-t-lg mb-4">
                <CardTitle>Patient Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Age</p>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="rounded-lg mb-5">
              <CardHeader className="bg-green-100 rounded-t-lg mb-4">
                <CardTitle>Allergies</CardTitle>
              </CardHeader>
              <CardContent>
                <p>No known allergies</p>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="rounded-lg mb-5">
              <CardHeader className="bg-purple-100 rounded-t-lg mb-4">
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <div className="flex gap-10">
                    <p>June 25, 2023</p>
                    <p>10:00 AM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column */}
        <div>
          <Card className="rounded-lg">
            <CardContent>
              <Basictabs />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
