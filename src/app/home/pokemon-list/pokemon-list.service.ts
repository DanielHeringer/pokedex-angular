import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { PokemonList } from '../../models/Pokemon';
import { PokemonType } from '../../models/PokemonTypes';
import { pokemon_types } from 'src/app/utils/enums.utils';

@Injectable({
  providedIn: 'root',
})
export class PokemonListService {
  baseUrl = 'https://pokeapi.co/api/v2/'; // api rest
  pokemons = [];
  maxPokemonNumber = 893;

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) {}

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getPokemonList(limit: number, offset: number): Observable<PokemonList> {
    return this.httpClient.get<PokemonList>(
      this.baseUrl + 'pokemon?limit=' + limit + '&offset=' + offset
    );
  }

  getAllPokemons() {
    return this.httpClient.get<PokemonList>(
      this.baseUrl + 'pokemon?limit=' + this.maxPokemonNumber
    );
  }

  getPokemonsByType(type: pokemon_types): Observable<PokemonType> {
    return this.httpClient.get<PokemonType>(this.baseUrl + 'type/' + type);
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
