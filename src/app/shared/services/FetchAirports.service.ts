import { Injectable} from '@angular/core';
import {Http,URLSearchParams,RequestOptions,Response } from '@angular/http';

@Injectable()
export class FetchAirportsService{
constructor(private http: Http) { }
   getProcessTemplates(){
       return this.http.get("/assets/airports.json");
   }
}


