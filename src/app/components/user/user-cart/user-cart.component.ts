import { Component, Input, InputSignal, Output, input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Product } from '../../../core/models/interfaces/interfaces';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-cart',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './user-cart.component.html',
  styleUrl: './user-cart.component.scss'
})
export class UserCartComponent {
  userCart: InputSignal<Product[]> = input.required<Product[]>();
  @Input({required: true}) totalPrice!: number;
  @Output() closePageEvent : EventEmitter<void> = new EventEmitter<void>();
  @Output() removeItemEvent : EventEmitter<Product> = new EventEmitter<Product>()
  @Output() editItemEvent: EventEmitter<Product> = new EventEmitter<Product>()
  @Output() goToOrderSectionEvent: EventEmitter<string> = new EventEmitter<string>()
  closePage() {
    this.closePageEvent.emit()
  }

  removeItem(product: Product) {
    this.removeItemEvent.emit(product)
  }

  editQty(product : Product) {
    this.editItemEvent.emit(product)
  }

  goToOrderSection() {
    this.goToOrderSectionEvent.emit("order")
  }
}
