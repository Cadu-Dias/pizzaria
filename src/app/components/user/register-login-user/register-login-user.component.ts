import { Component, EventEmitter, Output } from '@angular/core';
import { AccountFormComponent } from '../../../shared/components/account-form/account-form.component';
import { NgIf } from '@angular/common';
import { User } from '../../../core/models/interfaces/interfaces';
import { Router } from 'express';

@Component({
  selector: 'app-register-login-user',
  standalone: true,
  imports: [ AccountFormComponent, NgIf ],
  templateUrl: './register-login-user.component.html',
  styleUrl: './register-login-user.component.scss'
})
export class RegisterLoginUserComponent {

  @Output() closePageEvent : EventEmitter<void> = new EventEmitter();
  @Output() registerUserEvent: EventEmitter<User> = new EventEmitter();
  @Output() loginUserEvent: EventEmitter<User> = new EventEmitter();

  isLogged: boolean = sessionStorage.getItem("userName") !== null? true : false;
  username: string = sessionStorage.getItem("userName") as string;

  constructor(
    private router: Router
  ){}

  closePage() {
    this.closePageEvent.emit()
  }

  loginUser(user: User) {
    this.loginUserEvent.emit(user)
  }

  registerUser(user: User) {
    this.registerUserEvent.emit(user)
  }

  logout() {
    sessionStorage.removeItem("userId")
    sessionStorage.removeItem("userName")
    window.location.replace("/user")
   
  }
}
