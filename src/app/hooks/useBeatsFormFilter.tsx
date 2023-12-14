import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useBeatsFormFilter = () => {
  const queryClient = useQueryClient();

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
  const addSelectBpmValues = (value: string) => {
    queryClient.setQueryData(
      ["selectBpmValues"],
      (prevValues: Set<string> | undefined) => {
        const updatedValues = prevValues ? new Set(prevValues) : new Set();
        updatedValues.add(value);
        return updatedValues;
      }
    );
  };
  const addSelectKeyValues = (value: string) => {
    queryClient.setQueryData(
      ["selectKeyValues"],
      (prevValues: Set<string> | undefined) => {
        const updatedValues = prevValues ? new Set(prevValues) : new Set();
        updatedValues.add(value);
        return updatedValues;
      }
    );
  };
  const addSelectMoodsValues = (value: string) => {
    queryClient.setQueryData(
      ["selectMoodsValues"],
      (prevValues: Set<string> | undefined) => {
        const updatedValues = prevValues ? new Set(prevValues) : new Set();
        updatedValues.add(value);
        return updatedValues;
      }
    );
  };
  const addSelectGenresValues = (value: string) => {
    queryClient.setQueryData(
      ["selectGenresValues"],
      (prevValues: Set<string> | undefined) => {
        const updatedValues = prevValues ? new Set(prevValues) : new Set();
        updatedValues.add(value);
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
    addFilterValue,
    addSelectBpmValues,
    addSelectKeyValues,
    addSelectMoodsValues,
    addSelectGenresValues,
  };
};
