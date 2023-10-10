import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit{
  transactions: any[];
  acno:any
  date_time: any

  constructor(private ds:DataService){
    this.acno = this.ds.currentacno
    this.transactions = this.ds.getTransaction(this.acno)
    console.log(this.transactions);
  }
  
  ngOnInit(): void {
  
  }

}
