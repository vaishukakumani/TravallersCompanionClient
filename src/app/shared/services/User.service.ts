import { Injectable} from '@angular/core';
import {Http,URLSearchParams,RequestOptions,Response } from '@angular/http';

import 'rxjs/add/operator/map';
@Injectable()
export class UserService{
    private _url: string ="api/login/checkUser";
    params: URLSearchParams = new URLSearchParams();
    requestOptions = new RequestOptions();
   
    constructor(private _http: Http){}
    getUser(){
        return {"userName":"vaishnavi"};
    }
    checkUser(userName: string,password: string){
        
        this.params.set('userName',userName);
        this.params.set('password', password);
        this.requestOptions.search = this.params;
        return this._http.get(this._url,this.requestOptions).map((response: Response)=> response.json());
                                                                                 
         
    
    }
}