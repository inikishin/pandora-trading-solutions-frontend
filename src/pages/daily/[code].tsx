import React, {useEffect} from 'react';
import { NextPage } from "next";
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { dailySelectors, dailyServices } from '@/store/daily';
import { PageLayout } from "@/components/base/page-layout/page-layout";
import { ChartSection, SummarySection, PriceChangesSection } from "@/components/sections/daily-item";

const pageMeta = {
  title: "Ежедневный анализ - pandoratradingsolutions.com",
  description: "Ежедневный анализ - pandoratradingsolutions.com",
};

const DailyTickerPage: NextPage = () => {
  const router = useRouter();
  const code = router.query.code as string;

  const dispatch = useAppDispatch();
  const ticker = useAppSelector(dailySelectors.ticker);
  const screener = useAppSelector(dailySelectors.tickerScreener);

  useEffect(() => {
    if (code) {
      dispatch(dailyServices.getTicker(code));
      dispatch(dailyServices.getTimeframes());
    }
  }, [dispatch, code]);

  useEffect(() => {
    if (ticker.data) {
      dispatch(dailyServices.getTickerScreener(ticker.data.code));
    }
  }, [dispatch, ticker]);

  return !ticker.data || ticker.isLoading ? (
    <div>Full Loading...</div>
    ) : (
    <PageLayout title={`${ticker.data.code.toUpperCase()} - ${pageMeta.title}`} description={pageMeta.description}>
      <SummarySection />
      <PriceChangesSection data={screener.data ? screener.data.calcs : null}/>
      <ChartSection
        ticker={ticker.data.code}
        timeframe="d1"
      />
    </PageLayout>
  )
}

export default DailyTickerPage;
