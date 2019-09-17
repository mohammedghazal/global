import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})

export class OrderCreateComponent implements OnInit {  
  submitted = false;
  orderForm: FormGroup;
  OrderProfile:any = ['King', 'Hot', 'XO', 'Sindibad', 'Mr Price']
  
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) { 
    this.mainForm();
  }

  ngOnInit() { }

  mainForm() {
    this.orderForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      address: ['', [Validators.required]],
      pageName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  // Choose designation with select dropdown
  updateProfile(e){
    this.orderForm.get('pageName').patchValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm(){
    return this.orderForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.orderForm.valid) {
      return false;
    } else {
      this.apiService.createOrder(this.orderForm.value).subscribe(
        (res) => {
          console.log('Order successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/order-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}