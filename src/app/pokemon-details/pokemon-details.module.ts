import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { PokemonDetailsComponent } from './pokemon-details.component';
import { PokemonDetailsService } from './pokemon-details.service';
import { MoveDetailsComponent } from './move-details/move-details.component';
import { MoveDetailsService } from './move-details/move-details.service';
import { SubHyphenSpaceModule } from './../pipes/sub-hyphen-space/sub-hyphen-space.module';

@NgModule({
  declarations: [
    PokemonDetailsComponent,
    MoveDetailsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    SubHyphenSpaceModule
  ],
  providers: [
    PokemonDetailsService,
    MoveDetailsService
  ]
})
export class PokemonDetailsModule { }
