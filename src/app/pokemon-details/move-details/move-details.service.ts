import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MoveDetails } from 'src/app/models/MoveDetails';

@Injectable({
  providedIn: 'root',
})
export class MoveDetailsService {
  constructor(private httpClient: HttpClient) {}

  getMoveDetail(url: string): Observable<MoveDetails> {
    return this.httpClient.get<MoveDetails>(url);
  }
}
