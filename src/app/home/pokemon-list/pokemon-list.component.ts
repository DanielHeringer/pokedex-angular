import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from './../../models/pokemon';
import { PokemonListService } from './pokemon-list.service';
import { PokemonDetails } from './../../models/pokemonDetails';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokemons: Pokemon[];
  pokemonsDetails: PokemonDetails[];
  pokemonsRowsNumber: number;
  pokemonsRows: number[];
  pokemonsPerRows: number = 11;
  pokemonDetails: PokemonDetails;

  pokemonImgLoading: boolean[] = [];

  @Input()
  limit: number


  imgUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  // imgUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';

  constructor(private pokemonListService: PokemonListService) { }

  ngOnInit(): void {
    this.getPokemonList();
  }

  getPokemonList(){
    this.pokemonListService.getPokemonList(this.limit).subscribe( pokemonList => {
      this.pokemons = pokemonList.results
      this.pokemonsRows = this.definePokemonRows(Math.ceil(this.pokemons.length /this.pokemonsPerRows));
      for(let pokemon of this.pokemons){
        this.pokemonImgLoading[pokemon.name] = true;
      }
    });
  }

  disableLoading(pokemonName: string){
    this.pokemonImgLoading[pokemonName]=false
  }

  getVisibility(pokemonName: string){
    if(this.pokemonImgLoading[pokemonName]){
      return 'collapse';
    } else{
      return 'visible';
    }
  }

  definePokemonRows(rowsNumber: number){
    const rows: number[] = []
    for(let i=0;i<rowsNumber; i++){
      rows.push(i);
    }
    return rows;
  }

  zeroPad(num: number, places: number) {
    let zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }

  getImageUrl(pokemonUrl:string) {
    const splittedUrl = pokemonUrl.split('/');
    const pokemonNumber = parseInt(splittedUrl[splittedUrl.length-2]);
    // return this.imgUrl + this.zeroPad(pokemonNumber, 3) + '.png';
    return this.imgUrl + pokemonNumber + '.png';
  }

}
