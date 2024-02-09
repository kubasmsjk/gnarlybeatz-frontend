import { Icons } from "@/components/ui/Icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosAuth from "../axios/useAxiosAuth";

type AudioFileData = {
  userId: string;
  name: string;
};

type favoriteBeatErrorValues = {
  account: string;
  file: string;
};

export const useFavoriteBeats = () => {
  const queryClient = useQueryClient();
  const axiosAuth = useAxiosAuth();

  const { data: favoriteBeatErrors = new Map<string, string>() } = useQuery<
    Map<string, string>
  >({
    queryKey: ["favoriteBeatErrors"],
    initialData: new Map<string, string>([
      ["account", ""],
      ["file", ""],
    ]),
  });

  const addFavoriteBeatErrorValue = (key: string, value: string) => {
    if (value !== undefined) {
      queryClient.setQueryData(
        ["favoriteBeatErrors"],
        (prevValues: Map<string, string> | undefined) => {
          const updatedValues = prevValues ? new Map(prevValues) : new Map();
          updatedValues.set(key, value);
          return updatedValues;
        }
      );
    }
  };

  const addFavoriteBeatMutation = useMutation({
    mutationKey: ["FavoriteBeats"],
    mutationFn: async (data: AudioFileData) => {
      await axiosAuth
        .post(
          `/api/audio/favoriteBeats/add?id=${data.userId}&name=${data.name}`
        )
        .then((response) => {
          toast.success(response.data, {
            icon: <Icons.music className="h-8 w-8 sm:h-6 sm:w-6" />,
            position: "bottom-right",
            autoClose: 700,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
            style: { backgroundColor: "#1B7A43" },
          });
        })
        .catch((error) => {
          var result: favoriteBeatErrorValues = error.response.data;
          addFavoriteBeatErrorValue("account", result.account);
          addFavoriteBeatErrorValue("file", result.file);
        });
    },
  });

  const removeFavoriteBeatMutation = useMutation({
    mutationKey: ["FavoriteBeats"],
    mutationFn: async (data: AudioFileData) => {
      await axiosAuth
        .post(
          `/api/audio/favoriteBeats/remove?id=${data.userId}&name=${data.name}`
        )
        .then((response) => {
          toast.success(response.data, {
            icon: <Icons.music className="h-8 w-8 sm:h-6 sm:w-6" />,
            position: "bottom-right",
            autoClose: 700,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
            style: { backgroundColor: "#1B7A43" },
          });
          queryClient.prefetchInfiniteQuery({
            queryKey: ["audioData"],
            initialPageParam: 0,
          });
        })
        .catch((error) => {
          var result: favoriteBeatErrorValues = error.response.data;
          addFavoriteBeatErrorValue("account", result.account);
          addFavoriteBeatErrorValue("file", result.file);
        });
    },
  });

  if (addFavoriteBeatMutation.isError) {
    toast.error("Server error", {
      toastId: 1,
      icon: <Icons.serverError className="h-8 w-8 sm:h-6 sm:w-6" />,
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
      style: { backgroundColor: "#8A0303" },
    });
  }

  return {
    favoriteBeatErrors,
    addFavoriteBeatMutation,
    removeFavoriteBeatMutation,
  };
};
