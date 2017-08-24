import {Component,Input,OnInit} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {Globals} from '../shared/globals';
import {UserLoginService} from '../shared/services/userLogin.service';
@Component({
    selector: 'user-home',
    templateUrl: './UserHome.html'

})
 export class UserHomeComponent implements OnInit{
    
   // userName:String;
  
    constructor(private route: ActivatedRoute,private globals: Globals,private _router:Router,private userLoginSrvc:UserLoginService) {
      
       
    }
    ngOnInit(){
          if(localStorage.getItem("index")!="1"){
           localStorage.setItem("index","1");
           console.log("entered ngInit");
       location.reload();
        }
    }
    userId=localStorage.getItem('user_id');
    userName=localStorage.getItem('user_name');
    createItineraryUrl="/UserHome/createItinerary";
    logOut(){
        this.userLoginSrvc.logout();
    }
    
}