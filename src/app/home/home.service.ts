import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonList } from './../models/Pokemon';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  baseUrl = 'https://pokeapi.co/api/v2/'; // api rest
  limit = 893;

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) {}

  getAllPokemons() {
    return this.httpClient.get<PokemonList>(
      this.baseUrl + 'pokemon?limit=' + this.limit + '&offset=0'
    );
  }
}
