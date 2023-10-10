import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  user_name: string = ""
  acno = ""
  pswd = ""
  amt = ""
  acno1 = ""
  pswd1 = ""
  amt1 = ""

  depositForm = this.fb.group({
    acno: ["", [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ["", [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amt: ["", [Validators.required, Validators.pattern('[0-9]*')]]
  })

  withdrawForm = this.fb.group({
    acno1: ["", [Validators.required, Validators.pattern('[0-9]*')]],
    pswd1: ["", [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amt1: ["", [Validators.required, Validators.pattern('[0-9]*')]]
  })

  user: any

  constructor(private ds: DataService, private fb: FormBuilder, private router: Router) {
    this.user = this.ds.currentusername
  }
  ngOnInit(): void {
    if (!localStorage.getItem("currentacno")) {
      alert("Please Log In..")
      this.router.navigateByUrl("")
    }
  }

  // getUserName() { // my own **
  //   this.user_name = this.ds.getUserName(this.acno);
  // }

  deposit() {
    var acno = this.depositForm.value.acno
    var pswd = this.depositForm.value.acno
    var amount = this.depositForm.value.amt
    console.log(this.depositForm.value.acno)

    if (this.depositForm.valid) {
      const result = this.ds.deposit(acno, pswd, amount)
      if (result) {
        alert("Current Deposit:" + amount + "\nDeposit Successfull...\nCurrent Balance: " + result)
      }
    }
    else {
      alert("invalid Deposit Form")
    }
  }

  withdraw() {
    var acno = this.withdrawForm.value.acno1
    var pswd = this.withdrawForm.value.pswd1
    var amount = this.withdrawForm.value.amt1

    if (this.withdrawForm.valid) {
      const result = this.ds.withdraw(acno, pswd, amount)
      if (result) {
        alert("Current Withdraw Amount:" + amount + "\nWithdraw Successfull...\nCurrent Balance: " + result)
      }
    }
    else {
      alert("Invalid withdraw form")
    }
  }

  //logout
  logout () {
    localStorage.removeItem("currentusername")
    localStorage.removeItem("currentacno")
this.router.navigateByUrl("")
  }
}

  

