import React from 'react';
import { NextPage } from "next";
import { useRouter } from 'next/router';

import { PageLayout } from "@/components/base/page-layout/page-layout";

const DailyTickerPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <PageLayout>
      <div>{id}</div>
    </PageLayout>
  )
}

export default DailyTickerPage;
