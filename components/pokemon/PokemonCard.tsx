import { FC } from "react";
import { useRouter } from "next/router";
import { Poke } from "@/interfaces";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

interface Props {
  pokemon: Poke
}

const PokemonCard: FC<Props> = ({ pokemon }) => {
 const router = useRouter();

 const onClickHandler = () => {
  router.push(`/pokemon/${pokemon.id}`);
 }

  return (
    <Card sx={{ width: 200 }}>
      <CardActionArea onClick={onClickHandler}>
      <CardMedia component='img' height={200} alt="pokemon pic" image={pokemon.img} />
        <CardContent>
          <Stack direction="row" justifyContent="center" alignItems="center">
            <Typography variant="button">{pokemon.id}</Typography>
            <Divider>-</Divider>
            <Typography variant="h6">
              {pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PokemonCard;
