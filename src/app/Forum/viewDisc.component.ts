import {Component,OnInit} from '@angular/core';
import {ForumService} from '../shared/services/forum.service';
import { FormsModule,FormGroup }   from '@angular/forms';
@Component({
    selector:'viewDisc',
    templateUrl:'./viewDisc.html'
})
export class ViewDiscussions implements OnInit{
discussions:any;
msgForm:FormGroup;
selectedDisc:any;
modalDisable:any
    constructor(private forumService:ForumService){}
    ngOnInit(){
    this.forumService.getDiscussion().subscribe((response)=>{this.discussions=response;},error=>{alert(error+"An error occured.Please try again");});
  
    this.modalDisable=false;
}
sendMessage(value:any,id:any,msgForm:any){
    alert(value);
    console.log(value);
    msgForm.reset();

    
}
selectDisc(i:any){
    this.modalDisable=true;
        this.selectedDisc=i;
    }
}