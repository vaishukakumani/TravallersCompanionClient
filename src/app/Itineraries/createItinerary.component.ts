import {Component, OnInit,ElementRef} from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {Router} from '@angular/router';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import {FetchAirportsService} from '../shared/services/FetchAirports.service';
import {FetchLanguagesService} from '../shared/services/FetchLanguages.service';
import {ItineraryService} from '../shared/services/itinerary.service';
import {Globals} from '../shared/globals';
import {Pipe,PipeTransform} from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
@Component({
    selector: 'create-Itinerary',
     host: {
        '(document:click)': 'handleClick($event)',
    },
    templateUrl:'./createItinerary.html'
})
export class CreateItinerary implements OnInit{
  createItineraryForm:FormGroup;
    departureDate:Date
   options= new DatePickerOptions();
   temporary:any;
   allAirports=[];
   filteredAirports=[]; 
   public elementRef;
   selectedAirport='';
   allLanguages=[];
   filteredLanguages=[];
   numbers=[1,2,3,4,5,6,7,8,9,10];
   selectedNumber:Number;
   selectedLanguage:string;
   selectedAirportIdx: number;
 selectedLanguageIdx:number;
   constructor(    
     private fetchAirports:FetchAirportsService, 
     private fetchLanguages:FetchLanguagesService,
     private itineraryService:ItineraryService,
     private globals: Globals,
     private _router: Router,
     myElement: ElementRef
      ){this.elementRef=myElement;   this.selectedAirportIdx = -1;this.selectedLanguageIdx = -1;}
   ngOnInit( ) {
      
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
       
        if (this.selectedAirport !== "") {
            this.filteredAirports = this.allAirports.filter(function (el) {
                return el.toLowerCase().indexOf(this.selectedAirport.toLowerCase()) > -1;
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
       if (this.selectedLanguage !== "") {
            this.filteredLanguages = this.allLanguages.filter(function (el) {
                return el.toLowerCase().indexOf(this.selectedLanguage.toLowerCase()) > -1;
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
    this.selectedLanguage = item;
    this.filteredLanguages = [];
    this.selectedLanguageIdx = -1;
}

    selectAirport(item){
    this.selectedAirport = item;
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

     onSubmit(value:any,createItineraryForm:any){
        this.itineraryService.createItinerary(value.itiName,value.departureDate,this.selectedAirport,this.selectedLanguage,value.selectedNumber,Number(localStorage.getItem('user_id'))).subscribe(createItineraryResponse=>{
                                                                                                                                                         
                                                                                        alert("Your itinerary has been created");
                                                                                        createItineraryForm.resetForm();
                                                                                       // this._router.navigate([createItineraryUrl]);
                                                                                    
                                                                                   
                                                                                       createItineraryForm.resetForm();
        },error=>{alert(error+"//Please try again");createItineraryForm.resetForm();});
   
      
               
    }
}