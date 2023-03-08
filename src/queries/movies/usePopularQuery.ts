import { api, IApiError } from "api";
import { useQuery } from "@tanstack/react-query";
import { IMovieListResponse } from "./types";

const fetchPopular = async () => {
  const res = await api.get<IMovieListResponse>("/movie/popular");
  return res.data;
};

export const usePopularQuery = () =>
  useQuery<IMovieListResponse, IApiError>({
    queryKey: ["popular"],
    queryFn: fetchPopular,
  });
