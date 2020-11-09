import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  searchText = new BehaviorSubject('');

  constructor() { }

  getSearchText(): Observable<string>{
    return this.searchText.asObservable();
  }

  changeSearchText(searchText: string){
    this.searchText.next(searchText);
  }
}
