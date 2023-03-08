import { api } from "api";
import { useQuery } from "@tanstack/react-query";
import { IMovieListResponse } from "./types";

const fetchPopular = async () => {
  const res = await api.get<IMovieListResponse>("/movie/popular");
  return res.data;
};

export const usePopularQuery = () =>
  useQuery<IMovieListResponse>({
    queryKey: ["popular"],
    queryFn: fetchPopular,
  });
