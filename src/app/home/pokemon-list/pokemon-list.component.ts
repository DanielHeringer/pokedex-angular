import { Component, HostListener, Input, OnInit } from '@angular/core';
import { PokemonListService } from './pokemon-list.service';
import { PokemonDetails } from '../../models/PokemonDetails';
import { Pokemon } from './../../models/Pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokemonList: Pokemon[] = [];
  allPokemons: Pokemon[] = [];
  pokemonsDetails: PokemonDetails[];
  pokemonDetails: PokemonDetails;

  pokemonImgLoading: boolean[] = [];
  loadingMore: boolean = true;

  limit: number = 80;
  offset: number = 0;
  maxPokemonNumber = 893;


  imgUrl = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/';
  // imgUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  constructor(private pokemonListService: PokemonListService) { }

  ngOnInit(): void {
    this.getPokemonList();
  }

  onScroll(): void {
    this.loadMore();
    if(this.offset < this.maxPokemonNumber){
      this.getPokemonList();
    }
  }

  getPokemonList(){
    this.loadingMore = true;
    this.pokemonListService.getPokemonList(this.limit, this.offset).subscribe( pokemonList => {
      for(let pokemon of pokemonList.results){
        this.pokemonList.push(pokemon);
      }
      for(let pokemon of pokemonList.results){
        this.pokemonImgLoading[pokemon.name] = true;
      }
      this.loadingMore = false;
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

  zeroPad(num: number, places: number) {
    let zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }

  getImageUrl(pokemonUrl:string) {
    const splittedUrl = pokemonUrl.split('/');
    const pokemonNumber = parseInt(splittedUrl[splittedUrl.length-2]);
    return this.imgUrl + this.zeroPad(pokemonNumber, 3) + '.png';
    // return this.imgUrl + pokemonNumber + '.png';
  }

  loadMore(){
    this.offset += this.limit;
    this.offset = this.offset > this.maxPokemonNumber ? this.maxPokemonNumber : this.offset;
    if(this.offset+this.limit > this.maxPokemonNumber){
      this.limit = this.maxPokemonNumber - this.offset;
    }
  }

}
