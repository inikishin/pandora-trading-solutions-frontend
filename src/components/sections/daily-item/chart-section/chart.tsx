// @ts-nocheck

import React, {useEffect, useState} from "react";

import { Chart } from "@/components/base/chart/chart";
import { useChartSection } from "@/components/sections/daily-item/chart-section/hooks";
import { Nullable } from "@/store/utils";
import { useAppSelector } from "@/store/hooks";
import { dailySelectors } from '@/store/daily';
import { ScreenerTechDTO } from "@/models/screener.dto";

const D1 = 'd1';
const H1 = 'h1';

type ChartSectionType = {
  ticker: Nullable<string>;
  timeframe: Nullable<string>;
}

export type ChartOptions = {
  tf: 'd1' | 'h1';
  murray: boolean;
  supportAndResistance: boolean;
};

const initialOptions: ChartOptions = {
  tf: D1,
  murray: true,
  supportAndResistance: true,
};

export const ChartSection: React.FC<ChartSectionType> = ({ ticker, timeframe }) => {
  const [options, setOptions] = useState<ChartOptions>(initialOptions);
  const {quotes, convertedQuotes, levels} = useChartSection({ticker, timeframe, options});

  return !quotes.data || quotes.isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <p className="font-medium text-2xl text-gray-900 my-10">График</p>
      <div className="h-96 mx-3 flex">
        <Chart
          data={convertedQuotes}
          levels={levels}
        />
        <Options options={options} setOptions={setOptions} />
      </div>
      <div>
        <Description options={options} />
      </div>
    </div>
  );
};

type OptionsProps = {
  options: ChartOptions;
  setOptions: (value: ChartOptions) => void;
};

export const Options:React.FC<OptionsProps> = ({ options , setOptions}) => {
  const handleBoolOptionsChange = (e: any) => {
    setOptions({...options, [e.currentTarget.name]: e.currentTarget.checked })
  };

  const handleTfChange = (e: any) => {
    setOptions({...options, tf: e.currentTarget.name });
  };

  return (
    <div className="w-1/5">
      Опции
      <div className="ml-2">
        <div><h6>Таймфрейм</h6></div>
        <div className="grid grid-cols-2 gap-4 mx-2">
          <button name={D1} onClick={handleTfChange} className={`text-base font-normal p-1 ${options.tf === D1 ? 'text-white bg-indigo-600' : 'text-gray-900 ring-1 ring-gray-300'} rounded justify-center items-center flex cursor-pointer uppercase`}><span>{D1}</span></button>
          <button name={H1} onClick={handleTfChange} className={`text-base font-normal p-1 ${options.tf === H1 ? 'text-white bg-indigo-600' : 'text-gray-900 ring-1 ring-gray-300'} rounded justify-center items-center flex cursor-pointer uppercase`}><span>{H1}</span></button>
        </div>
      </div>
      <div className="ml-2">
        <input id="murray-checkbox" type="checkbox" name="murray" checked={options.murray} onClick={handleBoolOptionsChange} />
        <label htmlFor="murray-checkbox">Murray</label>
      </div>
      <div className="ml-2">
        <input id="supportAndResistance-checkbox" type="checkbox" name="supportAndResistance" checked={options.supportAndResistance} onClick={handleBoolOptionsChange} />
        <label htmlFor="supportAndResistance-checkbox">Support And Resistance</label>
      </div>
    </div>
  );
};

type DescriptionProps = {
  options: ChartOptions;
};

export const Description: React.FC<DescriptionProps> = ({ options }) => {
  const screener = useAppSelector(dailySelectors.tickerScreener);

  if (!screener.data?.tech_d1) {
    return (
      <></>
    )
  }

  return (
    <div>
      <p className="font-medium text-2xl text-gray-900 my-10">Сигналы технического анализа</p>
      <TrendDescription
        label="Тренд D1"
        regressionLineAngle={screener.data.tech_d1.regression_line_angle}
        signalMa={screener.data.tech_d1.signal_ma}
        fastMa={screener.data.tech_d1.fast_ma}
        slowMa={screener.data.tech_d1.slow_ma}
        trendMa={screener.data.tech_d1.trend_ma}
        closeFastMaCrossBuy={screener.data.tech_d1.close_fast_ma_cross_buy}
        closeFastMaCrossSell={screener.data.tech_d1.close_fast_ma_cross_sell}
        closeSlowMaCrossBuy={screener.data.tech_d1.close_slow_ma_cross_buy}
        closeSlowMaCrossSell={screener.data.tech_d1.close_slow_ma_cross_sell}
      />
      <OscillatorDescription
        label="AO"
        value={screener.data.tech_d1.ao}
        divBuy={screener.data.tech_d1.ao_div_buy}
        divSell={screener.data.tech_d1.ao_div_sell}
        overBuy={0}
        overSell={0}
      />
      <OscillatorDescription
        label="CCI"
        value={screener.data.tech_d1.cci}
        divBuy={screener.data.tech_d1.cci_div_buy}
        divSell={screener.data.tech_d1.cci_div_sell}
        overBuy={screener.data.tech_d1.cci_over_buy}
        overSell={screener.data.tech_d1.cci_over_sell}
      />
      <OscillatorDescription
        label="Williams"
        value={screener.data.tech_d1.will}
        divBuy={screener.data.tech_d1.will_div_buy}
        divSell={screener.data.tech_d1.will_div_sell}
        overBuy={screener.data.tech_d1.will_over_buy}
        overSell={screener.data.tech_d1.will_over_sell}
      />
      <BollingerDescription
        label="Bollindger Bands"
        upperValue={screener.data.tech_d1.bb_up}
        lowerValue={screener.data.tech_d1.bb_low}
        upperTouch={screener.data.tech_d1.bb_up_touch}
        lowerTouch={screener.data.tech_d1.bb_down_touch}
        width={screener.data.tech_d1.bb_width}
        widthPercent={screener.data.tech_d1.bb_width_percent}
      />
      <CandlesDescription tech={screener.data.tech_d1} />
    </div>
  );
};

