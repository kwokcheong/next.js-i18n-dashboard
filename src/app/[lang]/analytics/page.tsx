import React, { Suspense } from "react";

import Card from "@/components/Card";
import CardHeader from "@/components/CardHeader";
import CardBody from "@/components/CardBody";
import Spinner from "@/components/Spinner";

import { getIntl } from "@/lib/intl";
import { Locale } from "@/lib/definitions";
import { getActivities, getTeamMembers } from "@/lib/data";
import BarChart from "@/components/BarChart"


interface Props {
  params: {
    lang: Locale;
  };
}

interface PageContentProps {
  locale: Locale;
}

export default function Page({ params: { lang: locale } }: Props) {
  return (
    <Suspense fallback={<Spinner />}>
      <PageContent locale={locale} />
    </Suspense>
  );
}

async function PageContent({ locale }: PageContentProps) {
  const intl = await getIntl(locale);

  return (
    <div>
      <BarChart />
    </div>
  );
}
