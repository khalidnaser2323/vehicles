import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../interfaces/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private http: HttpClient) {

  }
  public getVehicles(): Observable<Vehicle[]> {
    let query = `query{
      articles(first:50,where:{isShowen:true},orderBy:publishDate_DESC){
        id,
        name,
        writer,
        caption,
        publishDate,
        publishTime,
        article,
        images,
        videos,
        isShowen
      }
    }`;

    return this.http.post<Vehicle[]>('http://159.100.130.43/api', { "query": query });
  }
}
