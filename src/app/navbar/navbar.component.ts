import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  searchText: string;
  subject: Subject<string> = new Subject();

  constructor(private navbarService: NavbarService) { }

  ngOnInit(): void {
    this.subject.pipe(debounceTime(200))
    .subscribe(() => {
        this.changeSearchService();
      }
    );
  }

  onSearchChange(searchText:string){
    this.subject.next(searchText);
  }

  changeSearchService(){
    this.navbarService.changeSearchText(this.searchText);
  }

  resetSearch(){
    this.searchText = '';
    this.navbarService.changeSearchText(this.searchText);
  }

}
