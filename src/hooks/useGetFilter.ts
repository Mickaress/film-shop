// function for get filter from query params

import { useSearchParams } from "next/navigation";

export const useGetFilter = () => {
  const searchParams = useSearchParams();
  const filter = {
    title: searchParams.get("title") || "",
    genre: searchParams.getAll("genre[]"),
    country: searchParams.getAll("country[]"),
    year_start: searchParams.get("year_start"),
    year_end: searchParams.get("year_end"),
    page: searchParams.get("page") || "1",
  };

  return filter;
};
