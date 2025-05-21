import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getFormOptions } from "../services/filterService";
import { FilterOptionsResponse } from "../types/model/FilterOptionsResponse";

export const useFilterOptions = () => {
  return useQuery<FilterOptionsResponse>({
    queryKey: ["filter-options"],
    queryFn: () => getFormOptions(),
    placeholderData: keepPreviousData,
  });
};
