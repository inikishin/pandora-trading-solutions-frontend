import React, {useEffect} from "react";
import { NextPage } from "next";

import { Column, Table } from "@/components/base/table/table";
import { PageLayout } from "@/components/base/page-layout/page-layout";
import { useAppDispatch, useAppSelector} from "@/store/hooks";
import { screenerSelectors, screenerServices } from '@/store/screener';
import {Nullable} from "@/store/utils";
import {ScreenerDTO} from "@/models/screener.dto";

const pageMeta = {
  title: "Скринер финансовых рынков - pandoratradingsolutions.com",
  description: "Скринер финансовых рынков - pandoratradingsolutions.com",
  ogUrl: "https://pandoratradingsolutions.com/screener",
};

const columns: Column[] = [
  {
    key: 'ticker',
    name: 'Тикер',
    type: "string",
  },
  {
    key: 'on',
    name: 'Дата',
    type: "string",
  },
  {
    key: 'price_1d_ch',
    name: 'D1, руб.',
    type: "currency",
  },
  {
    key: 'prcnt_1d_ch',
    name: 'D1, %',
    type: "percent",
  },
  {
    key: 'price_1w_ch',
    name: 'W1, руб.',
    type: "currency",
  },
  {
    key: 'prcnt_1w_ch',
    name: 'W1, %',
    type: "percent",
  },
  {
    key: 'price_1m_ch',
    name: 'M1, руб.',
    type: "currency",
  },
  {
    key: 'prcnt_1m_ch',
    name: 'M1, %',
    type: "percent",
  },
  {
    key: 'price_3m_ch',
    name: 'M3, руб.',
    type: "currency",
  },
  {
    key: 'prcnt_3m_ch',
    name: 'M3, %',
    type: "percent",
  },
  {
    key: 'price_6m_ch',
    name: 'M6, руб.',
    type: "currency",
  },
  {
    key: 'prcnt_6m_ch',
    name: 'M6, %',
    type: "percent",
  },
  {
    key: 'price_1y_ch',
    name: 'Y1, руб.',
    type: "currency",
  },
  {
    key: 'prcnt_1y_ch',
    name: 'Y1, %',
    type: "percent",
  },
];

const ScreenerPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, data, error } = useAppSelector(screenerSelectors.screenerData);

  useEffect(() => {
    dispatch(screenerServices.getScreenerData());
  }, [dispatch]);

  const prepareTableData: CallableFunction = (data: Nullable<ScreenerDTO>[]) => {
    let result: object[] = [];
    if (data) {
      result = data.map((item) => (
        {
          ticker: item!.ticker!.toUpperCase(),
          on: new Date(item!.on!).toLocaleDateString(),
          ...item!.calcs,
        }
      ))
    }
    return result;
  };

  return (
    <PageLayout
      title={pageMeta.title}
      description={pageMeta.description}
      ogUrl={pageMeta.ogUrl}
    >
      <p>{isLoading && (<p>isLoading</p>)}</p>
      <Table
        columns={columns}
        data={prepareTableData(data)}
      />
    </PageLayout>
  );
}

export default ScreenerPage;
