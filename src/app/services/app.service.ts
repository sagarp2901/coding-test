import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient) {}

  getMetaData() {
    return this.http.get('../../assets/entityMeta.json');
  }

  getData() {
    return this.http.get('../../assets/entityData.json');
  }
}
