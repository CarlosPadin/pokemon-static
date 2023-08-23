import Image from "next/image";
import NextLink from "next/link";
import { AppBar, Link, Stack, Typography } from "@mui/material";

const NavBar = () => {
  return (
    <div>
      <AppBar position="fixed" sx={{ padding: "1rem" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={2}
          alignItems="center"
        >
          <Stack direction="row" alignItems="center">
            <Image
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
              alt="icono de la app"
              width={90}
              height={90}
            />
            <NextLink href="/" style={{ textDecoration: 'none'}} passHref>
              <Link underline="none" color="inherit">
                <Typography variant="h3" color="white">
                  <b>P</b>okemon
                </Typography>
              </Link>
            </NextLink>
          </Stack>
          <NextLink href='/favorites' style={{ textDecoration: 'none'}} passHref>
            <Link underline="none" color="inherit" >
              <Typography variant="h6" color="white">Favoritos</Typography>
            </Link>
          </NextLink>
        </Stack>
      </AppBar>
    </div>
  );
};

export default NavBar;
