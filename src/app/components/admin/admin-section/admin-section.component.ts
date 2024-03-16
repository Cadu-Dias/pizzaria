import { Component, OnDestroy, OnInit, WritableSignal, signal } from '@angular/core';
import { AccountContainerComponent } from '../account-container/account-container.component';
import { Subscription } from 'rxjs';
import { AdminService } from '../../../core/services/accounts/admin/admin.service';
import { Router } from '@angular/router';
import { Admin } from '../../../core/models/interfaces/interfaces';

@Component({
  selector: 'app-admin-section',
  standalone: true,
  imports: [AccountContainerComponent],
  templateUrl: './admin-section.component.html',
  styleUrl: './admin-section.component.scss'
})
export class AdminSectionComponent implements OnInit, OnDestroy{

  adminArray: WritableSignal<Admin[]> = signal([]);
  subscription: Subscription = new Subscription();
  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.adminService.getAdminAccounts().subscribe(
      (value) => {
        this.adminArray.set(value);   
      }
    )
     
  }

 

  showRegisterAdminComponent() {
    this.router.navigate(["/admin/home/admins/register"]);
  }

  deleteAccount(adminId: string) {
   this.adminArray().map(
      (value) => {
        if(value.id.includes(adminId)) {
          let adminIndex = this.adminArray().indexOf(value)
          this.adminArray.update(
            adminArray => {
              adminArray.splice(adminIndex, 1)
              return adminArray
            }
          )
        }
      }
    )
    this.subscription = this.adminService.deleteAdmin(adminId).subscribe()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
