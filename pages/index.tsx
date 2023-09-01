import { GetStaticProps, NextPage } from "next";

import pokeApi from "@/api/pokeApi";
import { Grid } from "@mui/material";
import { Poke, PokemonListResponse } from "@/interfaces";
import Layout from "../components/layouts/Layout";
import PokemonCard from "../components/pokemon/PokemonCard";

interface Props {
  pokemons: Poke[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Pokemon App">
      <Grid container spacing={3} sx={{ padding: "10rem 7rem" }}>
        {pokemons.map((pokemon) => (
          <Grid item key={pokemon.id} xs={6} sm={4} md={3} lg={2}>
            <PokemonCard pokemon={pokemon} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=101");
  const pokemons: Poke[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
      i + 1
    }.png`,
  }));

  return {
    props: {
      pokemons,
    },
  };
};
