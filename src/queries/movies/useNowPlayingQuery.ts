import { useQuery } from "@tanstack/react-query";
import { api } from "api";
import { IMovieListResponse } from "./types";

const fetchNowPlaying = async () => {
  const res = await api.get<IMovieListResponse>("/movie/now_playing");
  return res.data;
};

export const useNowPlayingQuery = () =>
  useQuery<IMovieListResponse>({
    queryKey: ["nowPlaying"],
    queryFn: fetchNowPlaying,
  });
