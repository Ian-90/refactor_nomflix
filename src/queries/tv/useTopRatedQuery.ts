import { api, IApiError } from "api";
import { useQuery } from "@tanstack/react-query";
import { ITVListResponse } from "./types";

const fetchTopRated = async () => {
  const res = await api.get<ITVListResponse>("/tv/top_rated");
  return res.data;
};

export const useTopRatedQuery = () =>
  useQuery<ITVListResponse, IApiError>({
    queryKey: ["toprated"],
    queryFn: fetchTopRated,
  });
