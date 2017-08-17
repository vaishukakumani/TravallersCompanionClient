import {Component,Input,OnInit} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {Globals} from '../shared/globals';
@Component({
    selector: 'user-home',
    templateUrl: './UserHome.html'

})
 export class UserHomeComponent{
    
   // userName:String;
   
    constructor(private route: ActivatedRoute,private globals: Globals,private _router:Router) {}
    userId=localStorage.getItem('user_id');
    userName=localStorage.getItem('user_name');
    createItineraryUrl="/UserHome/createItinerary";

    
}