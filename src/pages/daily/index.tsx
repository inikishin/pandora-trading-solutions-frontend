import React from "react";
import { NextPage } from "next";

import { DailyCards } from "@/components/sections/daily";
import { PageLayout } from "@/components/base/page-layout/page-layout";

const DailyPage: NextPage = () => {
  const data = [
    {'id': '1', 'code': 'gazp', 'name': 'Gazpropm', 'description': 'Gazprom description', img: '', onDatetime: '2022-03-13'},
    {'id': '2', 'code': 'sber', 'name': 'Sberbank', 'description': 'Sberbank description', img: '', onDatetime: '2022-03-13'},
    {'id': '3', 'code': 'five', 'name': 'X5 retail', 'description': 'X5 retail description', img: '', onDatetime: '2022-03-13'},
    {'id': '4', 'code': 'yndx', 'name': 'Yandex', 'description': 'Yandex description', img: '', onDatetime: '2022-03-13'},
  ];

  return (
    <PageLayout>
      <DailyCards data={data} />
    </PageLayout>
  );
};

export default DailyPage;
