import { Component, Inject, OnDestroy } from '@angular/core';
import { AdminService } from '../../../core/services/accounts/admin/admin.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Admin } from '../../../core/models/interfaces/interfaces';
import { AccountFormComponent } from '../../../shared/components/account-form/account-form.component';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-update-admin',
  standalone: true,
  imports: [AccountFormComponent],
  templateUrl: './update-admin.component.html',
  styleUrl: './update-admin.component.scss'
})
export class UpdateAdminComponent implements OnDestroy {
  subscription: Subscription = new Subscription();
  constructor(
    private adminService: AdminService,
    private router: Router,
    @Inject(DOCUMENT) private document : Document
  ) {}
  
  updateProfile(admin: Admin) {
    this.subscription = this.adminService.updateAdmin(admin.id, admin).subscribe(
      () => {
        this.document.defaultView?.sessionStorage.setItem("adminName", admin.username)
        this.document.defaultView?.sessionStorage.setItem("password", admin.password)
        this.router.navigate(["admin/home"])
      }
    )
  }

  ngOnDestroy() : void {
    this.subscription.unsubscribe()
  }
}
