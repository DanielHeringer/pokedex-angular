import { Pokemon } from './Pokemon';

export class PokemonType {
  name: string;
  pokemons: Pokemon[];

  constructor(request: any) {
    this.name = request.name;
    let pokemons: Pokemon[] = [];
    for (let pokemonObj of request.pokemon) {
      pokemons.push(pokemonObj.pokemon);
    }
    this.pokemons = pokemons;
  }
}
