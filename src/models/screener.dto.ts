import { Nullable } from "@/store/utils";

export type ScreenerCalcsDTO = {
  price_1h_ch: number;
  prcnt_1h_ch: number;
  price_4h_ch: number;
  prcnt_4h_ch: number;
  price_12h_ch: number;
  prcnt_12h_ch: number;
  price_1d_ch: number;
  prcnt_1d_ch: number;
  price_1w_ch: number;
  prcnt_1w_ch: number;
  price_1m_ch: number;
  prcnt_1m_ch: number;
  price_3m_ch: number;
  prcnt_3m_ch: number;
  price_6m_ch: number;
  prcnt_6m_ch: number;
  price_1y_ch: number;
  prcnt_1y_ch: number;
  volume_1h: number;
  volume_4h: number;
  volume_12h: number;
  volume_1d: number;
  volume_1w: number;
  volume_1m: number;
  volume_3m: number;
  volume_6m: number;
  volume_1y: number;
};

export type LevelDTO = {
  name: string;
  value: number;
  weight: number;
};

export type ScreenerLevelsDTO = {
  murray: LevelDTO[];
  support_and_resistance: LevelDTO[];
}

export type ScreenerTechDTO = {
  regression_line_angle: number;
  signal_ma: number;
  fast_ma: number;
  slow_ma: number;
  trend_ma: number;
  close_fast_ma_cross_buy: number;
  close_fast_ma_cross_sell: number;
  close_slow_ma_cross_buy: number;
  close_slow_ma_cross_sell: number;
  cci: number;
  cci_div_sell: number;
  cci_div_buy: number;
  cci_over_sell: number;
  cci_over_buy: number;
  ao: number;
  ao_zero_line_placement: number;
  ao_div_sell: number;
  ao_div_buy: number;
  will: number;
  will_div_sell: number;
  will_div_buy: number;
  will_over_sell: number;
  will_over_buy: number;
  bb_up: number;
  bb_low: number;
  bb_width: number;
  bb_up_touch: number;
  bb_down_touch: number;
  bb_width_percent: number;
  divbar_buy: number;
  divbar_sell: number;
  hummer: number;
  shooting_star: number;
  engulfing_buy: number;
  engulfing_sell: number;
  overall_score: number;
};

export type ScreenerDTO = {
  ticker: Nullable<string>;
  on: Nullable<string>;
  calcs: Nullable<ScreenerCalcsDTO>;
  levels: Nullable<ScreenerLevelsDTO>;
  tech_d1: Nullable<ScreenerTechDTO>;
  tech_h1: Nullable<ScreenerTechDTO>;
};

export type ScreenersDTO = ScreenerDTO[];
