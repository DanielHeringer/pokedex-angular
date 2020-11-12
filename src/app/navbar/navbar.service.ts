import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { pokemon_types } from '../utils/enums.utils';
import { SearchOptions } from './../models/SearchOptions';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  _defaultSearchOptions: SearchOptions = {
    searchText: '',
    searchType: pokemon_types.all,
  };
  searchOptions = new BehaviorSubject(this._defaultSearchOptions);

  constructor() {}

  getSearchOptions(): Observable<SearchOptions> {
    return this.searchOptions.asObservable();
  }

  changeSearchOptions(searchOptions: SearchOptions) {
    this.searchOptions.next(searchOptions);
  }
}
