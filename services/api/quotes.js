import useSWR from "swr";

import { fetcher } from "./helper";

export function useTickers() {
  const { data, error } = useSWR('http://localhost:8003/api/quotes/tickers/', fetcher);

  return {
    tickers: data,
    isLoading: !error && !data,
    isError: error
  }
}
