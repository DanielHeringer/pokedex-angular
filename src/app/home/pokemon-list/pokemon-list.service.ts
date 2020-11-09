import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { PokemonList } from '../../models/Pokemon';
import { PokemonType } from '../../models/PokemonTypes';

@Injectable({
  providedIn: 'root'
})
export class PokemonListService {

  baseUrl = 'https://pokeapi.co/api/v2/'; // api rest
  pokemonTypes = ["bug","dark","dragon","electric",
                  "fairy","fighting","flying","ghost",
                  "ground","normal","grass" ,"fire","poison",
                  "psychic","rock", "steel","ice","water"];
  pokemons = [];
  maxPokemonNumber = 893;

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getPokemonList(limit: number, offset: number): Observable<PokemonList>{
    return this.httpClient.get<PokemonList>(this.baseUrl + 'pokemon?limit='+ limit + '&offset=' + offset);
  }

  getAllPokemons(){
    return this.httpClient.get<PokemonList>(this.baseUrl + 'pokemon?limit='+ this.maxPokemonNumber);
  }

  getAllPokemon

  getTypeByName(typeName: string): Observable<PokemonType>{
    return this.httpClient.get<PokemonType>(this.baseUrl + 'type/' + typeName);
  }

  getAllTypes(): Observable<PokemonType>[]{
    let types = [];
    for(let typeName of this.pokemonTypes){
      types[typeName] = this.getTypeByName(typeName);
    }
    console.log(types)
    return types
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
