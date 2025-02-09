import { Component, EventEmitter, Input, InputSignal, Output, input } from '@angular/core';
import { Order } from '../../../core/models/interfaces/interfaces';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [],
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.scss'
})
export class UserOrdersComponent {
  isLogged : InputSignal<boolean> = input.required<boolean>();
  userOrders : InputSignal<Order[]> = input.required<Order[]>();
  @Output() closePageEvent : EventEmitter<void> = new EventEmitter<void>();
 
  closePage() {
    this.closePageEvent.emit()
  }
}
