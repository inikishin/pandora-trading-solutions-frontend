import React from "react";

import { DailyCard, DailyCardType } from "@/components/sections/daily-list/daily-card/daily-card";

type DailyCardsType = {
  data: Array<DailyCardType>
};

export const DailyCards: React.FC<DailyCardsType> = ({ data }) => {
  return (
    <div className="mt-10 grid max-w-2xl gap-x-8 gap-y-16 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data.map((item) => (
        <DailyCard key={item.id} id={item.id} code={item.code} name={item.name} description={item.description} img={item.img} onDatetime={item.onDatetime} />
      ))}
    </div>
  )
};
