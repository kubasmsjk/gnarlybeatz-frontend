import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { Icons } from "@/components/ui/Icons";
import { backendConfig } from "@/config/site";

type singInFormValues = {
  email: string;
  password: string;
};

type singUpFormValues = singInFormValues & {
  username: string;
};

export const useAuthenticationForm = () => {
  const queryClient = useQueryClient();

  const { data: formErrors = new Map<string, string>() } = useQuery<
    Map<string, string>
  >({
    queryKey: ["formErrors"],
    initialData: new Map<string, string>([
      ["username", ""],
      ["email", ""],
      ["password", ""],
    ]),
  });

  const addFormErrorValue = (key: string, value: string) => {
    queryClient.setQueryData(
      ["formErrors"],
      (prevValues: Map<string, string> | undefined) => {
        const updatedValues = prevValues ? new Map(prevValues) : new Map();
        updatedValues.set(key, value);
        return updatedValues;
      }
    );
  };

  const singInMutation = useMutation({
    mutationKey: ["singin"],
    mutationFn: async (formData: singInFormValues) => {
      await axios.post(`${backendConfig.url}/api/auth/authenticate`, {
        email: formData.email,
        password: formData.password,
      });
    },
  });

  const singUpMutation = useMutation({
    mutationKey: ["singup"],
    mutationFn: async (formData: singUpFormValues) => {
      await axios
        .post(`${backendConfig.url}/api/auth/register`, {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        })
        .then((result: any) => {
          formErrors.clear();
          console.log(result);
        })
        .catch((error) => {
          var result: singUpFormValues = error.response.data;
          addFormErrorValue("username", result.username);
          addFormErrorValue("email", result.email);
          addFormErrorValue("password", result.password);
        });
    },
  });

  if (singUpMutation.isError || singInMutation.isError) {
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

  return { singInMutation, singUpMutation, formErrors, addFormErrorValue };
};
