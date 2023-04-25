import React from "react";

import {useAppSelector} from "@/store/hooks";
import { dailySelectors } from '@/store/daily';

import logo from '../../../../../public/logo.jpeg';
import Image from "next/image";

export const SummarySection: React.FC = () => {
  const ticker = useAppSelector(dailySelectors.ticker);

  return !ticker.data || ticker.isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 py-3">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <div>
          <Image src={ticker.data.img ? ticker.data.img : logo} alt={ticker.data.code} className="rounded-xl" />
        </div>
        <div>
          <h1 className="text-4xl">{ticker.data.code}</h1>
        </div>
      </div>
      <div>
        <h2 className="text-3xl">{ticker.data.name}</h2>
        <p>{ticker.data.description}</p>
      </div>
    </div>
  );
};
