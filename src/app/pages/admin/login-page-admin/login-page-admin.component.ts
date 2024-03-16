import { Component, Inject } from '@angular/core';
import { AccountFormComponent } from '../../../shared/components/account-form/account-form.component';
import { v4 as uuid } from 'uuid';
import { Subscription } from 'rxjs';
import { AdminService } from '../../../core/services/accounts/admin/admin.service';
import { Router } from '@angular/router';
import { Admin } from '../../../core/models/interfaces/interfaces';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-login-page-admin',
  standalone: true,
  imports: [AccountFormComponent],
  templateUrl: './login-page-admin.component.html',
  styleUrl: './login-page-admin.component.scss'
})
export class LoginPageAdminComponent {
  subscription: Subscription = new Subscription();
  constructor(
    private adminService: AdminService,
    private router: Router,
    @Inject(DOCUMENT) private document : Document
  ) {}

  verifyAccount(admin: Admin) {
    this.subscription = this.adminService.getEspecificAdmin(admin).subscribe(
      (value) => {
        if(value.length === 0) {
          return;
        } 
        this.router.navigate(["/admin/home"])
        this.document.defaultView?.sessionStorage.setItem("token", uuid())
        this.document.defaultView?.sessionStorage.setItem("id", value[0].id)
        this.document.defaultView?.sessionStorage.setItem("adminName", value[0].username)
        this.document.defaultView?.sessionStorage.setItem("password", value[0].password)
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
