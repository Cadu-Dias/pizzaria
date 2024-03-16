import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from '../../../core/models/interfaces/interfaces';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-container',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './order-container.component.html',
  styleUrl: './order-container.component.scss'
})
export class OrderContainerComponent {
  @Input({required: true}) order! : Order;
  @Output() deleteOrderEvent: EventEmitter<Order> = new EventEmitter<Order>();
  @Output() updateOrderEvent: EventEmitter<Order> = new EventEmitter<Order>();
  orderStatus!: string;

  constructor(
  ) {}

  ngOnInit() {
    this.orderStatus = this.order.status
  }

  deleteOrder() {
    this.deleteOrderEvent.emit(this.order)
  }

  updateOrder() {
    this.order.status = this.orderStatus
    this.updateOrderEvent.emit(this.order)
  }
}
