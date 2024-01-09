import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { Icons } from "@/components/ui/Icons";
import { backendConfig } from "@/config/site";

type formValues = {
  email: string;
  subject: string;
  message: string;
};

export const useContactEmailSender = () => {
  const mutation = useMutation({
    mutationKey: ["sendEmail"],
    mutationFn: async (formData: formValues) => {
      await axios.post(`${backendConfig.url}/sendMail`, {
        sender: formData.email,
        msgBody: formData.message,
        subject: formData.subject,
      });
      toast.success("Email sent", {
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
    },
  });

  if (mutation.isError) {
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

  return { mutation };
};
