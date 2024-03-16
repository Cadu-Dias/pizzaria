import { Component, EventEmitter, Input, Output } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Order, Product } from '../../../core/models/interfaces/interfaces';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [ NgIf, ReactiveFormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent {

  @Input({required: true}) userCart!: Product[]
  @Output() completeFormEvent : EventEmitter<Order> = new EventEmitter

  orderForm!: FormGroup;
  isLogged : boolean = false; 
  order!: Order;
  products!: string[];
  totalPrice: number= 0;
  
  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
      this.orderForm = this.formBuilder.group({
        name: ["", Validators.compose([
          Validators.required,
          Validators.minLength(4)
        ])],
        number: ["", Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15),
        ])],
        paymentMethod: ["Cash on Delivery",Validators.compose([
          Validators.required,
        ])],
        adressLine01: ["",Validators.compose([
          Validators.required,
          Validators.minLength(10)
        ])],
        adressLine02: ["", Validators.compose([
          Validators.required,
          Validators.minLength(10)
        ])],
        pinCode: ["", Validators.compose([
          Validators.required,
          Validators.maxLength(1),
          Validators.maxLength(4)
        ])]
      })  
      if(sessionStorage.getItem("userName") !== null) {
        this.isLogged = true
        this.orderForm.patchValue({
          name: sessionStorage.getItem("userName")
        })
        this.orderForm.get("name")?.disable()
      }
  }

  sendOrder() {
    if(this.orderForm.valid && this.userCart.length > 0) {
      this.order = {
        id: uuid(),
        date: new Date().toLocaleString(),
        adress: `${this.orderForm.get('adressLine01')?.value} - ${this.orderForm.get('adressLine02')?.value}, ${this.orderForm.get('pinCode')?.value}`,
        payment: this.orderForm.get('paymentMethod')?.value,
        phone: this.orderForm.get('number')?.value,
        products: [],
        status: "Pending",
        totalPrice: "0",
        userId: sessionStorage.getItem("userId") as string,
        userName: sessionStorage.getItem("userName")!
      },

      this.completeFormEvent.emit(this.order);
      this.orderForm.reset()
    }
  }
}
