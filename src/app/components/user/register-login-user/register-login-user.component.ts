import { Component, EventEmitter, Inject, OnInit, Output, WritableSignal, signal } from '@angular/core';
import { AccountFormComponent } from '../../../shared/components/account-form/account-form.component';
import { User } from '../../../core/models/interfaces/interfaces';
import { Router } from 'express';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-register-login-user',
  standalone: true,
  imports: [ AccountFormComponent ],
  templateUrl: './register-login-user.component.html',
  styleUrl: './register-login-user.component.scss'
})
export class RegisterLoginUserComponent implements OnInit{

  @Output() closePageEvent : EventEmitter<void> = new EventEmitter();
  @Output() registerUserEvent: EventEmitter<User> = new EventEmitter();
  @Output() loginUserEvent: EventEmitter<User> = new EventEmitter();

  isLogged: WritableSignal<boolean> = signal(false);
  username: WritableSignal<string | null> = signal(null);

  constructor(
    @Inject(DOCUMENT) private document : Document
  ) {
    const sessionStorage = document.defaultView?.sessionStorage;
    if (sessionStorage) {
      const username = sessionStorage.getItem('userName');
      if (username) {
        this.username.set(username)
      }
    }
  }

  ngOnInit(): void {
    if(this.username()) {
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
    this.document.defaultView?.sessionStorage.removeItem("userName")
    this.document.defaultView?.sessionStorage.removeItem("userId")
    this.isLogged.set(false)
    this.username.set(null)
  }
}
