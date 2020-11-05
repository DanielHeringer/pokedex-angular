import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonListService } from './pokemon-list/pokemon-list.service';
import { SubHyphenSpaceModule } from './../pipes/sub-hyphen-space/sub-hyphen-space.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    HomeComponent,
    PokemonListComponent
  ],
  imports: [
  CommonModule,
    RouterModule,
    SubHyphenSpaceModule,
    InfiniteScrollModule
  ],
  providers: [
    PokemonListService
  ]
})
export class HomeModule { }
