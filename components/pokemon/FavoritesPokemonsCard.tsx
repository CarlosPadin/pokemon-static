import { FC } from 'react';

import { Grid, Card, CardActionArea, CardMedia, CardContent, Stack, Typography, Divider } from "@mui/material";
import { useRouter } from 'next/router';

interface Props {
    id: number,
}

const FavoritesPokemonsCard: FC<Props> = ({ id }) => {
  const route = useRouter();

  const onFavoriteClick = () => {
    route.push(`/pokemon/${id}`);
  }

  return (
    <Grid item xs={6} sm={3} md={2} lg={1}>
      <Card sx={{ width: 150 }}>
        <CardActionArea onClick={onFavoriteClick}>
          <CardMedia
            component="img"
            height={150}
            alt="pokemon pic"
            image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
          />
          <CardContent>
            <Stack direction="row" justifyContent="center" alignItems="center">
              <Typography variant="button">{id}</Typography>
              <Divider>-</Divider>
              {/* <Typography variant="h6">
                          {pokemon.name[0].toUpperCase() +
                            pokemon.name.substring(1)}
                        </Typography> */}
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default FavoritesPokemonsCard;
