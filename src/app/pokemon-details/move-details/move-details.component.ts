import { Component, Input, OnInit } from '@angular/core';
import { MoveDetails } from './../../models/MoveDetails';
import { MoveDetailsService } from './move-details.service';

@Component({
  selector: 'app-move-details',
  templateUrl: './move-details.component.html',
  styleUrls: ['./move-details.component.scss'],
})
export class MoveDetailsComponent implements OnInit {
  @Input()
  moveUrl: string;
  loading: boolean = true;
  moveDetails: MoveDetails;

  constructor(private moveDetailsService: MoveDetailsService) {}

  ngOnInit(): void {
    this.moveDetailsService
      .getMoveDetail(this.moveUrl)
      .subscribe((moveDetails) => {
        this.moveDetails = new MoveDetails(moveDetails);
        this.loading = false;
      });
  }
}
