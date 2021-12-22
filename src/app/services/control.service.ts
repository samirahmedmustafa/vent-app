import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  constructor(private service: HttpClient) { }

  changeState(state: number): Observable<string> {
    return this.service.get<string>(`/api/led/?state=${state}`);
  }

  getTemp(): Observable<{"ambient": number, "object_1": number}> {
    return this.service.get<{"ambient": number, "object_1": number}>(`/api/temp/`);
  }

}
