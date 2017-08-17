import { Component } from '@angular/core';
import {UserService} from './shared/services/User.service';
import {FetchAirportsService} from './shared/services/FetchAirports.service';
import {FetchLanguagesService} from './shared/services/FetchLanguages.service';
import {ItineraryService} from './shared/services/itinerary.service';
import {ForumService} from './shared/services/forum.service';

import {Globals} from './shared/globals';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService,Globals,FetchAirportsService,FetchLanguagesService,ItineraryService,ForumService]
})
export class AppComponent {
  
  title = "Traveller's Companion"; 
  
 
}
