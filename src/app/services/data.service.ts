import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentusername: any
  currentacno: any

  database: any={
    1000: {acno: 1000, uname: "Neethu", password: 1000, balance:5000, transactions:[]},
    1001: {acno: 1001, uname: "Nithin", password: 1001, balance:7000,transactions:[]},
    1002: {acno: 1002, uname: "Mini", password: 1002, balance:15000, transactions:[]},
    1003: {acno: 1003, uname: "Radhakrishnan", password: 1000, balance:25000, transactions:[]}
  }

  constructor(private router: Router) {
    this.getDetails()
  }

    // save data in local storage
  saveDetails(){
    localStorage.setItem("database",JSON.stringify(this.database))
    if(this.currentacno){
      localStorage.setItem("currentacno", JSON.stringify(this.currentacno))
    }
    if(this.currentusername){
      localStorage.setItem("currentusername", JSON.stringify(this.currentusername))
    }
  }

  //get data from local storage
  getDetails(){
    if(localStorage.getItem("database")){
      this.database=JSON.parse(localStorage.getItem("database")|| '')
    }
    if(localStorage.getItem("currentacno")){
      this.currentacno=JSON.parse(localStorage.getItem("currentacno")|| '')
    } 
    if(localStorage.getItem("currentusername")){
      this.currentusername=JSON.parse(localStorage.getItem("currentusername")|| '')
    }
  }



  //register

  register(acno:any,pswd:any,uname:any){

  let database = this.database

  if(acno in database){
    //acno already existing
    return false
  }
  else{
    database[acno]={
      acno,
      uname,
      pswd,
      balance:0
    }
    this.saveDetails()
    console.log(database)
    return true
  }
  }

  //login

  login(acno:any,pswd:any){

    let database = this.database
    let uname = this.database.uname
    if(acno in database){
      //acno match
      if(pswd == database[acno]["password"]){
        this.currentusername = database[acno]["uname"]
        this.currentacno = acno
        this.router.navigateByUrl("dashboard")
        //paswd match with accno
        this.saveDetails()
        return true
      }
      else{
        alert("Incorrect Password!!!!!")
        return false
      }
    }
    else{
      alert("User doesn't exist!!!!!")
      return false
    }
  }

  // getUserName(acno: string): string {
  //   const user = this.database[acno];
  //   return user && user.uname ? user.uname : "";
  // }
  
  deposit(acno:any, pswd:any, amt:any){
    var amount = parseInt(amt)
    let database = this.database
    const currentDate = new Date();

    if(acno in database){
      if(pswd==database[acno]["password"]){
        database[acno]["balance"] += amount
        database[acno]["transactions"].push({
          type: "CREDIT",
          amount:amount,
          date_time: currentDate
        })
        // console.log(database)
        this.saveDetails()
        return database[acno]["balance"]
      }
      else{
        alert("Incorrect Password!!!")
      }
    }
    else{
      alert("Account doesn't exist!!!!!")
      return false
    }
  }
  withdraw(acno:any, pswd:any, amt:any){
    var amount = parseInt(amt)
    let database = this.database
    const currentDate = new Date();

    if(acno in database){
      if(pswd==database[acno]["password"]){
        if(database[acno]["balance"]>amount){
          database[acno]["balance"] -= amount
          database[acno]["transactions"].push({
            type: "DEBIT",
            amount:amount,
            date_time: currentDate
          })
          this.saveDetails()
          // console.log(database)
          return database[acno]["balance"]
        }
        else{
          alert("Insufficient Balance!!")
        }
      }
      else{
        alert("Incorrect Password!!!")
      }
    }
    else{
      alert("Account doesn't exist!!!!!")
      return false
    }
  }
  getTransaction(acno:any){
    return this.database[acno]["transactions"]
  }

  
}


