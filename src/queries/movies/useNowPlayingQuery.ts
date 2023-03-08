import { useQuery } from "@tanstack/react-query";
import { api, IApiError } from "api";
import { IMovieListResponse } from "./types";

const fetchNowPlaying = async () => {
  const res = await api.get<IMovieListResponse>("/movie/now_playing");
  return res.data;
};

export const useNowPlayingQuery = () =>
  useQuery<IMovieListResponse, IApiError>({
    queryKey: ["nowPlaying"],
    queryFn: fetchNowPlaying,
  });
