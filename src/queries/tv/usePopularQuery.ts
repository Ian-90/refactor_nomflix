import { api, IApiError } from "api";
import { useQuery } from "@tanstack/react-query";
import { ITVListResponse } from "./types";

const fetchPopular = async () => {
  const res = await api.get<ITVListResponse>("/tv/popular");
  return res.data;
};

export const usePopularQuery = () =>
  useQuery<ITVListResponse, IApiError>({
    queryKey: ["popular"],
    queryFn: fetchPopular,
  });
