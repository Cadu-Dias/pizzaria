import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Admin, User } from '../../../core/models/interfaces/interfaces';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-account-container',
  standalone: true,
  imports: [ NgIf ],
  templateUrl: './account-container.component.html',
  styleUrl: './account-container.component.scss'
})
export class AccountContainerComponent {
  @Input() adminAccount!: Admin
  @Input() userAccount!: User;
  @Input() accountType: string = '';
  @Input() isForRegisterAdmin: boolean = false;
  @Output() registerAdminEvent : EventEmitter<void> = new EventEmitter();
  @Output() deleteAccountEvent: EventEmitter<string> = new EventEmitter();
  isAdminAccount!: boolean;

  constructor(
    private router: Router 
  ) {}
  
  ngOnInit(): void {
    if(this.adminAccount) {
      this.isAdminAccount = sessionStorage.getItem("id") === this.adminAccount.id
    }
  }
  registerAdmin() {
    this.registerAdminEvent.emit()
  }

  deleteAccount() {
    if(this.accountType.includes("admin")) {
      this.deleteAccountEvent.emit(this.adminAccount.id);
      if(this.isAdminAccount) {
        this.router.navigate(["admin/login"])
        sessionStorage.clear()
      }
      return;
    }
    this.deleteAccountEvent.emit(this.userAccount.id);
  }
  
  goUpdateProfilePage() {
    this.router.navigate(["admin/home/update/profile/", sessionStorage.getItem("id")])
  }
}
