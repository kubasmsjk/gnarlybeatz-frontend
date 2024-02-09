"use client";

import { Ref, useRef, useState } from "react";
import { Icons } from "@/components/ui/Icons";
import Input from "@/components/reused/Input";
import { useQueryClient } from "@tanstack/react-query";
import { uploadFileUtils } from "../utils/uploadFileUtils";
import { useUploadOrUpdateFileForm } from "../services/hooks/useUploadOrUpdateFileForm";
import SelectInput from "@/components/reused/SelectInput";

const initialFormValues = {
  beats: "-",
  mp3AudioFile: File,
  wavAudioFile: File,
  image: null,
  genre: "",
  mood: "",
  bpm: "",
  key: "",
};

const initialFormState = { values: initialFormValues };

export default function UploadOrUpdateBeatForm() {
  const [formValues, setFormValues] = useState(initialFormState);
  const { values } = formValues;
  const mp3FileInputRef = useRef({} as HTMLInputElement);
  const wavFileInputRef = useRef({} as HTMLInputElement);
  const imageFileInputRef = useRef({} as HTMLInputElement);
  const {
    selectAudioFileValues,
    uploadFileFormErrors,
    uploadFileMutation,
    addUploadFileFormErrorValue,
  } = useUploadOrUpdateFileForm();
  const { uploadFileFormSchema } = uploadFileUtils();
  const queryClient = useQueryClient();
  const handleChange = ({ target }: any) => {
    if (target.type === "select-one") {
      setFormValues((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          genre: selectAudioFileValues.get(target.value)!.genre,
          mood: selectAudioFileValues.get(target.value)!.mood,
          bpm: selectAudioFileValues.get(target.value)!.bpm,
          key: selectAudioFileValues.get(target.value)!.key,
          [target.name]: target.value,
        },
      }));
    }
    if (target.type === "file") {
      setFormValues((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          [target.name]: target.files[0],
        },
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          [target.name]: target.value,
        },
      }));
    }
  };

  const submitUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isTheFilesNameTheSame = checkIsTheFilesNameTheSame();

    const result = validateForm();

    if (!isTheFilesNameTheSame) {
      addUploadFileFormErrorValue("filesName", "File names differ");
    }

    if (result.success && isTheFilesNameTheSame) {
      uploadFile();
      setFormValues(initialFormState);
      queryClient.removeQueries({ queryKey: ["selectAudioFileValues"] });
      if (
        mp3FileInputRef.current &&
        wavFileInputRef.current &&
        imageFileInputRef.current
      ) {
        mp3FileInputRef.current.value = "";
        wavFileInputRef.current.value = "";
        imageFileInputRef.current.value = "";
      }
    }

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        addUploadFileFormErrorValue(issue.path[0].toString(), issue.message);
      });
    }
  };

  const checkIsTheFilesNameTheSame = () => {
    if (values.beats != "-") {
      return (
        values.beats === values.mp3AudioFile?.name.replace(/\.[^/.]+$/, "") &&
        values.mp3AudioFile?.name.replace(/\.[^/.]+$/, "") ===
          values.wavAudioFile?.name.replace(/\.[^/.]+$/, "")
      );
    } else {
      return (
        values.mp3AudioFile?.name.replace(/\.[^/.]+$/, "") ===
        values.wavAudioFile?.name.replace(/\.[^/.]+$/, "")
      );
    }
  };

  const validateForm = () => {
    clearFormErrorsValues();
    return uploadFileFormSchema.safeParse({
      genre: values.genre,
      mood: values.mood,
      bpm: values.bpm,
      key: values.key,
    });
  };

  const uploadFile = () => {
    uploadFileMutation.mutate({
      updateBeat: values.beats,
      mp3AudioFile: values.mp3AudioFile,
      wavAudioFile: values.wavAudioFile,
      image: values.image,
      genre: values.genre,
      mood: values.mood,
      bpm: values.bpm,
      key: values.key,
    });
  };

  const clearFormErrorsValues = () => {
    queryClient.resetQueries({
      queryKey: ["uploadFileFormErrors"],
      exact: true,
    });
  };

  return (
    <>
      <form
        onSubmit={submitUpload}
        method="post"
        className="flex flex-col w-[95%] justify-center items-center"
      >
        <SelectInput
          width="15rem"
          widthSm="20rem"
          padding="0.5"
          paddingSm="1"
          paddingB="7"
          paddingBSm="8"
          name="Beats"
          selectValues={selectAudioFileValues}
          handleFunction={handleChange}
        />
        <Input
          width="15rem"
          widthSm="20rem"
          paddingB={uploadFileFormErrors.get("filesName") != "" ? "3" : "7"}
          paddingBSm={uploadFileFormErrors.get("filesName") != "" ? "3" : "8"}
          type="file"
          id="mp3AudioFile"
          name="mp3AudioFile"
          text="Audio File mp3"
          handleFunction={handleChange}
          reference={mp3FileInputRef}
        />
        {uploadFileFormErrors.get("filesName") != "" ? (
          <span className="w-[15rem] sm:w-[20rem] pb-7 text-xs text-red-600">
            {uploadFileFormErrors.get("filesName")}
          </span>
        ) : null}
        <Input
          width="15rem"
          widthSm="20rem"
          paddingB={uploadFileFormErrors.get("filesName") != "" ? "3" : "7"}
          paddingBSm={uploadFileFormErrors.get("filesName") != "" ? "3" : "8"}
          type="file"
          id="wavAudioFile"
          name="wavAudioFile"
          text="Audio File wav"
          handleFunction={handleChange}
          reference={wavFileInputRef}
        />
        {uploadFileFormErrors.get("filesName") != "" ? (
          <span className="w-[15rem] sm:w-[20rem] pb-7 text-xs text-red-600">
            {uploadFileFormErrors.get("filesName")}
          </span>
        ) : null}
        <Input
          width="15rem"
          widthSm="20rem"
          paddingB="7"
          paddingBSm="8"
          type="file"
          id="image"
          name="image"
          text="Image"
          handleFunction={handleChange}
          reference={imageFileInputRef}
        />

        <Input
          width="15rem"
          widthSm="20rem"
          paddingB={uploadFileFormErrors.get("genre") != "" ? "3" : "7"}
          paddingBSm={uploadFileFormErrors.get("genre") != "" ? "3" : "8"}
          type="text"
          id="genre"
          name="genre"
          value={values.genre}
          text="Genre"
          handleFunction={handleChange}
        />
        {uploadFileFormErrors.get("genre") != "" ? (
          <span className="w-[15rem] sm:w-[20rem] pb-7 text-xs text-red-600">
            {uploadFileFormErrors.get("genre")}
          </span>
        ) : null}

        <Input
          width="15rem"
          widthSm="20rem"
          paddingB={uploadFileFormErrors.get("mood") != "" ? "3" : "7"}
          paddingBSm={uploadFileFormErrors.get("mood") != "" ? "3" : "8"}
          type="text"
          id="mood"
          name="mood"
          value={values.mood}
          text="Mood"
          handleFunction={handleChange}
        />
        {uploadFileFormErrors.get("mood") != "" ? (
          <span className="w-[15rem] sm:w-[20rem] pb-7 text-xs text-red-600">
            {uploadFileFormErrors.get("mood")}
          </span>
        ) : null}

        <Input
          width="15rem"
          widthSm="20rem"
          paddingB={uploadFileFormErrors.get("bpm") != "" ? "3" : "7"}
          paddingBSm={uploadFileFormErrors.get("bpm") != "" ? "3" : "8"}
          type="number"
          id="bpm"
          name="bpm"
          value={values.bpm}
          text="Bpm"
          handleFunction={handleChange}
        />
        {uploadFileFormErrors.get("bpm") != "" ? (
          <span className="w-[15rem] sm:w-[20rem] pb-7 text-xs text-red-600">
            {uploadFileFormErrors.get("bpm")}
          </span>
        ) : null}

        <Input
          width="15rem"
          widthSm="20rem"
          paddingB={uploadFileFormErrors.get("key") != "" ? "3" : "7"}
          paddingBSm={uploadFileFormErrors.get("key") != "" ? "3" : "8"}
          type="text"
          id="key"
          name="key"
          value={values.key}
          text="Key"
          handleFunction={handleChange}
        />
        {uploadFileFormErrors.get("key") != "" ? (
          <span className="w-[15rem] sm:w-[20rem] pb-7 text-xs text-red-600">
            {uploadFileFormErrors.get("key")}
          </span>
        ) : null}
        <div className="flex items-center justify-center p-3">
          {uploadFileMutation.isPending ? (
            <div role="status">
              <Icons.loading />
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <button
              className="bg-transparent text-red-700 font-bold py-2 px-4 rounded-2xl border-2 border-[#8A0303] disabled:opacity-60"
              type="submit"
              disabled={
                !values.mp3AudioFile ||
                !values.wavAudioFile ||
                !values.genre ||
                !values.mood ||
                !values.bpm ||
                !values.key
              }
            >
              Upload
            </button>
          )}
        </div>
      </form>
    </>
  );
}
