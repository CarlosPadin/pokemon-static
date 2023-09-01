import pokeApi from "@/api/pokeApi";
import { PokemonDetails } from "@/interfaces";

const getPokemonInfo = async (infoParam: string) => {

    const { data } = await pokeApi.get<PokemonDetails>(`/pokemon/${infoParam}`);
  
    return {
      id: data.id,
      name: data.name,
      sprites: data.sprites,
    }

}

export default getPokemonInfo;