import React, {useEffect} from 'react';
import { NextPage } from "next";
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { dailySelectors, dailyServices } from '@/store/daily';
import { PageLayout } from "@/components/base/page-layout/page-layout";
import { ChartSection, SummarySection } from "@/components/sections/daily-item";


const pageMeta = {
  title: "Ежедневный анализ - pandoratradingsolutions.com",
  description: "Ежедневный анализ - pandoratradingsolutions.com",
};

const DailyTickerPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const dispatch = useAppDispatch();
  const ticker = useAppSelector(dailySelectors.ticker);

  useEffect(() => {
    if (id) {
      dispatch(dailyServices.getTicker(id));
      dispatch(dailyServices.getTimeframes());
    }
  }, [dispatch, id]);

  return !ticker.data || ticker.isLoading ? (
    <div>Full Loading...</div>
    ) : (
    <PageLayout title={`${ticker.data.code.toUpperCase()} - ${pageMeta.title}`} description={pageMeta.description}>
      <SummarySection />
      <ChartSection ticker={ticker.data.code} timeframe="d1" />
    </PageLayout>
  )
}

export default DailyTickerPage;
