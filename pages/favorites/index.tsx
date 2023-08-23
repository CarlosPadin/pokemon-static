import Layout from "@/components/layouts/Layout"
import { Stack } from "@mui/material"
import { NextPage } from "next"

const index: NextPage = () => {
  return (
    <Layout title={"PokemonApp | Favorites"} >
        <Stack sx={{ marginTop: '10rem' }} >
            <h1>Favorites</h1>
        </Stack>
    </Layout>
  )
}

export default index
