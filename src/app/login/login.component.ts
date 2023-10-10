import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  aim = "Your Perfect Banking Partner"
  accnum = "Enter the account number"
  passwrd = "Enter the password"
  acno = ""
  pswd = ""

  //loginForm
  loginForm = this.fb.group({
    acno: ["", [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ["", [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],

  })


  constructor(private ds: DataService, private router: Router, private fb: FormBuilder) { }
  ngOnInit(): void {

  }

  login() {
    var acno = this.loginForm.value.acno
    var pswd = this.loginForm.value.pswd
    console.log(acno)
    console.log(pswd)

    console.log(this.loginForm.get('acno')?.errors)

    if (this.loginForm.valid) {
      //call login in Dataservice
      const result = this.ds.login(acno, pswd)
      if (result) {
        alert("Log in successfull")
        this.router.navigateByUrl("dashboard")
      }
    }
    else {
      alert("Invalid!!")
    }
  }
}
//login using template referencing variable

// login(a:any, p:any){
//   console.log(a)
//   var acno = a.value
//   console.log(acno)
//   var pswd = p.value
//   console.log(pswd)



//   if(acno in this.database){
//     //login success
//     if (pswd == this.database[acno]["password"]){
//       //pswd match
//       alert("Login succesfull......")
//     }
//     else{
//       alert("Incorrect Password")
//     }
//   }
//   else{
//     alert("Account does not exist!!")
//   }

// }
