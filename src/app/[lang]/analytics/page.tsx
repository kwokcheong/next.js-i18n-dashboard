"use client";
import React, { Suspense, useState } from "react";

import Card from "@/components/Card";
import CardHeader from "@/components/CardHeader";
import CardBody from "@/components/CardBody";
import Spinner from "@/components/Spinner";

import { getIntl } from "@/lib/intl";
import { Locale } from "@/lib/definitions";
import { getActivities, getTeamMembers } from "@/lib/data";
import BarChart from "@/components/PatientOutcomeCharts";
import Link from "next/link";
import AnalyticsTabs from "./AnalyticsTabs";

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
  return (
    <div>
      <AnalyticsTabs />
    </div>
  );
}
