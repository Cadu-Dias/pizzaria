import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from '../../../core/models/interfaces/interfaces';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [
    NgIf, NgFor
  ],
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.scss'
})
export class UserOrdersComponent {
  @Input({required: true})isLogged! : boolean;
  @Input({required: true})userOrders: Array<Order> = []
  @Output() closePageEvent : EventEmitter<void> = new EventEmitter<void>()
 
  closePage() {
    this.closePageEvent.emit()
  }
}
