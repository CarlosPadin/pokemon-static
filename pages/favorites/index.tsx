import { useState, useEffect } from "react";

import { Stack } from "@mui/material";
import Layout from "@/components/layouts/Layout";
import NoFavorites from "@/components/ui/NoFavorites";
import { localFavorites } from "@/utils";
import FavoritesPokemons from "@/components/pokemon/FavoritesPokemons";

const FavoritesPage = () => {
  const [favoritesPokemons, setfavoritesPokemons] = useState<number[]>([]);

  useEffect(() => {
    setfavoritesPokemons(localFavorites.pokemons());
  }, []);

  return (
    <Layout title={"PokemonApp | Favorites"}>
      <Stack sx={{ marginTop: "10rem", paddingX: "3rem" }}>
        {favoritesPokemons.length === 0 ? (
          <NoFavorites />
        ) : (
          <FavoritesPokemons pokemonsIds={favoritesPokemons} />
        )}
      </Stack>
    </Layout>
  );
};

export default FavoritesPage;
