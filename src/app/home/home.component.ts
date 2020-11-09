import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/Pokemon';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService) { }

  allPokemons: Pokemon[];

  ngOnInit(): void {
    this.getAllPokemons()
  }

  getAllPokemons(){
    this.homeService.getAllPokemons().subscribe(pokemons =>{
      this.allPokemons = pokemons.results;
    })
  }
}
