import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonListService } from './pokemon-list/pokemon-list.service';
import { SubHyphenSpaceModule } from './../pipes/sub-hyphen-space/sub-hyphen-space.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HomeService } from './home.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    PokemonListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SubHyphenSpaceModule,
    InfiniteScrollModule,
  ],
  providers: [
    PokemonListService,
    HomeService
  ]
})
export class HomeModule { }
