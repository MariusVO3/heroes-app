import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { Hero } from "../types/hero.interface";

// Interfaz que indica que propiedades y funciones debe tener
interface FavoriteHeroContext {
  // State
  favorites: Hero[];
  favoritesCount: number;

  // Methods
  isFavorite: (hero: Hero) => boolean;
  toggleFavorite: (hero: Hero) => void;
}

// Mi contexto
export const FavoriteHeroContext = createContext({} as FavoriteHeroContext);

// Recojo los datos del LocalStorage y luego inicializo con esto mi estado
const getFavoritesFromLocalStorage = (): Hero[] => {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
};

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Hero[]>(
    getFavoritesFromLocalStorage()
  );

  // Función que me marca o desmarca un favorito
  const toggleFavorite = (hero: Hero) => {
    const heroExist = favorites.find((h) => h.id === hero.id);

    if (heroExist) {
      setFavorites(favorites.filter((h) => h.id !== hero.id));
      return;
    }

    setFavorites([...favorites, hero]);
  };

  // Función que me indica si es un favorito
  const isFavorite = (hero: Hero) => {
    return favorites.some((h) => h.id === hero.id);
  };

  // Efecto que dipara el código cada vez que los favoritos cambian
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoriteHeroContext
      value={{
        // State
        favorites,
        favoritesCount: favorites.length,

        // Methods
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoriteHeroContext>
  );
};
