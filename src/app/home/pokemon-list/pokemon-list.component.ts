import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PokemonListService } from './pokemon-list.service';
import { Pokemon, PokemonList } from './../../models/Pokemon';
import { Subscription } from 'rxjs';
import { NavbarService } from './../../navbar/navbar.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit, OnDestroy {

  @Input()
  allPokemons: Pokemon[];

  pokemonList: Pokemon[] = [];
  pokemonImgLoading: boolean[] = [];
  loadingMore: boolean = true;

  limit: number = 80;
  offset: number = 0;
  maxPokemonNumber = 893;

  searchText: string = '';
  searchTextSubscription: Subscription;


  imgUrl = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/';

  constructor(private pokemonListService: PokemonListService,
          private navbarService: NavbarService) { }

  ngOnInit(): void {
    this.getPokemonList();
    this.searchTextSubscription = this.navbarService.getSearchText().subscribe((textSearch) =>{
      this.searchText = textSearch;
      this.searchPokemon();
    })

  }

  onScroll(): void {
    this.loadMore();
    if(this.offset < this.maxPokemonNumber && this.searchText === ''){
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

  searchPokemon(){
    console.log(this.searchText)
    if(this.searchText == ''){
      this.pokemonList = [];
      this.resetOffset();
      this.getPokemonList();
    }
    else{
      this.pokemonList = [];
      this.pokemonListService.getAllPokemons().subscribe( allPokemons => {
        for(let pokemon of allPokemons.results){
          if(pokemon.name.search(this.searchText) != -1){
            this.pokemonList.push(pokemon);
          }
        }
      })
    }
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
  }

  loadMore(){
    this.offset += this.limit; //adiciona limit ao offset
    this.offset = this.offset > this.maxPokemonNumber ? this.maxPokemonNumber : this.offset;
    if(this.offset+this.limit > this.maxPokemonNumber){
      this.limit = this.maxPokemonNumber - this.offset;
    }
  }

  resetOffset(){
    this.offset = 0;
  }

  ngOnDestroy(): void {
    this.searchTextSubscription.unsubscribe();
  }
}
