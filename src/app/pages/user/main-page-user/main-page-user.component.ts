import { Component, ElementRef, Inject, Signal, ViewChild, WritableSignal, effect, signal } from '@angular/core';
import { BannerSectionComponent } from '../../../components/user/banner-section/banner-section.component';
import { AboutSectionComponent } from '../../../components/user/about-section/about-section.component';
import { MenuSectionComponent } from '../../../components/user/menu-section/menu-section.component';
import { OrderSectionComponent } from '../../../components/user/order-section/order-section.component';
import { FaqSectionComponent } from '../../../components/user/faq-section/faq-section.component';
import { ContactSectionComponent } from '../../../components/user/contact-section/contact-section.component';
import { Order, Product, User } from '../../../core/models/interfaces/interfaces';
import { ProductsService } from '../../../core/services/products/products.service';
import { OrdersService } from '../../../core/services/orders/orders.service';
import { UserService } from '../../../core/services/accounts/user/user.service';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { Subscription } from 'rxjs';
import { UserCartComponent } from '../../../components/user/user-cart/user-cart.component';
import { UserOrdersComponent } from '../../../components/user/user-orders/user-orders.component';
import { RegisterLoginUserComponent } from '../../../components/user/register-login-user/register-login-user.component';

@Component({
  selector: 'app-main-page-user',
  standalone: true,
  imports: [ 
    BannerSectionComponent, AboutSectionComponent, MenuSectionComponent,
    OrderSectionComponent, FaqSectionComponent, ContactSectionComponent,
    UserCartComponent, UserOrdersComponent, RegisterLoginUserComponent 
  ],
  templateUrl: './main-page-user.component.html',
  styleUrl: './main-page-user.component.scss'
})
export class MainPageUserComponent {

  @ViewChild('userAccountPage', { read: ElementRef, static:false })
  accountComponent!: ElementRef;
  
  @ViewChild('userCartPage', { read: ElementRef, static:false })
  cartComponent!: ElementRef;
 
  @ViewChild('userOrderPage', { read: ElementRef, static:false })
  orderComponent!: ElementRef;

  totalPrice: number = 0

  isAccountPageVisible: boolean = false
  isOrderPageVisible: boolean = false
  isCartPageVisible: boolean = false;
  isLoggedIn : WritableSignal<boolean> = signal(false);

  subscriptionProducts : Subscription = new Subscription()
  subscriptionOrders: Subscription = new Subscription()
  subscriptionUser: Subscription = new Subscription()

  productArray : WritableSignal<Product[]>  = signal([]);
  userCart: WritableSignal<Product[]> = signal([]);
  orderArray : WritableSignal<Order[]> = signal([]);
  userArray: User[] = [];

  constructor(
    private productsService: ProductsService,
    private orderService: OrdersService,
    private userService: UserService,
    private scroller: ViewportScroller,
    @Inject(DOCUMENT) private document: Document
  ) {}

  

  ngOnInit() : void {
    this.subscriptionProducts = this.productsService.getProducts().subscribe(
      (value) => this.productArray.set(value)
    )

    this.subscriptionUser = this.userService.getUsers().subscribe(
      (value) => this.userArray = value
    )

    if(this.isLoggedIn()) {
      this.subscriptionOrders = this.orderService.getUserOrders(sessionStorage.getItem("userId")!).subscribe(
        (value) => this.orderArray.set(value) 
      )
    }
  }

  scrollTo(anchor: string) {
    if(anchor.includes("order") && this.isCartPageVisible) {
      this.cartComponent.nativeElement.classList.remove("active");
      this.isCartPageVisible = false
    }
    this.scroller.scrollToAnchor(anchor)
  }

  addToCart(product: Product) {
    let oldProductIndex = this.userCart().findIndex(x => x.id == product.id);
    if(oldProductIndex!== -1 && parseInt(product.qty!) <= 0) {
      this.removeItem(product)
      return;
    }
    else if(oldProductIndex !== -1) {
      this.userCart.update(
        userCart => {
          userCart[oldProductIndex] = product
          return userCart
        }
      )
      this.totalPrice = 0
      this.userCart().map((value) => {
        this.totalPrice += parseInt(value.qty!) * parseInt(value.value) 
      })
      return;
    }
    else if(parseInt(product.qty!) <= 0) {
      return;
    }
    this.totalPrice += parseInt(product.qty!) * parseInt(product.value) 
    this.userCart.update(
      userCart => {
        userCart.push(product)
        return userCart
      }
    )
  }

  postOrder(order: Order) {
    this.userCart().map((value) => {
      order.products.push(`${value.name} (${value.value} X ${value.qty})`)
    })
    order.totalPrice = this.totalPrice.toString()
    setTimeout(() => {
      this.subscriptionOrders = this.orderService.postOrder(order).subscribe(
        {
          next: () => {
            this.orderArray.update(orderArray => {
              orderArray.push(order)
              return orderArray
            })
          }
        }
      )
    }, 1000)
    this.orderArray().push(order)
    this.orderArray().pop()
    
  }

  setViewAccountComponent() {
    if(this.isAccountPageVisible) {
      this.accountComponent.nativeElement.classList.remove("active");
      this.isAccountPageVisible = false;
      return;
    }
    this.accountComponent.nativeElement.classList.add("active")
    this.isAccountPageVisible = true;
  }

  setViewOrderComponent() {
    if(this.isOrderPageVisible) {
      this.orderComponent.nativeElement.classList.remove("active");
      this.isOrderPageVisible = false;
      return;
    }
    this.orderComponent.nativeElement.classList.add("active")
    this.isOrderPageVisible = true;
  }

  setViewCartComponent() {
    if(this.isCartPageVisible) {
      this.cartComponent.nativeElement.classList.remove("active");
      this.isCartPageVisible = false;
      return;
    }
    this.cartComponent.nativeElement.classList.add("active")
    this.isCartPageVisible = true;
  }

  loginUser(user:User) {
    let findUser = this.userArray.find((value) => user.email === value.email && user.password === value.password)
    if(findUser) {
      this.document.defaultView?.sessionStorage.setItem("userId", findUser.id);
      this.document.defaultView?.sessionStorage.setItem("userName", findUser.username);
      window.location.replace("/user")
    }
  }

  registerUser(user: User) {
    this.subscriptionUser = this.userService.postUsers(user).subscribe();
    this.document.defaultView?.sessionStorage.setItem("userId", user.id);
    this.document.defaultView?.sessionStorage.setItem("userName", user.username);
    window.location.replace("/user")
  }

  removeItem(product: Product) {
    this.totalPrice -= parseInt(product.qty!) * parseInt(product.value)
    let productIndex = this.userCart().indexOf(product)
    this.userCart.update(
      userCart => {
        userCart.splice(productIndex, 1)
        return userCart
      }
    )
  }

  editItem(product: Product) {
    let productIndex = this.userCart().indexOf(product)
    this.userCart.update(
      userCart => {
        userCart[productIndex] = product
        return userCart
      }
    )
    this.totalPrice = 0
    this.userCart().map((value) => {
      this.totalPrice += parseInt(value.qty!) * parseInt(value.value) 
    })
  }

  ngOnDestroy() {
    this.subscriptionProducts.unsubscribe();
    this.subscriptionOrders.unsubscribe();
    this.subscriptionUser.unsubscribe()
  }
}
