import { Component, OnDestroy } from '@angular/core';
import { AccountFormComponent } from '../../../shared/components/account-form/account-form.component';
import { Admin } from '../../../core/models/interfaces/interfaces';
import { AdminService } from '../../../core/services/accounts/admin/admin.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-admin',
  standalone: true,
  imports: [AccountFormComponent],
  templateUrl: './register-admin.component.html',
  styleUrl: './register-admin.component.scss'
})
export class RegisterAdminComponent implements OnDestroy{
  subscription: Subscription = new Subscription()

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  registerAdmin(admin: Admin) {
    this.subscription = this.adminService.postAdmin(admin).subscribe(
      () => this.router.navigate(["admin/home/admins"])
    )
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }
}
