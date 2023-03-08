import { api, IApiError } from "api";
import { useQuery } from "@tanstack/react-query";
import { ITVListResponse } from "./types";

const fetchAiringToday = async () => {
  const res = await api.get<ITVListResponse>("/tv/airing_today");
  return res.data;
};

export const useAiringTodayQuery = () =>
  useQuery<ITVListResponse, IApiError>({
    queryKey: ["airing-today"],
    queryFn: fetchAiringToday,
  });
