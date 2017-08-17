import {Component,OnInit,ElementRef} from "@angular/core";
import {ItineraryService} from "../shared/services/itinerary.service";
import {Globals} from "../shared/globals";
import {FetchAirportsService} from '../shared/services/FetchAirports.service';
import {FetchLanguagesService} from '../shared/services/FetchLanguages.service';
import {Router,Route,ActivatedRoute} from '@angular/router';
import {FormGroup} from '@angular/forms';
@Component({
    selector: 'view-iti',
    templateUrl:'./viewItineraries.html',
    
})
export class ViewItineraries implements OnInit{
    itineraries=[];
    selectedItinerary:any;
    displayDetails:boolean;
    modify:boolean;
    formattedDate:any;
    selectedAirportIdx: number;
 selectedLanguageIdx:number;
 userId:any;
 userName:any;
 numbers=[0,1,2,3,4,5,6,7,8,9,10];
 public elementRef;
 temporary:any;
 allAirports=[];
 allLanguages=[];
 filteredAirports=[];
 filteredLanguages=[];
    createItineraryForm:FormGroup;
    
constructor(private itin_service:ItineraryService,private _route:ActivatedRoute,private _router: Router,private fetchAirports:FetchAirportsService, 
     private fetchLanguages:FetchLanguagesService,myElement: ElementRef){
     this.displayDetails=false;
     this.modify=false;
     this.elementRef=myElement;   
     this.selectedAirportIdx = -1;
     this.selectedLanguageIdx = -1;
     this.userId=localStorage.getItem('user_id');
     this.userName=localStorage.getItem('user_name');
     
}
ngOnInit( ) {
    
       this.itin_service.fetchItineraries(Number(this.userId)).subscribe((viewResponse)=>{this.itineraries=viewResponse});
    
       
  this.fetchAirports.getProcessTemplates()
     .subscribe(response=>{
       this.temporary = response.json();
       for(var i in this.temporary)
        this.allAirports.push(this.temporary[i].name+","+this.temporary[i].city);
     });

     this.fetchLanguages.getLanguages()
     .subscribe(response=>{
       this.temporary = response.json();
       for(var i in this.temporary)
         this.allLanguages.push(this.temporary[i].English);
     });
    
     
}
   

filterAirports(event: any) {
       
        if (this.selectedItinerary.departureAirport !== "") {
            this.filteredAirports = this.allAirports.filter(function (el) {
                return el.toLowerCase().indexOf(this.selectedItinerary.departureAirport.toLowerCase()) > -1;
            }.bind(this));
            if (event.code == "ArrowDown" && this.selectedAirportIdx < this.filteredAirports.length) {
                this.selectedAirportIdx++;
            } else if (event.code == "ArrowUp" && this.selectedAirportIdx > 0) {
                this.selectedAirportIdx--;
            }
        } else {
            this.filteredAirports = [];
        }
    }
     filterLanguages(event) {
       if (this.selectedItinerary.language !== "") {
            this.filteredLanguages = this.allLanguages.filter(function (el) {
                return el.toLowerCase().indexOf(this.selectedItinerary.language.toLowerCase()) > -1;
            }.bind(this));
            if (event.code == "ArrowDown" && this.selectedLanguageIdx < this.filteredLanguages.length) {
                this.selectedLanguageIdx++;
            } else if (event.code == "ArrowUp" && this.selectedLanguageIdx > 0) {
                this.selectedLanguageIdx--;
            }
        } else {
            this.filteredLanguages = [];
        }
    }
      selectLanguage(item){
    this.selectedItinerary.language = item;
    this.filteredLanguages = [];
    this.selectedLanguageIdx = -1;
}

    selectAirport(item){
    this.selectedItinerary.departureAirport = item;
    this.filteredAirports = [];
    this.selectedAirportIdx = -1;
}

handleClick(event){
   var clickedComponent = event.target;
   var inside = false;
   do {
       if (clickedComponent === this.elementRef.nativeElement) {
           inside = true;
       }
      clickedComponent = clickedComponent.parentNode;
   } while (clickedComponent);
    if(!inside){
        this.filteredAirports = [];
        this.filteredLanguages=[];
    }
}


handleClickDetails(i){
    console.log(i);
    this.modify=false;
    this.displayDetails=true;
    this.selectedItinerary=i;
    this.formattedDate=new Date(this.selectedItinerary.departureDate).toLocaleString();
    
}
handleClickModify(i){
    this.displayDetails=false;
    this.modify=true;
    this.selectedItinerary=i;
    this.formattedDate=new Date(this.selectedItinerary.departureDate);
    

}

onSubmit(modifyForm){
    var date=modifyForm.departureDate.toISOString();
    var obj={"departureAirport":modifyForm.departureAirport,
"departureDate": date,
"itineraryName":modifyForm.itiName,
"numberPeople":modifyForm.selectedNumber,
"language":modifyForm.userLanguage,
"itineraryId":this.selectedItinerary.itineraryId,
"user":{"userId":this.userId,
        "userName":this.userName,
        "firstName":null,
        "lastName":null,
        "password":"xxxx"}

}

this.itin_service.updateItinerary(obj).subscribe(response=>{alert("Your itinerary has been succesfully modified");
                                                             this.itin_service.fetchItineraries(this.userId).subscribe((viewResponse)=>{this.itineraries=viewResponse});
                                                            this.modify=false;},
                                                            error=>{alert(error+"//There was an error in modifying the itinerary.Please try again");});
}

}