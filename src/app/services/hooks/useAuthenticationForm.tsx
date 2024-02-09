import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Icons } from "@/components/ui/Icons";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import useAxiosAuth from "../axios/useAxiosAuth";
import axiosNoAuth from "../axios/axios";

type singInFormValues = {
  account?: string;
  email: string;
  password: string;
};

type singUpFormValues = singInFormValues & {
  username: string;
};

type editUserFormValues = {
  account?: string;
  username: string;
  currentEmail: string;
  newEmail: string;
  currentPassword: string;
  newPassword: string;
};

type editUserResponse = {
  data: {
    username: string;
    email: string;
  };
};

type authenticateResponse = {
  data: {
    id: string;
    username: string;
    email: string;
    role: string;
    accessToken: string;
    refreshToken: string;
  };
};

export const useAuthenticationForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const axiosAuth = useAxiosAuth();

  const { data: formErrors = new Map<string, string>() } = useQuery<
    Map<string, string>
  >({
    queryKey: ["formErrors"],
    initialData: new Map<string, string>([
      ["account", ""],
      ["username", ""],
      ["email", ""],
      ["currentEmail", ""],
      ["password", ""],
      ["newPassword", ""],
    ]),
  });

  const addFormErrorValue = (key: string, value: string) => {
    if (value !== undefined) {
      queryClient.setQueryData(
        ["formErrors"],
        (prevValues: Map<string, string> | undefined) => {
          const updatedValues = prevValues ? new Map(prevValues) : new Map();
          updatedValues.set(key, value);
          return updatedValues;
        }
      );
    }
  };

  const singInMutation = useMutation({
    mutationKey: ["singin"],
    mutationFn: async (formData: singInFormValues) => {
      await axiosNoAuth
        .post("/api/auth/authenticate", {
          email: formData.email,
          password: formData.password,
        })
        .then((result: authenticateResponse) => {
          queryClient.resetQueries({ queryKey: ["formErrors"], exact: true });
          signIn("credentials", {
            redirect: false,
            id: result.data.id,
            username: result.data.username,
            email: result.data.email,
            role: result.data.role,
            accessToken: result.data.accessToken,
            refreshToken: result.data.refreshToken,
          });
          router.push("/");
        })
        .catch((error) => {
          var result: singInFormValues = error.response.data;
          addFormErrorValue("account", result.account!);
          addFormErrorValue("email", result.email);
          addFormErrorValue("password", result.password);
        });
    },
  });

  const singUpMutation = useMutation({
    mutationKey: ["singup"],
    mutationFn: async (formData: singUpFormValues) => {
      await axiosNoAuth
        .post("/api/auth/register", {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        })
        .then((result: authenticateResponse) => {
          queryClient.resetQueries({ queryKey: ["formErrors"], exact: true });
          signIn("credentials", {
            redirect: false,
            id: result.data.id,
            username: result.data.username,
            email: result.data.email,
            role: result.data.role,
            accessToken: result.data.accessToken,
            refreshToken: result.data.refreshToken,
          });
          router.push("/");
        })
        .catch((error) => {
          var result: singUpFormValues = error.response.data;
          addFormErrorValue("username", result.username);
          addFormErrorValue("email", result.email);
          addFormErrorValue("password", result.password);
        });
    },
  });

  const editUserMutation = useMutation({
    mutationKey: ["editUser"],
    mutationFn: async (formData: editUserFormValues) => {
      const response = await axiosAuth
        .post("/api/user/edit", {
          username: formData.username,
          currentEmail: formData.currentEmail,
          newEmail: formData.newEmail,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        })
        .then((response: editUserResponse) => {
          queryClient.resetQueries({ queryKey: ["formErrors"], exact: true });
          return response.data;
        })
        .catch((error) => {
          var result: editUserFormValues = error.response.data;
          addFormErrorValue("account", result.account!);
          addFormErrorValue("username", result.username);
          addFormErrorValue("currentEmail", result.currentEmail);
          addFormErrorValue("email", result.newEmail);
          addFormErrorValue("password", result.currentPassword);
          addFormErrorValue("newPassword", result.newPassword);
        });
      return response;
    },
  });

  if (
    singUpMutation.isError ||
    singInMutation.isError ||
    editUserMutation.isError
  ) {
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
    singInMutation,
    singUpMutation,
    editUserMutation,
    formErrors,
    addFormErrorValue,
  };
};
