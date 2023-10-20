import React, {useEffect} from "react";
import { NextPage } from "next";

import { PageLayout } from "@/components/base/page-layout/page-layout";
import { useAppDispatch, useAppSelector} from "@/store/hooks";
import { screenerSelectors, screenerServices } from '@/store/screener';

const pageMeta = {
  title: "Скринер финансовых рынков - pandoratradingsolutions.com",
  description: "Скринер финансовых рынков - pandoratradingsolutions.com",
  ogUrl: "https://pandoratradingsolutions.com/screener",
};

const ScreenerPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, data, error } = useAppSelector(screenerSelectors.screenerData);

  useEffect(() => {
    dispatch(screenerServices.getScreenerData());
  }, [dispatch]);

  return (
    <PageLayout
      title={pageMeta.title}
      description={pageMeta.description}
      ogUrl={pageMeta.ogUrl}
    >
      <p>{isLoading && (<p>isLoading</p>)}</p>
      <p>{data && data.toString()}</p>
    </PageLayout>
  );
}

export default ScreenerPage;
