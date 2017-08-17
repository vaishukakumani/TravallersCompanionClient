import {Component,OnInit} from '@angular/core';
import {ForumService} from '../shared/services/forum.service';
@Component({
    selector:'viewDisc',
    templateUrl:'./viewDisc.html'
})
export class ViewDiscussions implements OnInit{
discussions:any;
    constructor(private forumService:ForumService){}
    ngOnInit(){
    this.forumService.getDiscussion().subscribe((response)=>{this.discussions=response;})
    }
}