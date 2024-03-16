import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../core/models/interfaces/interfaces';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-container',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './product-container.component.html',
  styleUrl: './product-container.component.scss'
})
export class ProductContainerComponent {

  @Input({required:true}) product!: Product;
  @Input({required: true}) accountType!: string;
  @Output() updateProductEvent = new EventEmitter<Product>();
  @Output() deleteProductEvent = new EventEmitter<Product>();
  @Output() addToCartEvent = new EventEmitter<Product>();
  qty: string = '1'

  showUpdateProductScreen() {
    this.updateProductEvent.emit(this.product)
  }

  deleteProduct() {
    this.deleteProductEvent.emit(this.product)
  }

  addToCart() {
    this.product.qty = this.qty
    this.addToCartEvent.emit(this.product)
  }

  componentsColor() : string{
    if(this.accountType.includes("user")) {
      return 'products__added__container__specific__price user'
    }

    return 'products__added__container__specific__price admin'
  }
}
