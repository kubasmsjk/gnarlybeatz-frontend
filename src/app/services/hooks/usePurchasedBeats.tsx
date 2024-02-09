import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Icons } from "@/components/ui/Icons";
import { b64toBlob } from "../b64ToBlob";
import useAxiosAuth from "../axios/useAxiosAuth";

type AudioFileData = {
  name: string;
  audioType: string;
  file: string;
};

export const usePurchasedBeats = (
  userId: string | undefined,
  status: string
) => {
  const axiosAuth = useAxiosAuth();

  const fetchAudioFilesData = async (): Promise<AudioFileData[]> =>
    await axiosAuth
      .get(`/api/audio/download?userId=${Number(userId)}`)
      .then((response) => {
        response.data.map((element: AudioFileData) => {
          var audioBlob;
          if (element.audioType === "audio/mpeg") {
            audioBlob = b64toBlob(element.file, "audio/mp3");
          } else {
            audioBlob = b64toBlob(element.file, "audio/wav");
          }
          const audioUrl = URL.createObjectURL(audioBlob);
          element.file = audioUrl;
        });
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });

  const {
    data: purchasedBeats,
    isSuccess,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["purchasedBeats"],
    queryFn: async () => {
      const response: AudioFileData[] = await fetchAudioFilesData();
      return response;
    },
    enabled: status != "loading",
  });

  if (isError) {
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
    purchasedBeats,
    isSuccess,
    isLoading,
    isError,
  };
};
