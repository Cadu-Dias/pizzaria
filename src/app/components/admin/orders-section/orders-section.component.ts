import { Component, WritableSignal, signal } from '@angular/core';
import { Order } from '../../../core/models/interfaces/interfaces';
import { OrdersService } from '../../../core/services/orders/orders.service';
import { Subscription } from 'rxjs';
import { OrderContainerComponent } from '../order-container/order-container.component';

@Component({
  selector: 'app-orders-section',
  standalone: true,
  imports: [OrderContainerComponent],
  templateUrl: './orders-section.component.html',
  styleUrl: './orders-section.component.scss'
})
export class OrdersSectionComponent {

  orderArray : WritableSignal<Order[]> = signal([])
  subscription: Subscription = new Subscription();
  constructor(
    private orderService:OrdersService
  ){}

  ngOnInit(): void {
    this.subscription = this.orderService.getOrder().subscribe(
      (value) => this.orderArray.set(value)
    )
  }

  deleteOrder(order: Order): void {
    let orderIndex = this.orderArray().indexOf(order)
    this.subscription = this.orderService.deleteOrder(order.id).subscribe(
      {
        next: () => {
          this.orderArray.update(
            orderArray => {
              this.orderArray().splice(orderIndex, 1)
              return orderArray
            }
          )
        }
      }
    )
  }

  updateOrder(order: Order): void {
    this.subscription = this.orderService.updateOrder(order.id, order).subscribe()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
