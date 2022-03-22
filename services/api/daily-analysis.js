import useSWR from "swr";

import { fetcher } from "./helper";

export function useFeatureCodes(key) {
  const {data, error} = useSWR(key ? 'http://localhost:8003/api/daily-analysis/feature-codes/' : null, fetcher);

  return {
    featureCodes: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function useFeatures(key, tickerId, onDate) {
  console.log(tickerId)
  console.log(onDate)

  const {data, error} = useSWR(key ? `http://localhost:8003/api/daily-analysis/features/get_features_for_daily_analysis_post/?ticker=${tickerId ? tickerId : ''}&on_date=${onDate ? onDate : ''}` : null, fetcher)

  return {
    features: data && data.map(item => ( {...item, features: JSON.parse(item.features)} )),
    isLoading: !error && !data,
    isError: error
  }
}

export function useAvailableDailyAnalysisPosts() {
  const {
    data,
    error
  } = useSWR(`http://localhost:8003/api/daily-analysis/features/get_available_daily_analysis_posts/`, fetcher)

  return {
    posts: data,
    isLoading: !error && !data,
    isError: error
  }
}
