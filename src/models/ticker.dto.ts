export type TickerDTO = {
  id: string;
  code: string;
  name: string;
  description: string;
  market: string;
  img: string;
};

export type TickersDTO = TickerDTO[];
