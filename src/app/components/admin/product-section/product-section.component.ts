import { Component, OnDestroy, OnInit, WritableSignal, signal } from '@angular/core';
import { ProductContainerComponent } from '../../../shared/components/product-container/product-container.component';
import { ProductFormComponent } from '../product-form/product-form.component';
import { Product } from '../../../core/models/interfaces/interfaces';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ProductsService } from '../../../core/services/products/products.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-product-section',
  standalone: true,
  imports: [ProductContainerComponent, ProductFormComponent, TitleCasePipe],
  templateUrl: './product-section.component.html',
  styleUrl: './product-section.component.scss'
})
export class ProductSectionComponent implements OnInit, OnDestroy{

  subscription : Subscription = new Subscription();
  productsArray : WritableSignal<Product[]> = signal([])

  constructor(
    private router: Router,
    private productService: ProductsService
  ) {

  }

  ngOnInit() {
    this.subscription = this.productService.getProducts().subscribe(
      (value) => this.productsArray.set(value)
    )
  }

  insertProduct(product: Product) {
    this.productsArray.update(productArray => {
      productArray.push(product)
      return productArray
    })
    this.subscription = this.productService.postProduct(product).subscribe()
  }

  updateProduct(product: Product) {
    this.router.navigate([`/admin/home/products/update/`, product.id])
  }

  deleteProduct(product: Product) {
    let productIndex = this.productsArray().indexOf(product)
    this.subscription = this.productService.deleteProduct(product.id).subscribe(
      {
        next: () => {
        this.productsArray.update(productArray => {
          productArray.splice(productIndex, 1)
          return productArray
        })
      }}
    )
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
