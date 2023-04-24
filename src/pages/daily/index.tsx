import React from "react";

import { Header } from "@/components/base/header/header";
import { DailyCards } from "@/components/sections/daily";

export default function DailyPage() {
  const data = [
    {'id': '1', 'code': 'gazp', 'name': 'Gazpropm', 'description': 'Gazprom description', img: '', onDatetime: '2022-03-13'},
    {'id': '2', 'code': 'sber', 'name': 'Sberbank', 'description': 'Sberbank description', img: '', onDatetime: '2022-03-13'},
    {'id': '3', 'code': 'five', 'name': 'X5 retail', 'description': 'X5 retail description', img: '', onDatetime: '2022-03-13'},
    {'id': '4', 'code': 'yndx', 'name': 'Yandex', 'description': 'Yandex description', img: '', onDatetime: '2022-03-13'},
  ];

  return (
    <div>
      <Header isTransparent={false} />
      <main className="container mx-auto mt-20">
        <DailyCards data={data} />
      </main>
    </div>
  );
};
