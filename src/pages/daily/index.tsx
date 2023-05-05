import React, {useEffect} from "react";
import { NextPage } from "next";

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { dailySelectors, dailyServices } from '@/store/daily';
import { DailyCards } from "@/components/sections/daily-list";
import { PageLayout } from "@/components/base/page-layout/page-layout";

const pageMeta = {
  title: "Ежедневный анализ - pandoratradingsolutions.com",
  description: "Ежедневный анализ - pandoratradingsolutions.com",
  ogUrl: "https://pandoratradingsolutions.com/daily",
};

const DailyPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, data, error } = useAppSelector(dailySelectors.tickers);

  useEffect(() => {
    dispatch(dailyServices.getTickers());
  }, [dispatch]);

  if (isLoading) {
    return (
      <PageLayout title={pageMeta.title} description={pageMeta.description} ogUrl={pageMeta.ogUrl}>
        <div>Loading...</div>
      </PageLayout>
    )
  }

  if (data) {
    return (
      <PageLayout title={pageMeta.title} description={pageMeta.description} ogUrl={pageMeta.ogUrl}>
        <DailyCards data={data.map((item) => ({onDatetime: (new Date()).toISOString(), ...item}))}/>
      </PageLayout>
    )
  }

  return (
    <PageLayout title={pageMeta.title} description={pageMeta.description} ogUrl={pageMeta.ogUrl}>
      <div>Что то пошло не так...</div>
      <div>{error}</div>
    </PageLayout>
  );
};

export default DailyPage;
