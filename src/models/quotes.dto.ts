export type QuoteDTO = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export type QuotesDTO = QuoteDTO[];

export type QuotesResponseDTO = {
  data: QuotesDTO;
  count: number;
}
