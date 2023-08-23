import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import pokeApi from "@/api/pokeApi";
import { PokemonDetails } from "@/interfaces";

import Layout from "@/components/layouts/Layout";
import {
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

interface Props {
  pokemon: PokemonDetails;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const router = useRouter();

  const onClickHandler = () => {
    router.push("/");
  };

  return (
    <Layout
      title={
        "PokemonApp | " +
        pokemon.name[0].toUpperCase() +
        pokemon.name.substring(1)
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
                  variant="contained"
                  color="info"
                  onClick={onClickHandler}
                >
                  <Typography variant="button">+ Favoritos</Typography>
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
  const pokemons101 = [...Array(151)].map((value, index) => `${index + 1}`);

  return {
    paths: pokemons101.map((id) => ({
      params: { id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  //Params viene de ctx.params
  const { id } = params as { id: string }; // Para no definir tantas cosas en TS

  const { data } = await pokeApi.get<PokemonDetails>(`/pokemon/${id}`);

  return {
    props: {
      pokemon: data,
    },
  };
};

export default PokemonPage;
