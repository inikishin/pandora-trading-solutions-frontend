import { AxiosError } from 'axios';

export type Nullable<T> = T | null;

export type LSDEState<T> = {
  isLoading: boolean;
  isSuccess: boolean;
  error: Nullable<string>;
  data: Nullable<T>;
};

export const DEFAULT_LSDE_STATE: LSDEState<any> = {
  isLoading: false,
  isSuccess: false,
  error: null,
  data: null,
};

export const handleError = (error: unknown) => {
  if (error instanceof AxiosError && error.response) {
    return error.response.data as string;
  }
  return (error as Error).message;
};
