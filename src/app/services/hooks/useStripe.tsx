import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import useAxiosAuth from "../axios/useAxiosAuth";

type Beat = {
  licensType: string;
  name: string;
  genre: string;
  mood: string;
  bpm: string;
  keySignature: string;
  imageUrl: string;
};

type StripeProduct = {
  userId: string;
  productStripeId: string;
  standardProductStripePriceId: string;
  deluxeProductStripePriceId: string;
  licenseType: string;
};
export const useStripe = () => {
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const buy = useMutation({
    mutationKey: ["buy"],
    mutationFn: async (cart: Array<StripeProduct>) => {
      await axiosAuth
        .post(`/api/payments/checkout`, cart)
        .then((response) => {
          router.push(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
  return { buy };
};