type OscillatorDescriptionProps = {
  label: string;
  value: number;
  divBuy: number;
  divSell: number;
  overBuy: number;
  overSell: number;
};

const OscillatorDescription: React.FC<OscillatorDescriptionProps> = ({
                                                                       label,
                                                                       value,
                                                                       divBuy,
                                                                       divSell,
                                                                       overBuy,
                                                                       overSell
                                                                     }) => {
  return (
    <div className="flex justify-between items-center space-x-2.5 m-3 p-2 border-b">
      <div className="w-full text-center">
        <div><h6 className="text-xl text-gray-900">{label}</h6></div>
        <div><p className="text-lg text-gray-600">{value.toFixed(2)}</p></div>
      </div>
      <div className="w-full text-center">
        <div><h6 className="text-xl text-gray-900">Экстремальные зоны</h6></div>
        {overBuy > 0 && <div><p className="text-xl text-green-600">Зона перепроданности</p></div>}
        {overSell > 0 && <div><p className="text-xl text-red-600">Зона перекупленности</p></div>}
        {(overBuy === 0 && overSell === 0) && <div><p className="text-2xl text-gray-400">-</p></div>}
      </div>
      <div className="w-full text-center">
        <div><h6 className="text-xl text-gray-900">Дивергенция</h6></div>
        {divBuy > 0 && <div><p className="text-xl text-green-600">Сигнал на покупку</p></div>}
        {divSell > 0 && <div><p className="text-xl text-red-600">Сигнал на продажу</p></div>}
        {(divBuy === 0 && divSell === 0) && <div><p className="text-2xl text-gray-400">-</p></div>}
      </div>
    </div>
  )
};

type BollingerDescriptionProps = {
  label: string;
  upperValue: number;
  lowerValue: number;
  upperTouch: number;
  lowerTouch: number;
  width: number;
  widthPercent: number;
};

const BollingerDescription: React.FC<BollingerDescriptionProps> = ({
                                                                     label,
                                                                     upperValue,
                                                                     lowerValue,
                                                                     upperTouch,
                                                                     lowerTouch,
                                                                     width,
                                                                     widthPercent
                                                                   }) => {
  return (
    <div className="flex justify-between items-center space-x-2.5 m-3 p-2 border-b">
      <div className="w-full text-center">
        <div><h6 className="text-xl text-gray-900">{label}</h6></div>
        <div><p className="text-lg text-gray-600">{upperValue.toFixed(2)}</p></div>
        <div><p className="text-lg text-gray-600">{lowerValue.toFixed(2)}</p></div>
      </div>
      <div className="w-full text-center">
        <div><h6 className="text-lg text-gray-900">Ширина канала</h6></div>
        <div><p className="text-lg text-gray-600">{width.toFixed(2)}</p></div>
        <div><p className="text-lg text-gray-600">{widthPercent.toFixed(2)}%</p></div>
      </div>
      <div className="w-full text-center">
        <div><h6 className="text-xl text-gray-900">Касание границ</h6></div>
        {lowerTouch > 0 && <div><p className="text-xl text-green-600">Нижняя граница</p></div>}
        {upperTouch > 0 && <div><p className="text-xl text-red-600">Верхняя граница</p></div>}
        {(lowerTouch === 0 && upperTouch === 0) && <div><p className="text-2xl text-gray-400">-</p></div>}
      </div>
    </div>
  )
};

type CandlesDescriptionProps = {
  tech: ScreenerTechDTO;
};

