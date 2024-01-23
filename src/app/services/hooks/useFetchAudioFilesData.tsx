import { backendConfig } from "@/config/site";
import { useBeatsFormFilter } from "./useBeatsFormFilter";
import { b64toBlob } from "../b64ToBlob";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Session } from "next-auth/core/types";

type AudioFileData = {
  content: [Content];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
};

type Content = {
  name: string;
  genre: string;
  mood: string;
  bpm: string;
  key: string;
  audioBlob: string;
  imageBlob: string;
};

export const useFetchAudioFilesData = (
  pathname: string,
  session: Session | null
) => {
  const { filterValues } = useBeatsFormFilter();
  const path = pathname.substring(pathname.lastIndexOf("/") + 1);

  const fetchAudioFilesData = async (page: number): Promise<AudioFileData> =>
    await axios
      .get(
        backendConfig.url +
          `/api/audio/search?pageNo=${page}&pageSize=2&pathname=${path}&userId=${
            session ? Number(session?.user.id) : ""
          }
          &name=${filterValues.get("search") || ""}&genre=${
            filterValues.get("genre") || ""
          }&mood=${filterValues.get("mood") || ""}&bpm=${
            filterValues.get("bpm") || ""
          }&key=${filterValues.get("key") || ""}`
      )
      .then((response) => {
        response.data.content.map((element: Content) => {
          const audioBlob = b64toBlob(element.audioBlob, "audio/mp3");
          const audioUrl = URL.createObjectURL(audioBlob);
          const imageBlob = b64toBlob(element.imageBlob, "image/png");
          const imageUrl = URL.createObjectURL(imageBlob);
          element.audioBlob = audioUrl;
          element.imageBlob = imageUrl;
        });
        return response.data;
      });

  const {
    data: audioData,
    fetchNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["audioData"],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await fetchAudioFilesData(pageParam);
      return response;
    },
    getNextPageParam: (_, pages) => {
      return pages.length;
    },
    initialPageParam: 0,
  });

  return { audioData, fetchNextPage, isError, isLoading };
};
