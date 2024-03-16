import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../core/models/interfaces/interfaces';
import { ProductsService } from '../../../core/services/products/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [ ProductFormComponent ],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent implements OnInit, OnDestroy{

  product!: Product;
  productId!: string;
  subscription: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.subscription = this.productService.getSpecificProduct(this.productId).subscribe(
      (value) => {
        if(value.length === 0) {
          this.router.navigate(['/admin/home/products'])
          return;
        }
        this.product = value[0]
      }
    )
  }
  
  goBack() {
    this.router.navigate(["admin/home/products"]);
  }
  
  updateProduct(newProduct: Product) {
    this.subscription = this.productService.updateProduct(newProduct, this.product.id).subscribe(
      () => {
        this.router.navigate(["admin/home/products"]);
      }
    )
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
