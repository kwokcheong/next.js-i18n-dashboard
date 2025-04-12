import React, { Suspense } from "react";

import Card from "@/components/Card";
import CardHeader from "@/components/CardHeader";
import CardBody from "@/components/CardBody";
import Spinner from "@/components/Spinner";

import { getIntl } from "@/lib/intl";
import { Locale } from "@/lib/definitions";
import { getActivities, getTeamMembers } from "@/lib/data";
import AppointmentsTable from "./appointmentTable";
import { TeamMember } from "@/lib/definitions";
import { Activity } from "@/lib/definitions";

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
  const teamMembers = await getTeamMembers();
  const activities = await getActivities();

  return (
    <div>
      <AppointmentsTable teamMembers={teamMembers} activities={activities} />
    </div>
  );
}
