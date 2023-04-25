import React, {useEffect} from "react";
import { NextPage } from "next";

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { dailySelectors, dailyServices } from '@/store/daily';
import { DailyCards } from "@/components/sections/daily-list";
import { PageLayout } from "@/components/base/page-layout/page-layout";

const DailyPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, data, error } = useAppSelector(dailySelectors.tickers);

  useEffect(() => {
    dispatch(dailyServices.getTickers());
  }, [dispatch]);

  if (isLoading) {
    return (
      <PageLayout>
        <div>Loading...</div>
      </PageLayout>
    )
  }

  if (data) {
    return (
      <PageLayout>
        <DailyCards data={data.map((item) => ({onDatetime: (new Date()).toISOString(), ...item}))}/>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div>Что то пошло не так...</div>
      <div>{error}</div>
    </PageLayout>
  );
};

export default DailyPage;
