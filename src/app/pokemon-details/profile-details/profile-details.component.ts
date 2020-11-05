import { Component, Input, OnInit } from '@angular/core';
import { PokemonDetails } from '../../models/PokemonDetails';
import { types_color_enum } from '../../utils/enums.utils'

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {

  @Input()
  pokemonDetails: PokemonDetails;
  imgUrl = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/';
  // imgUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';
  pokemonImgLoading: boolean = true;
  typesColor = types_color_enum;

  constructor() { }

  ngOnInit(): void {
  }


  getPokemonImg(id: number){
    return this.imgUrl + this.zeroPad(id, 3) + '.png';
  }
  zeroPad(num: number, places: number) {
    let zero = places - num?.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }


}
