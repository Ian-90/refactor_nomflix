import { api, IApiError } from "api";
import { useQuery } from "@tanstack/react-query";
import { IMovieListResponse } from "./types";

const fetchUpcoming = async () => {
  const res = await api.get<IMovieListResponse>("/movie/upcoming");
  return res.data;
};

export const useUpcomingQuery = () =>
  useQuery<IMovieListResponse, IApiError>({
    queryKey: ["upcoming"],
    queryFn: fetchUpcoming,
  });
