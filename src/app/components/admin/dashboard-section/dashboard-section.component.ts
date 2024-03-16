import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardContainerComponent } from '../dashboard-container/dashboard-container.component';
import { AdminService } from '../../../core/services/accounts/admin/admin.service';
import { UserService } from '../../../core/services/accounts/user/user.service';
import { ProductsService } from '../../../core/services/products/products.service';
import { OrdersService } from '../../../core/services/orders/orders.service';
import { Admin, DashboardContainer, Order, Product, User } from '../../../core/models/interfaces/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-section',
  standalone: true,
  imports: [DashboardContainerComponent],
  templateUrl: './dashboard-section.component.html',
  styleUrl: './dashboard-section.component.scss'
})
export class DashboardSectionComponent implements OnInit, OnDestroy{
  dashboardContainerArray: Array<DashboardContainer> = [
    {
      value: "$18/-", 
      containerText: "Total Pendings",
      buttonText: "See Orders",
      redirectRoute: "orders"
    },
    {
      value: "$0/-", 
      containerText: "Completed Orders",
      buttonText: "See Orders",
      redirectRoute: "orders"
    },
    {
      value: "1", 
      containerText: "Orders Placed",
      buttonText: "See Orders",
      redirectRoute: "orders"
    },
    {
      value: "9", 
      containerText: "Total Products",
      buttonText: "See Products",
      redirectRoute: "products"
    },
    {
      value: "2", 
      containerText: "Total Users",
      buttonText: "See Accounts",
      redirectRoute: "users"
    },
    {
      value: "3", 
      containerText: "Total Admins",
      buttonText: "See Accounts",
      redirectRoute: "admins"
    }
  ]

  productsSubscription: Subscription = new Subscription();
  userSubscription: Subscription = new Subscription();
  adminSubscription: Subscription = new Subscription();
  orderSubscription : Subscription = new Subscription();

  orderArray : Order[] = [];
  productsArray: Product[] = [];
  userArray: User[] = [];
  adminArray: Admin[] = [];

  totalPending: number = 0;
  totalComplete: number = 0;
  totalOrders: number = 0;
  totalProducts: number = 0;
  totalUsers: number = 0;
  totalAdmins: number = 0;

  constructor(
    private orderService: OrdersService,
    private productService: ProductsService,
    private userService: UserService,
    private adminService: AdminService
  ) {}

  ngOnInit() : void {
    this.orderSubscription = this.orderService.getOrder().subscribe(
      (value) => this.orderArray = value
    );
    this.productsSubscription = this.productService.getProducts().subscribe(
      (value) => this.productsArray = value
    );
    this.userSubscription = this.userService.getUsers().subscribe(
      (value) => this.userArray = value
    );
    this.adminSubscription = this.adminService.getAdminAccounts().subscribe(
      (value) => this.adminArray = value
    );
      
  }

  ngAfterContentChecked(): void {
    setTimeout(() => {
      this.totalPending = 0;
      this.totalComplete = 0;
      this.totalOrders  = 0;
      this.orderArray.map((value) => {
        if(value.status.includes("Pending"))
        {
          this.totalPending += parseInt(value.totalPrice)
          return;
        }
        this.totalComplete += parseInt(value.totalPrice)
      })
      this.totalOrders = this.orderArray.length;
      this.totalProducts = this.productsArray.length;
      this.totalUsers = this.userArray.length;
      this.totalAdmins = this.adminArray.length;

      this.dashboardContainerArray[0].value = `$${this.totalPending}/-`;
      this.dashboardContainerArray[1].value = `$${this.totalComplete}/-`;
      this.dashboardContainerArray[2].value = `${this.totalOrders}`;
      this.dashboardContainerArray[3].value = `${this.totalProducts}`;
      this.dashboardContainerArray[4].value = `${this.totalUsers}`;
      this.dashboardContainerArray[5].value = `${this.totalAdmins}`;
    }, 0)
    
  }

  ngOnDestroy() {
    this.orderSubscription.unsubscribe();
    this.productsSubscription.unsubscribe();
    this.adminSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
