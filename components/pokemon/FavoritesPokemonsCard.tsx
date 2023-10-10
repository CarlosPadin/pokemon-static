import { FC } from 'react';

import { useRouter } from 'next/router';
import { Grid, Card, CardActionArea, CardMedia, CardContent, Stack, Typography, Divider } from "@mui/material";

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
              {/* <Divider>-</Divider> */}
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default FavoritesPokemonsCard;
