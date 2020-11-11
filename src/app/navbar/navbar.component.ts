import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NavbarService } from './navbar.service';
import { pokemon_types } from '../utils/enums.utils'
import { SearchOptions } from './../models/SearchOptions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  subject: Subject<any> = new Subject();

  searchOptions : SearchOptions = {
    searchText: '',
    searchType: pokemon_types.all
  }
  pokemonTypes = pokemon_types;

  constructor(private navbarService: NavbarService) { }

  ngOnInit(): void {
    this.subject.pipe(debounceTime(200))
    .subscribe(() => {
        this.changeSearchService();
      }
    );
  }

  onSearchTextChange(searchText:string){
    this.searchOptions.searchText = searchText
    this.subject.next(this.searchOptions);
  }

  onSearchTypeChange(searchType:pokemon_types){
    this.searchOptions.searchType = searchType
    this.subject.next(this.searchOptions);
  }

  changeSearchService(){
    this.navbarService.changeSearchOptions(this.searchOptions);
  }

  resetSearch(){
    this.searchOptions.searchText = '';
    this.searchOptions.searchType = pokemon_types.all;
    this.changeSearchService();
  }

}
