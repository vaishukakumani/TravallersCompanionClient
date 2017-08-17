import {OnInit,Component} from '@angular/core';
// import {UserService} from '../shared/services/User.service';
import {UserLoginService} from '../shared/services/userLogin.service';
import {UserService} from '../shared/services/User.service';
import {AuthenticationService} from '../shared/services/authentication.service'
import {Router,ActivatedRoute} from '@angular/router';
import {Globals} from '../shared/globals';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserId,UserName} from '../shared/auth.constants';
@Component(
{
    selector: 'login-comp',
    templateUrl: './login.html',
    
})
export class LoginComponent implements OnInit {
    loginForm:FormGroup;
    displayError:boolean=false;
    status:string;
    userName:string='';
    password:string='';
     loading = false;
     redirectUrl:string;
    constructor(private userService: UserLoginService,
    private userIdService:UserService,
    private _router: Router,
    private globals: Globals,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute){
        this.loginForm = fb.group({
      'userName' : [null, Validators.required],
      'password' : [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(15)])]
      
    });
     this.redirectUrl = this.activatedRoute.snapshot.queryParams['redirectTo'];
}

  ngOnInit(): void {
    this.userService.logout();
  }
    
   
    onSubmit(value:any){
        console.log(value);
        
 
   
        
    this.loading = true;

    this.authenticationService.login(value.userName, value.password)
      .subscribe(
        result => {
          this.loading = false;

          if (result) {
              console.log(result);
            this.userService.login(result);
            this.userIdService.checkUser(value.userName,value.password).subscribe(checkUserdata=>{
                                                                                         localStorage.setItem(UserName,checkUserdata.userName);
                                                                                        localStorage.setItem(UserId,checkUserdata.userId); }); 
            this.navigateAfterSuccess();
          } else {
              this.displayError=true;
            this.status = 'Username or password is incorrect';
          }
        },
        error => {
          this.status = 'Username or password is incorrect';
          this.displayError=true;
          this.loading = false;
        }
      );
  }

  private navigateAfterSuccess() {

    this._router.navigateByUrl('/UserHome');
   }
               
    

}