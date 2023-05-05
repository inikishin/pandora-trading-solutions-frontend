import React from "react";

import {useAppSelector} from "@/store/hooks";
import { dailySelectors } from '@/store/daily';

import logo from '@/../public/img/logo/logo-on-transparent-background/jpeg/vertical_tagline_on_transparent.jpeg';
import Image from "next/image";

export const SummarySection: React.FC = () => {
  const ticker = useAppSelector(dailySelectors.ticker);

  if (!ticker.data || ticker.isLoading) {
    return (
      <div>Loading...</div>
    );
  }
  return (
    <div className="grid md:grid-cols-4 grid-cols-1 gap-4 py-3">
      <div className="hidden md:flex items-center">
        <div>
          <Image src={ticker.data.img ? ticker.data.img : logo} alt={ticker.data.code} className="rounded-xl" />
        </div>
      </div>
      <div className="flex items-center">
        <div>
          <h1 className="text-4xl">{ticker.data.name}</h1>
          <h2 className="text-2xl text-gray-400">{ticker.data.code.toUpperCase()}</h2>
        </div>
      </div>
      <div className="col-span-2">
        <p className="line-clamp-5 md:line-clamp-15 text-sm leading-6 text-gray-600">{ticker.data.description}</p>
      </div>
    </div>
  );
};
