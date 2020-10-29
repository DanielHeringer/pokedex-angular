import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonListService } from './pokemon-list/pokemon-list.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent,
    PokemonListComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    PokemonListService
  ]
})
export class HomeModule { }
