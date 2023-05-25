import adminApi from "@/api/admin";
import quotesApi from "@/api/quotes";
import screenerApi from "@/api/screener";

const api = {
  admin: adminApi,
  quotes: quotesApi,
  screener: screenerApi,
};

export default api;
