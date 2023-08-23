export interface PokemonListResponse {
    count:    number;
    next?:     string;
    previous?: string;
    results:  Poke[];
}

export interface Poke {
    name: string;
    url:  string;
    id: number;
    img: string;
}
