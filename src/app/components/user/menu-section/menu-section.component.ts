import { Component, EventEmitter, InputSignal, Output, input } from '@angular/core';
import { ProductContainerComponent } from '../../../shared/components/product-container/product-container.component';
import { Product } from '../../../core/models/interfaces/interfaces';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-menu-section',
  standalone: true,
  imports: [ ProductContainerComponent, NgFor],
  templateUrl: './menu-section.component.html',
  styleUrl: './menu-section.component.scss'
})
export class MenuSectionComponent {
  productsArray : InputSignal<Product[]> = input.required<Product[]>();
  @Output() addToCartEvent : EventEmitter<Product> = new EventEmitter<Product>

  addToCart(product: Product) {
    this.addToCartEvent.emit(product)
  }
}