const CandlesDescription: React.FC<CandlesDescriptionProps> = ({ tech }) => {
  interface Map {
    [key: string]: string | undefined
  }

  const buyPatterns: Map = {
    divbar_buy: 'Дивергентный бар',
    hummer: 'Молот',
    engulfing_buy: 'Бычье поглощение',
  };

  const sellPatterns: Map = {
    divbar_sell: 'Дивергентный бар',
    shooting_star: 'Падающая звезда',
    engulfing_sell: 'Медвежье поглощение',
  };

  return (
    <div className="flex justify-between items-center space-x-2.5 m-3 p-2 border-b">
      <div className="w-full text-center">
        <div><h6 className="text-xl text-gray-900">Свечные паттерны</h6></div>
      </div>
      <div className="w-full text-center">
        <div><h6 className="text-lg text-gray-900">Покупка</h6></div>
        {Object.keys(buyPatterns).filter(item => tech[item] > 0).map(item => (
          <div key={item}>
            <p className="text-xl text-green-600">
              {buyPatterns[item]}
            </p>
          </div>
        ))}
      </div>
      <div className="w-full text-center">
        <div><h6 className="text-xl text-gray-900">Продажа</h6></div>
        {Object.keys(sellPatterns).filter(item => tech[item] > 0).map(item => (
          <div key={item}>
            <p className="text-xl text-red-600">
              {sellPatterns[item]}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
};

type TrendDescriptionProps = {
  label: string;
  regressionLineAngle: number;
  signalMa: number;
  fastMa: number;
  slowMa: number;
  trendMa: number;
  closeFastMaCrossBuy: number;
  closeFastMaCrossSell: number;
  closeSlowMaCrossBuy: number;
  closeSlowMaCrossSell: number;
};

const TrendDescription: React.FC<TrendDescriptionProps> = ({
                                                             label,
                                                             regressionLineAngle,
                                                             signalMa,
                                                             fastMa,
                                                             slowMa,
                                                             trendMa,
                                                             closeFastMaCrossBuy,
                                                             closeSlowMaCrossBuy,
                                                             closeSlowMaCrossSell,
                                                             closeFastMaCrossSell,
                                                           }) => {
  const buyPatterns = {
    closeFastMaCrossBuy: 'Пересечение ценой быстрой MA вверх',
    closeSlowMaCrossBuy: 'Пересечение ценой медленной MA вверх',
  };

  const sellPatterns = {
    closeFastMaCrossSell: 'Пересечение ценой быстрой MA вниз',
    closeSlowMaCrossSell: 'Пересечение ценой медленной MA вниз',
  };
  const [trendDirection, setTrendDirection] = useState('flat');

  useEffect(() => {
    if (signalMa > fastMa && fastMa > slowMa && slowMa > trendMa) {
      setTrendDirection('up');
    } else if (signalMa < fastMa && fastMa < slowMa && slowMa < trendMa) {
      setTrendDirection('down');
    } else {
      setTrendDirection('flat');
    }
  }, [signalMa,
    fastMa,
    slowMa,
    trendMa,]);

  return (
    <div className="flex justify-between items-center space-x-2.5 m-3 p-2 border-b">
      <div className="w-full text-center">
        <div><h6 className="text-xl text-gray-900">{label}</h6></div>
        <div>
          <p className="text-lg text-gray-600" title="Угол наклона линии регрессии">
            Угол наклона {regressionLineAngle.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="w-full text-center">
        <div><h6 className="text-lg text-gray-600">Сигнальная МА {signalMa.toFixed(2)}</h6></div>
        <div><p className="text-lg text-gray-600">Быстрая МА {fastMa.toFixed(2)}</p></div>
        <div><p className="text-lg text-gray-600">Медленная МА {slowMa.toFixed(2)}</p></div>
        <div><p className="text-lg text-gray-600">Трендовая МА {trendMa.toFixed(2)}</p></div>
      </div>
      <div className="w-full text-center">
        <div><h6 className="text-xl text-gray-900">Сигналы</h6></div>
        {closeFastMaCrossSell > 0 && <div><p className="text-xl text-red-600">{sellPatterns.closeFastMaCrossSell}</p></div>}
        {closeSlowMaCrossSell > 0 && <div><p className="text-xl text-red-600">{sellPatterns.closeSlowMaCrossSell}</p></div>}
        {closeFastMaCrossBuy > 0 && <div><p className="text-xl text-green-600">{buyPatterns.closeFastMaCrossBuy}</p></div>}
        {closeSlowMaCrossBuy > 0 && <div><p className="text-xl text-green-600">{buyPatterns.closeFastMaCrossBuy}</p></div>}
      </div>
      <div className="w-full text-center">
        <div>
          <p className={`text-xl text-${trendDirection === 'up' ? 'green' : (trendDirection === 'down' ? 'red' : 'gray')}-600`}>
            {trendDirection}
          </p>
        </div>
      </div>
    </div>
  )
};
