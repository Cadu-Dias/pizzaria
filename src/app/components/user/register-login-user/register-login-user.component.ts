import { Component, EventEmitter, OnInit, Output, WritableSignal, signal } from '@angular/core';
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
export class RegisterLoginUserComponent implements OnInit{

  @Output() closePageEvent : EventEmitter<void> = new EventEmitter();
  @Output() registerUserEvent: EventEmitter<User> = new EventEmitter();
  @Output() loginUserEvent: EventEmitter<User> = new EventEmitter();

  isLogged: WritableSignal<boolean> = signal(false);
  username: string = sessionStorage.getItem("userName") as string;

  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
    if(sessionStorage.getItem("userName") !== null) {
      this.isLogged.set(true)
    }
  }

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
    this.isLogged.set(false)
  }
}
