import { useQuery } from "@tanstack/react-query";
import { getHeroesByPageAction } from "../actions/get-heroes-by-page.action";

/* Lo que hago es guardar en cache un objeto con toda la informacion que me devuelve la funcion de queryFn */
export const usePaginatedHero = (
  page: number,
  limit: number,
  category = "all"
) => {
  return useQuery({
    queryKey: ["heroes", category, { page, limit }],
    queryFn: () => getHeroesByPageAction(page, limit, category),
    staleTime: 1000 * 60 * 5,
  });
};
