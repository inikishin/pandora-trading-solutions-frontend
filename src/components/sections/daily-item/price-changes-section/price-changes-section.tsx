import React from "react";
import { cx } from "class-variance-authority";
import { Nullable } from "@/store/utils";
import { ScreenerCalcsDTO } from "@/models/screener.dto";

type PriceChangesProps = {
  data: Nullable<ScreenerCalcsDTO>;
}

export const PriceChangesSection: React.FC<PriceChangesProps> = ({ data }) => {
  return (
    <div>
      <p className="font-medium text-2xl text-gray-900 my-10">Изменение цены</p>
      {
        data && (
          <div className="flex space-x-2 justify-between">
            <PriceChange label={"1h_ch"} price={data.price_1h_ch} percent={data.prcnt_1h_ch} />
            <PriceChange label={"4h_ch"} price={data.price_4h_ch} percent={data.prcnt_4h_ch} />
            <PriceChange label={"12h_ch"} price={data.price_12h_ch} percent={data.prcnt_12h_ch} />
            <PriceChange label={"1d_ch"} price={data.price_1d_ch} percent={data.prcnt_1d_ch} />
            <PriceChange label={"1w_ch"} price={data.price_1w_ch} percent={data.prcnt_1w_ch} />
            <PriceChange label={"1m_ch"} price={data.price_1m_ch} percent={data.prcnt_1m_ch} />
            <PriceChange label={"3m_ch"} price={data.price_3m_ch} percent={data.prcnt_3m_ch} />
            <PriceChange label={"6m_ch"} price={data.price_6m_ch} percent={data.prcnt_6m_ch} />
            <PriceChange label={"1y_ch"} price={data.price_1y_ch} percent={data.prcnt_1y_ch} />
          </div>
        )
      }
    </div>
  )
};

type PriceChangeProps = {
  label: string;
  price: Nullable<number>;
  percent: Nullable<number>;
};

const PriceChange: React.FC<PriceChangeProps> = ({ label, price, percent }) => {
  return (
    <div>
      <p className="text-base font-normal text-gray-900 uppercase">
        {label}
      </p>
      <p className={cx(["text-2xl", "font-normal", (percent && (percent > 0)) ? "text-green-600" : "text-red-600", "uppercase"])}>
        {percent}%
      </p>
      <p className="text-base font-normal text-indigo-600 uppercase">
        {price} rub
      </p>
    </div>
  );
}
