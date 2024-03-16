import { Component, EventEmitter, Inject, Input, InputSignal, Output, effect, input, signal } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Order, Product } from '../../../core/models/interfaces/interfaces';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent {

  userCart: InputSignal<Product[]> = input.required();
  @Output() completeFormEvent : EventEmitter<Order> = new EventEmitter
  
  orderForm!: FormGroup;
  isLogged : boolean = false; 
  order!: Order;
  products!: string[];
  totalPrice: number= 0;
  userId: string = ''
  userName!: string;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(DOCUMENT) private document : Document
  ) {
    const sessionStorage = document.defaultView?.sessionStorage;
    if (sessionStorage) {
      const username = sessionStorage.getItem('userName');
      const userid = sessionStorage.getItem('userId');
      if (username && userid) {
        this.userName = username;
        this.userId = userid!
      }
    }
  }

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
      if(this.userName) {
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
        userId: this.userId,
        userName: this.userName!
      },

      this.completeFormEvent.emit(this.order);
      this.orderForm.reset()
    }
  }
}
