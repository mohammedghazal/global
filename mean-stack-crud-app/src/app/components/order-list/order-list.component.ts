import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})

export class OrderListComponent implements OnInit {
  
  Order:any = [];

  constructor(private apiService: ApiService) { 
    this.readOrder();
  }

  ngOnInit() {}

  readOrder(){
    this.apiService.getOrders().subscribe((data) => {
     this.Order = data;
    })    
  }

  removeOrder(order, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteOrder(order._id).subscribe((data) => {
          this.Order.splice(index, 1);
        }
      )    
    }
  }

}