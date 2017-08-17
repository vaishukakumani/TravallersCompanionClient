import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './Login/login.component';
import {UserHomeComponent} from './UserHome/UserHome.component';
import {CreateItinerary} from './Itineraries/createItinerary.component';
import {ViewItineraries} from './Itineraries/viewItineraries.component';
import {Forum} from './Forum/forum.component';
import {CreateDiscussion} from './Forum/createDiscussion.component';
import {ViewDiscussions} from './Forum/viewDisc.component';
import {AuthGuard} from './Guards/auth-guard.service';


const routes:Routes=[
    {path:'',component: LoginComponent},
    {path:'login',component: LoginComponent},
    {path:'UserHome',component: UserHomeComponent,canActivate: [AuthGuard],
        children:[{path:'createItinerary',component:CreateItinerary},
                    {path:'viewItineraries',component:ViewItineraries,canActivate: [AuthGuard]},
                    {path:'forum',component:Forum,canActivate:[AuthGuard],
                    children:[{path:'createDiscussion',component:CreateDiscussion,canActivate:[AuthGuard]},
                    {path:'viewDiscussion',component:ViewDiscussions,canActivate:[AuthGuard]}]}]
         }
    
//      {
//     path: '**',
//     redirectTo: '/login'
   
];

@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports:[
        RouterModule
    ]
    
})
export class AppRoutingModule{}
export const routingComponents=[LoginComponent,UserHomeComponent,CreateItinerary,ViewItineraries,Forum,CreateDiscussion,ViewDiscussions]
