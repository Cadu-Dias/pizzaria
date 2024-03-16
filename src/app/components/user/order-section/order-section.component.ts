import { Component, Output, EventEmitter, InputSignal, input } from '@angular/core';
import { Order, Product } from '../../../core/models/interfaces/interfaces';
import { OrderFormComponent } from '../order-form/order-form.component';
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-order-section',
  standalone: true,
  imports: [ OrderFormComponent, LowerCasePipe ],
  templateUrl: './order-section.component.html',
  styleUrl: './order-section.component.scss'
})
export class OrderSectionComponent {

  @Output() sendOrderEvent: EventEmitter<Order> = new EventEmitter<Order>();
  userCart: InputSignal<Product[]> = input.required<Product[]>(); 
  
  sendOrder(order: Order) {
    this.sendOrderEvent.emit(order)
  }
}
