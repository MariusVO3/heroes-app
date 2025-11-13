import { useQuery } from "@tanstack/react-query";
import { getHero } from "../actions/get-hero.action";

export const useHeroPage = (idSlug: string) => {
  return useQuery({
    queryKey: ["hero-page", idSlug],
    queryFn: () => getHero(idSlug),
    staleTime: 1000 * 60 * 5,
  });
};
