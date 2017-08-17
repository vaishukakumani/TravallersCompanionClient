import { Injectable} from '@angular/core';
import {Http,URLSearchParams,RequestOptions,Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
@Injectable()
export class ItineraryService{
    private _createItineraryUrl: string ="api/Itinerary";
    private _viewItineraryUrl:string="/api/Itinerary/viewItinerary";
    private _updateItineraryUrl:string="/api/Itinerary";
    params: URLSearchParams = new URLSearchParams();
   
   
    constructor(private _http: Http){}

    createItinerary(name:string,departureDate:Date,departureAirport:string,language:string,numberPeople:number,userId:number){
       var obj={"itineraryName":name,
                "departureDate":departureDate,
                "departureAirport":departureAirport,
                "language":language,
                "numberPeople":numberPeople,
                "user":{"userId":userId,
        "userName":"xxxx",
        "firstName":null,
        "lastName":null,
        "password":"xxxx"}
       };
      
   return this._http.put(this._createItineraryUrl, obj, new Headers({'Content-Type': 'application/json'})).map((response: Response)=> response.json()).catch((error: any) => {
                return Observable.throw(new Error(error.status));
                });
    }

    fetchItineraries(userId:Number){
        return this._http.post(this._viewItineraryUrl,userId).map((response:Response)=>response.json()).catch((error:any)=>Observable.throw(new Error(error.status)));
    }

    updateItinerary(itinerary:any){
        return this._http.put(this._updateItineraryUrl,itinerary,new Headers({'Content-Type':'application/json'})).map((response:Response)=>response.json()).catch((error:any)=>{
                                                                                                                            return Observable.throw(new Error(error.status));});
    }
    
}