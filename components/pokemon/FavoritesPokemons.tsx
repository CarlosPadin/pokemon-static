import { FC } from "react";

import FavoritesPokemonsCard from "./FavoritesPokemonsCard";
import { Grid } from "@mui/material";

interface Props {
    pokemonsIds: number[],
}

const FavoritesPokemons: FC<Props> = ({ pokemonsIds }) => {
  return (
    <Grid container>
      {pokemonsIds.map((id) => (
        <FavoritesPokemonsCard id={id} key={id} />
      ))}
    </Grid>
  );
};

export default FavoritesPokemons;
