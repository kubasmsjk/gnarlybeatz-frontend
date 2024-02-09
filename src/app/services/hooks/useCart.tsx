import { useQuery, useQueryClient } from "@tanstack/react-query";

type Beat = {
  licenseType: string;
  name: string;
  genre: string;
  mood: string;
  bpm: string;
  keySignature: string;
  imageUrl: string;
  productStripeId: string;
  standardProductStripePriceId: string;
  deluxeProductStripePriceId: string;
};

export const useCart = () => {
  const queryClient = useQueryClient();

  const { data: price } = useQuery<number>({
    queryKey: ["price"],
    initialData: 0,
  });

  const addToPrice = (value: number) => {
    if (value !== undefined) {
      queryClient.setQueryData<number | undefined>(["price"], (prevValue) => {
        const updatedValue =
          prevValue !== undefined ? prevValue + value : value;
        return updatedValue;
      });
    }
  };

  const removePrice = (value: number) => {
    if (value !== undefined) {
      queryClient.setQueryData<number | undefined>(["price"], (prevValue) => {
        const updatedValue =
          prevValue !== undefined
            ? prevValue - value < 0
              ? 0
              : prevValue - value
            : value;
        return updatedValue;
      });
    }
  };

  const { data: cart = new Map<string, Beat>() } = useQuery<Map<string, Beat>>({
    queryKey: ["cart"],
  });

  const addBeatToCart = (key: string, value: Beat) => {
    if (value !== undefined) {
      queryClient.setQueryData(
        ["cart"],
        (prevValues: Map<string, Beat> | undefined) => {
          const updatedValues = prevValues ? new Map(prevValues) : new Map();
          updatedValues.set(key, value);
          return updatedValues;
        }
      );
    }
  };

  const removeBeatFromCart = (beatName: string) => {
    const newCart = new Map(cart);
    newCart.delete(beatName);
    queryClient.setQueryData(["cart"], newCart);
    cart.clear();
  };

  const updateLicenseTypeOfBeatToCart = (key: string, value: string) => {
    if (value !== undefined) {
      queryClient.setQueryData(
        ["cart"],
        (prevValues: Map<string, Beat> | undefined) => {
          const updatedValues = prevValues ? new Map(prevValues) : new Map();
          updatedValues.get(key).licenseType = value;
          return updatedValues;
        }
      );
    }
  };

  return {
    price,
    cart,
    addBeatToCart,
    removeBeatFromCart,
    addToPrice,
    removePrice,
    updateLicenseTypeOfBeatToCart,
  };
};
