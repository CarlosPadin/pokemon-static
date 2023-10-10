import { useState } from "react";

import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";

import confetti from 'canvas-confetti'

import pokeApi from "@/api/pokeApi";
import { localFavorites } from "@/utils";
import { PokemonDetails, PokemonListResponse } from "@/interfaces";
import Layout from "@/components/layouts/Layout";
import { Button, Card, Divider, Grid, Stack, Typography, capitalize } from "@mui/material";
import getPokemonInfo from "@/utils/getPokemonInfo";

interface Props {
  pokemon: PokemonDetails;
}

const PokemonNamePage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(
    localFavorites.existInFavorites(pokemon.id)
  );

  const onToggleFavorites = () => {
    localFavorites.toggleFavorites(pokemon.id);
    setIsInFavorites(!isInFavorites);

    if (!isInFavorites) {
      return confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle: -100,
        origin: {
          x: 1,
          y: 0,
        }
      })
    }
  };
  
  

  return (
    <Layout
      title={
        "PokemonApp | " +
        capitalize(pokemon.name)
      }
    >
      <Grid
        container
        spacing={1}
        sx={{ padding: "7rem", alignItems: "center" }}
      >
        <Grid item xs={12} sm={4}>
          <Image
            src={
              pokemon.sprites.other?.["official-artwork"].front_default ||
              "/no-image.png"
            }
            width={470}
            height={470}
            alt={pokemon.name + "image"}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Card sx={{ padding: 2 }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h2">
                {pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}
              </Typography>
              <Button
                variant={isInFavorites ? "contained" : "outlined"}
                color="info"
                onClick={onToggleFavorites}
              >
                <Typography variant="button">{isInFavorites ? 'En Favoritos' : 'Guardar en Favoritos'}</Typography>
              </Button>
            </Stack>
            <Divider
              variant="fullWidth"
              orientation="horizontal"
              sx={{ marginBottom: "2rem" }}
            />
            <Typography variant="h5">Sprites: </Typography>
            <Stack direction="row" justifyContent="center" spacing={5}>
              <Image
                src={pokemon.sprites.front_default}
                width={70}
                height={70}
                alt="front_default"
              />
              <Image
                src={pokemon.sprites.back_default}
                width={70}
                height={70}
                alt="back_default"
              />
              <Image
                src={pokemon.sprites.front_shiny}
                width={70}
                height={70}
                alt="front_shiny"
              />
              <Image
                src={pokemon.sprites.back_shiny}
                width={70}
                height={70}
                alt="back_shiny"
              />
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon?limit=101`);
  const pokemonsNames: string[] = data.results.map(pokemon => pokemon.name);

  return {
    paths: pokemonsNames.map((name) => ({
      params: { name },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  //Params viene de ctx.params
  const { name } = params as { name: string }; // Para no definir tantas cosas en TS

  const pokemon = await getPokemonInfo(name);

  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      pokemon,
    },
    revalidate: 84600,
  };
};

export default PokemonNamePage;
