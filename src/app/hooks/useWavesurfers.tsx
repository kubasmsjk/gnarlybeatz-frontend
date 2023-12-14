import { useQuery, useQueryClient } from "@tanstack/react-query";
import WaveSurfer from "wavesurfer.js";

export const useWavesurfers = () => {
  const queryClient = useQueryClient();

  const { data: wavesurfers = [] } = useQuery<WaveSurfer[]>({
    queryKey: ["wavesurfers"],
  });

  const addWavesurfer = (wavesurfer : WaveSurfer) => {
    queryClient.setQueryData(["wavesurfers"], (prevWavesurfers: WaveSurfer[] | undefined) => {
        const updatedWavesurfers = prevWavesurfers ? [...prevWavesurfers, wavesurfer] : [wavesurfer];
        return updatedWavesurfers;
      });
  };

  return { wavesurfers, addWavesurfer };
};
