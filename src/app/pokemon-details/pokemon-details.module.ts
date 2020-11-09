import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PokemonDetailsComponent } from './pokemon-details.component';
import { PokemonDetailsService } from './pokemon-details.service';
import { MoveDetailsComponent } from './move-details/move-details.component';
import { MoveDetailsService } from './move-details/move-details.service';
import { SubHyphenSpaceModule } from './../pipes/sub-hyphen-space/sub-hyphen-space.module';
import { EffectChancePipeModule } from './../pipes/effect-chance/effect-chance.module';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PokemonDetailsComponent,
    MoveDetailsComponent,
    ProfileDetailsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    SubHyphenSpaceModule,
    EffectChancePipeModule
  ],
  providers: [
    PokemonDetailsService,
    MoveDetailsService
  ]
})
export class PokemonDetailsModule { }
