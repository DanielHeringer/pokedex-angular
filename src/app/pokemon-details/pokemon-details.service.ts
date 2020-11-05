import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonDetails } from '../models/PokemonDetails';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonDetailsService {

  baseUrl = 'https://pokeapi.co/api/v2/'; // api rest

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  getPokemonByName(name: string): Observable<PokemonDetails>{
    return this.httpClient.get<PokemonDetails>(this.baseUrl + 'pokemon/' + name);
  }
}
