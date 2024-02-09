import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Icons } from "@/components/ui/Icons";
import useAxiosAuth from "../axios/useAxiosAuth";

type archiveBeatFormValues = {
  archiveBeat: string;
};

type archiveBeatData = {
  name: string;
  genre: string;
  mood: string;
  bpm: string;
  key: string;
};

export const useArchiveBeat = () => {
  const axiosAuth = useAxiosAuth();

  const archiveBeatMutation = useMutation({
    mutationKey: ["archiveBeat"],
    mutationFn: async (formData: archiveBeatFormValues) => {
      await axiosAuth
        .post("/api/audio/archiveBeat", {
          name: formData.archiveBeat,
        })
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
          console.log(error);
        });
    },
  });

  const { data: selectArchiveBeatValues = new Map<string, archiveBeatData>() } =
    useQuery<Map<string, archiveBeatData>>({
      queryKey: ["selectArchiveBeatValues"],
      queryFn: async () => {
        const initialData: Map<string, archiveBeatData> = new Map([
          ["-", { name: "-", genre: "-", mood: "-", bpm: "-", key: "-" }],
        ]);

        const response = await axiosAuth
          .get("/api/audio/listOfArchiveBeat")
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            console.log(error);
          });

        Object.entries(response).forEach((element) => {
          initialData.set(element[0], element[1] as archiveBeatData);
        });

        return initialData;
      },
    });

  if (archiveBeatMutation.isError) {
    toast.error("Server error", {
      toastId: 1,
      icon: <Icons.serverError className="h-8 w-8 sm:h-6 sm:w-6" />,
      position: "bottom-right",
      autoClose: 4000,
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
    archiveBeatMutation,
    selectArchiveBeatValues,
  };
};
