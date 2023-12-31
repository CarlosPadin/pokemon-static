import Image from "next/image";
import NextLink from "next/link";
import { AppBar, Stack, Typography } from "@mui/material";

const NavBar = () => {
  return (
    <div>
      <AppBar position="fixed" sx={{ padding: "1% 3%" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={1}
          alignItems="center"
        >
          <Stack direction="row" alignItems="center">
            <Image
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
              alt="icono de la app"
              width={70}
              height={80}
            />
            <NextLink href="/" style={{ textDecoration: 'none'}} passHref>
                <Typography variant="h3" color="white">
                  <b>P</b>okemon
                </Typography>
            </NextLink>
          </Stack>
          <NextLink href='/favorites' style={{ textDecoration: 'none'}} passHref>
              <Typography variant="h6" color="white">Favoritos</Typography>
          </NextLink>
        </Stack>
      </AppBar>
    </div>
  );
};

export default NavBar;
