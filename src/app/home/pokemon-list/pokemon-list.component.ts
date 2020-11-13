import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PokemonListService } from './pokemon-list.service';
import { Pokemon, PokemonList } from './../../models/Pokemon';
import { Subscription } from 'rxjs';
import { NavbarService } from './../../navbar/navbar.service';
import { SearchOptions } from './../../models/SearchOptions';
import { pokemon_types } from 'src/app/utils/enums.utils';
import { PokemonType } from './../../models/PokemonTypes';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
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

  searchOptions: SearchOptions;
  searchOptionsSubscription: Subscription;

  imgUrl = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/';

  constructor(
    private pokemonListService: PokemonListService,
    private navbarService: NavbarService
  ) {}

  ngOnInit(): void {
    this.searchOptionsSubscription = this.navbarService
      .getSearchOptions()
      .subscribe((_searchOptions) => {
        this.searchOptions = _searchOptions;
        this.searchPokemon();
      });
  }

  onScroll(): void {
    this.loadMore();
    if (
      this.offset < this.maxPokemonNumber &&
      this.searchOptions.searchText === '' &&
      this.searchOptions.searchType == pokemon_types.all
    ) {
      this.getPokemonList();
    }
  }

  getPokemonList() {
    this.loadingMore = true;
    this.pokemonListService
      .getPokemonList(this.limit, this.offset)
      .subscribe((pokemonList) => {
        for (let pokemon of pokemonList.results) {
          this.pokemonList.push(pokemon);
        }
        for (let pokemon of pokemonList.results) {
          this.pokemonImgLoading[pokemon.name] = true;
        }
        this.loadingMore = false;
      });
  }

  searchPokemon() {
    this.pokemonList = [];
    if (
      this.searchOptions.searchText == '' &&
      this.searchOptions.searchType == pokemon_types.all
    ) {
      this.resetOffset();
      this.getPokemonList();
    } else {
      if (this.searchOptions.searchType == pokemon_types.all) {
        this.pokemonListService.getAllPokemons().subscribe((allPokemons) => {
          for (let pokemon of allPokemons.results) {
            if (pokemon.name.search(this.searchOptions.searchText) != -1) {
              this.pokemonList.push(pokemon);
            }
          }
        });
      } else {
        this.pokemonListService
          .getPokemonsByType(this.searchOptions.searchType)
          .subscribe((pokemonTypeRequest) => {
            let pokemonType = new PokemonType(pokemonTypeRequest);
            for (let pokemon of pokemonType.pokemons) {
              if (pokemon.name.search(this.searchOptions.searchText) != -1) {
                if (this.getIdFromUrl(pokemon.url) < 893) {
                  this.pokemonList.push(pokemon);
                }
              }
            }
          });
      }
    }
  }

  disableLoading(pokemonName: string) {
    this.pokemonImgLoading[pokemonName] = false;
  }

  getIdFromUrl(url: string): number {
    let splittedUrl = url.split('/');
    let id = splittedUrl[splittedUrl.length - 2];
    return parseInt(id);
  }

  getVisibility(pokemonName: string) {
    if (this.pokemonImgLoading[pokemonName]) {
      return 'collapse';
    } else {
      return 'visible';
    }
  }

  zeroPad(num: number, places: number) {
    let zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join('0') + num;
  }

  getImageUrl(pokemonUrl: string) {
    const splittedUrl = pokemonUrl.split('/');
    const pokemonNumber = parseInt(splittedUrl[splittedUrl.length - 2]);
    return this.imgUrl + this.zeroPad(pokemonNumber, 3) + '.png';
  }

  loadMore() {
    this.offset += this.limit; //adiciona limit ao offset
    this.offset =
      this.offset > this.maxPokemonNumber ? this.maxPokemonNumber : this.offset;
    if (this.offset + this.limit > this.maxPokemonNumber) {
      this.limit = this.maxPokemonNumber - this.offset;
    }
  }

  resetOffset() {
    this.offset = 0;
  }

  ngOnDestroy(): void {
    this.searchOptionsSubscription.unsubscribe();
  }
}
