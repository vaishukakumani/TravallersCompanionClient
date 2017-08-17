import { Injectable} from '@angular/core';
import {Http,URLSearchParams,RequestOptions,Response } from '@angular/http';

@Injectable()
export class FetchLanguagesService{
constructor(private http: Http) { }
   getLanguages(){
       return this.http.get("/assets/languages.json");
   }
}