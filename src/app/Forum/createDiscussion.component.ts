import {Component} from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {ForumService} from '../shared/services/forum.service';
@Component({
    selector:'disc-create',
    templateUrl:'./createDisc.html'
})
export class CreateDiscussion{
    userName:String;
    userId:String;
    constructor(private _route:ActivatedRoute,private _router:Router,private forumService:ForumService){
        this.userId=localStorage.getItem("user_id");
        this.userName=localStorage.getItem("user_name");
    }
    onSubmit(value:any,form:any){
        console.log(value);
        var disc={"createdDate":new Date(),
                    "user":{"userId":this.userId,
        "userName":this.userName,
        "firstName":null,
        "lastName":null,
        "password":"xxxx"},
        "subjectLine":value.discSub,
        "subjectText":value.discDetails,
        "lastPostedBy":this.userName,
        "lastPostedDate":new Date()
        }
        this.forumService.createDiscussion(disc).subscribe(response=>{console.log(response);
        if(response!=null)
form.resetForm();
alert("Your discussion has been created");},error=>{alert(error+" please try again");
                            form.resetForm();})

    }


}