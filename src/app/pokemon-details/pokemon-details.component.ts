import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonDetailsService } from './pokemon-details.service';
import { PokemonDetails } from '../models/PokemonDetails';
import {
  style,
  state,
  animate,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
  animations: [
    trigger('slideIn', [
      state('*', style({ overflow: 'hidden' })),
      state('void', style({ overflow: 'hidden' })),
      transition('* => void', [
        style({ height: '*' }),
        animate(250, style({ height: 0 })),
      ]),
      transition('void => *', [
        style({ height: '0' }),
        animate(250, style({ height: '*' })),
      ]),
    ]),
  ],
})
export class PokemonDetailsComponent implements OnInit {
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
  getPokemonDetails(name: string) {
    return this.pokemonDetailsService
      .getPokemonByName(name)
      .subscribe((_pokemonDetails: PokemonDetails) => {
        this.pokemonDetails = new PokemonDetails(_pokemonDetails);
        for (let move of this.pokemonDetails.moves) {
          this.moveCollapse[move.move.name] = false;
        }
      });
  }
}
