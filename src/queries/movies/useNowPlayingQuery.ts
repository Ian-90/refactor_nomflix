import { useQuery } from "@tanstack/react-query";
import { api } from "api";
import { INowPlayingResponse } from "./types";

const fetchNowPlaying = async () => {
  const res = await api.get<INowPlayingResponse>("/movie/now_playing");
  return res.data;
};

export const useNowPlayingQuery = () =>
  useQuery<INowPlayingResponse>({
    queryKey: ["nowPlaying"],
    queryFn: fetchNowPlaying,
  });
