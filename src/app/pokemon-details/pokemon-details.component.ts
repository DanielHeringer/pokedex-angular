import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonDetailsService } from './pokemon-details.service';
import { PokemonDetails } from './../models/pokemonDetails';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  imgUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';
  pokemonName: string;
  pokemonDetails: PokemonDetails;

  moveCollapse: boolean[] = [];

  constructor(
    private pokemonDetailsService: PokemonDetailsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.pokemonName = this.activatedRoute.snapshot.paramMap.get('name');
    this.getPokemonDetails(this.pokemonName);
  }
  getPokemonDetails(name: string){
    return this.pokemonDetailsService.getPokemonByName(name).subscribe((_pokemonDetails: PokemonDetails) => {
      this.pokemonDetails = new PokemonDetails(_pokemonDetails);
      for(let move of this.pokemonDetails.moves){
        this.moveCollapse[move.move.name] = false;
      }
      console.log(this.pokemonDetails)
    });
  }

}
