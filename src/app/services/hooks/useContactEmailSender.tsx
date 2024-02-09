import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Icons } from "@/components/ui/Icons";
import axiosNoAuth from "../axios/axios";

type formValues = {
  sender: string;
  subject: string;
  msgBody: string;
};

export const useContactEmailSender = () => {
  const queryClient = useQueryClient();
  const { data: emailFormErrors = new Map<string, string>() } = useQuery<
    Map<string, string>
  >({
    queryKey: ["emailFormErrors"],
    initialData: new Map<string, string>([
      ["subject", ""],
      ["msgBody", ""],
      ["sender", ""],
    ]),
  });

  const addEmailFormErrorValue = (key: string, value: string) => {
    if (value !== undefined) {
      queryClient.setQueryData(
        ["emailFormErrors"],
        (prevValues: Map<string, string> | undefined) => {
          const updatedValues = prevValues ? new Map(prevValues) : new Map();
          updatedValues.set(key, value);
          return updatedValues;
        }
      );
    }
  };

  const sendEmail = useMutation({
    mutationKey: ["sendEmail"],
    mutationFn: async (formData: formValues) => {
      await axiosNoAuth
        .post("/api/email/send", {
          sender: formData.sender,
          msgBody: formData.msgBody,
          subject: formData.subject,
        })
        .then((response) => {
          toast.success(response.data, {
            icon: <Icons.mailSucess className="h-8 w-8 sm:h-6 sm:w-6" />,
            position: "bottom-right",
            autoClose: 3000,
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
          if (error.response.status === 400) {
            var result: formValues = error.response.data;
            addEmailFormErrorValue("sender", result.sender);
            addEmailFormErrorValue("subject", result.subject);
            addEmailFormErrorValue("msgBody", result.msgBody);
          }
          toast.error(error.data, {
            toastId: 1,
            icon: <Icons.mailWarning className="h-8 w-8 sm:h-6 sm:w-6" />,
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
        });
    },
  });

  if (sendEmail.isError) {
    toast.error("Unable to send email (Server error)", {
      toastId: 1,
      icon: <Icons.mailWarning className="h-8 w-8 sm:h-6 sm:w-6" />,
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

  return { sendEmail, emailFormErrors, addEmailFormErrorValue };
};
