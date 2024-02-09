import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosNoAuth from "../axios/axios";
import { Session } from "next-auth/core/types";

export const useBeatsFormFilter = (
  pathname: string,
  session: Session | null,
  status: string
) => {
  const queryClient = useQueryClient();
  const path = pathname?.substring(pathname.lastIndexOf("/") + 1);

  const fetchFilterData = async () =>
    await axiosNoAuth
      .get(
        `/api/audio/filter/values?path=${path}&userId=${
          Number(session?.user.id) || ""
        }`
      )
      .then((response) => {
        addSelectBpmValues(response.data.bpm);
        addSelectKeyValues(response.data.key);
        addSelectMoodsValues(response.data.mood);
        addSelectGenresValues(response.data.genre);
        return response;
      });

  const {
    data: filterData,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["fetchFilterData"],
    queryFn: async () => {
      const response = await fetchFilterData();
      return response;
    },
    enabled: status != "loading",
  });

  const { data: filterValues = new Map<string, string>() } = useQuery<
    Map<string, string>
  >({
    queryKey: ["beatFormFilterValues"],
  });

  const { data: selectBpmValues = new Set<string>() } = useQuery<Set<string>>({
    queryKey: ["selectBpmValues"],
    initialData: new Set(["-"]),
  });
  const { data: selectKeyValues = new Set<string>() } = useQuery<Set<string>>({
    queryKey: ["selectKeyValues"],
    initialData: new Set(["-"]),
  });
  const { data: selectMoodsValues = new Set<string>() } = useQuery<Set<string>>(
    {
      queryKey: ["selectMoodsValues"],
      initialData: new Set(["-"]),
    }
  );
  const { data: selectGenresValues = new Set<string>() } = useQuery<
    Set<string>
  >({
    queryKey: ["selectGenresValues"],
    initialData: new Set(["-"]),
  });

  const addFilterValue = (name: string, value: string) => {
    queryClient.setQueryData(
      ["beatFormFilterValues"],
      (prevValues: Map<string, string> | undefined) => {
        const updatedValues = prevValues ? new Map(prevValues) : new Map();
        updatedValues.set(name, value);
        return updatedValues;
      }
    );
  };
  const addSelectBpmValues = (values: string[]) => {
    queryClient.setQueryData(
      ["selectBpmValues"],
      (prevValues: Set<string> | undefined) => {
        const updatedValues = prevValues ? new Set(prevValues) : new Set();
        values.forEach((value) => {
          updatedValues.add(value);
        });
        return updatedValues;
      }
    );
  };

  const addSelectKeyValues = (values: string[]) => {
    queryClient.setQueryData(
      ["selectKeyValues"],
      (prevValues: Set<string> | undefined) => {
        const updatedValues = prevValues ? new Set(prevValues) : new Set();
        values.forEach((value) => {
          updatedValues.add(value);
        });
        return updatedValues;
      }
    );
  };
  const addSelectMoodsValues = (values: string[]) => {
    queryClient.setQueryData(
      ["selectMoodsValues"],
      (prevValues: Set<string> | undefined) => {
        const updatedValues = prevValues ? new Set(prevValues) : new Set();
        values.forEach((value) => {
          updatedValues.add(value);
        });
        return updatedValues;
      }
    );
  };
  const addSelectGenresValues = (values: string[]) => {
    queryClient.setQueryData(
      ["selectGenresValues"],
      (prevValues: Set<string> | undefined) => {
        const updatedValues = prevValues ? new Set(prevValues) : new Set();
        values.forEach((value) => {
          updatedValues.add(value);
        });
        return updatedValues;
      }
    );
  };

  return {
    filterValues,
    selectBpmValues,
    selectKeyValues,
    selectMoodsValues,
    selectGenresValues,
    isError,
    isSuccess,
    addFilterValue,
    addSelectBpmValues,
    addSelectKeyValues,
    addSelectMoodsValues,
    addSelectGenresValues,
  };
};
