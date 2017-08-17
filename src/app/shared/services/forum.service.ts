import { Injectable} from '@angular/core';
import {Http,URLSearchParams,RequestOptions,Response,Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {TOKEN_NAME} from '../auth.constants';
@Injectable()
export class ForumService{
     
 
    constructor(private _http: Http){}
     headers = new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN_NAME),'Content-Type': 'application/json'});
    createDiscussion(discussion:any){
       return this._http.post("/api/forum/discussion", discussion, this.headers).map((response: Response)=> response.json()).catch((error: any) => {
                return Observable.throw(new Error(error.status));
                });  
    }
    getDiscussion(){
        return this._http.get("api/forum/discussion",this.headers).map((response: Response)=> response.json()).catch((error: any) => {
                return Observable.throw(new Error(error.status));
                });
    }

}