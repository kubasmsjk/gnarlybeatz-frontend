import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Icons } from "@/components/ui/Icons";
import useAxiosAuth from "../axios/useAxiosAuth";

type uploadFileFormValues = {
  updateBeat: string;
  mp3AudioFile: Object;
  wavAudioFile: Object;
  image: null;
  genre: string;
  mood: string;
  bpm: string;
  key: string;
};

type uploadFileFormErrorValues = {
  genre: string;
  mood: string;
  bpm: string;
  key: string;
};

type AudioFileUpdateData = uploadFileFormErrorValues & {
  name: string;
};

export const useUploadOrUpdateFileForm = () => {
  const queryClient = useQueryClient();
  const axiosAuth = useAxiosAuth();

  const { data: uploadFileFormErrors = new Map<string, string>() } = useQuery<
    Map<string, string>
  >({
    queryKey: ["uploadFileFormErrors"],
    initialData: new Map<string, string>([
      ["filesName", ""],
      ["genre", ""],
      ["mood", ""],
      ["bpm", ""],
      ["key", ""],
    ]),
  });

  const addUploadFileFormErrorValue = (key: string, value: string) => {
    if (value !== undefined) {
      queryClient.setQueryData(
        ["uploadFileFormErrors"],
        (prevValues: Map<string, string> | undefined) => {
          const updatedValues = prevValues ? new Map(prevValues) : new Map();
          updatedValues.set(key, value);
          return updatedValues;
        }
      );
    }
  };

  const uploadFileMutation = useMutation({
    mutationKey: ["uploadFile"],
    mutationFn: async (formData: uploadFileFormValues) => {
      await axiosAuth
        .post(
          "/api/audio/uploadOrUpdate",
          {
            updateBeat: formData.updateBeat,
            mp3AudioFile: formData.mp3AudioFile,
            wavAudioFile: formData.wavAudioFile,
            image: formData.image,
            genre: formData.genre,
            mood: formData.mood,
            bpm: formData.bpm,
            key: formData.key,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          queryClient.resetQueries({
            queryKey: ["uploadFileFormErrors"],
            exact: true,
          });
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
          var result: uploadFileFormErrorValues = error.response.data;
          addUploadFileFormErrorValue("genre", result.genre);
          addUploadFileFormErrorValue("mood", result.mood);
          addUploadFileFormErrorValue("bpm", result.bpm);
          addUploadFileFormErrorValue("key", result.key);
        });
    },
  });

  const {
    data: selectAudioFileValues = new Map<string, AudioFileUpdateData>(),
  } = useQuery<Map<string, AudioFileUpdateData>>({
    queryKey: ["selectAudioFileValues"],
    queryFn: async () => {
      const initialData: Map<string, AudioFileUpdateData> = new Map([
        ["-", { name: "-", genre: "-", mood: "-", bpm: "-", key: "-" }],
      ]);

      const response = await axiosAuth
        .get("/api/audio/listOfAudioFilesToUpdate")
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      Object.entries(response).forEach((element) => {
        initialData.set(element[0], element[1] as AudioFileUpdateData);
      });

      return initialData;
    },
  });

  if (uploadFileMutation.isError) {
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
    selectAudioFileValues,
    uploadFileMutation,
    uploadFileFormErrors,
    addUploadFileFormErrorValue,
  };
};
