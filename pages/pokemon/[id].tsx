import { useState } from "react";

import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";

import confetti from "canvas-confetti";

import { localFavorites } from "@/utils";
import { PokemonDetails } from "@/interfaces";
import Layout from "@/components/layouts/Layout";
import {
  Button,
  Card,
  Divider,
  Grid,
  Stack,
  Typography,
  capitalize,
} from "@mui/material";
import getPokemonInfo from "@/utils/getPokemonInfo";

interface Props {
  pokemon: PokemonDetails;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
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
        },
      });
    }
  };

  return (
    <Layout title={"PokemonApp | " + capitalize(pokemon.name)}>
      <Grid
        container
        spacing={1}
        sx={{ paddingY: "7rem", paddingX: "3%", alignItems: "center" }}
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
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Typography variant="h4">{capitalize(pokemon.name)}</Typography>
              <Button
                variant={isInFavorites ? "contained" : "outlined"}
                color="info"
                onClick={onToggleFavorites}
              >
                <Typography variant="button">
                  {isInFavorites ? "En Favoritos" : "Guardar en Favoritos"}
                </Typography>
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
  const pokemons101 = [...Array(101)].map((value, index) => `${index + 1}`);

  return {
    paths: pokemons101.map((id) => ({
      params: { id },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  //Params viene de ctx.params
  const { id } = params as { id: string }; // Para no definir tantas cosas en TS

  const pokemon = await getPokemonInfo(id);

  if (!pokemon) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      pokemon,
    },
    revalidate: 86400, //60*60*24
  };
};

export default PokemonPage;
