import { Component, EventEmitter, Input, Output } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Admin, User } from '../../../core/models/interfaces/interfaces';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, UpperCasePipe
  ],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.scss'
})
export class AccountFormComponent {
  @Input({required: true}) formType!: string;
  @Input({required: true}) accountType!: string;
  @Input({required: true}) formTitle!: string;
  @Input({required: true}) buttonText!: string;
  @Output() adminFormEvent: EventEmitter<Admin> = new EventEmitter;
  @Output() userFormEvent: EventEmitter<User> = new EventEmitter;
  formAccount!: FormGroup;
  adminObject: Admin = {
    id: "",
    username: "",
    password: ""
  };
  userObject: User = {
    id: "",
    email: "",
    username: "",
    password: ""
  };; 

  constructor(
    private formAccountBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formAccount = this.formAccountBuilder.group({
      username: ["", Validators.compose([
        this.accountType.includes('admin') || this.formType.includes("register")? Validators.required: null,
        Validators.pattern(/(.|\s)*\S(.|\s)*/)
      ])],
      email: ["", Validators.compose([
        this.accountType.includes('user')? Validators.required: null,
        Validators.email,
        Validators.pattern(/(.|\s)*\S(.|\s)*/)
      ])],
      password: ["", Validators.compose([
        Validators.pattern(/(.|\s)*\S(.|\s)*/)
      ])],
      newPassword: ["", Validators.compose([
          this.formType.includes('update')? Validators.required: null,
          Validators.pattern(/(.|\s)*\S(.|\s)*/)
        ])
      ],
      confirmPassword: ["", Validators.compose([
          this.formType.includes('update') || this.formType.includes('register') ? Validators.required: null,
          Validators.pattern(/(.|\s)*\S(.|\s)*/)
        ])
      ]
    })
    
  }

  formAction() {
    if(this.formAccount.valid) {
      if(this.accountType ==="admin" && this.formType ==="login") {
        this.adminObject.username = this.formAccount.value["username"];
        this.adminObject.password = this.formAccount.value["password"];
        this.adminFormEvent.emit(this.adminObject);
      }
      else if(this.accountType ==="admin" && this.formType ==="update") {
          if(
            this.formAccount.value["newPassword"] === this.formAccount.value["confirmPassword"] 
            && this.formAccount.value["password"] === 'sessionStorage.getItem("password")'
            ) {
            this.adminObject.id = 'sessionStorage.getItem("id") as string';
            this.adminObject.password = this.formAccount.value["newPassword"];
            this.adminObject.username = this.formAccount.value["username"];
            this.adminFormEvent.emit(this.adminObject);
          }
      }
      else if(this.accountType ==="admin" && this.formType ==="register")
      {
        if(this.formAccount.value["password"] === this.formAccount.value["confirmPassword"]) {
          this.adminObject.id = uuid();
          this.adminObject.username = this.formAccount.value["username"];
          this.adminObject.password = this.formAccount.value["password"];
          this.adminFormEvent.emit(this.adminObject);
        }
      }
      else if(this.accountType ==="user" && this.formType ==="login")
      {
        this.userObject.email = this.formAccount.value["email"];
        this.userObject.password = this.formAccount.value["password"];
        this.userFormEvent.emit(this.userObject)
      }
     else if(this.accountType ==="user" && this.formType ==="register")
      {
        if(this.formAccount.value["password"] === this.formAccount.value["confirmPassword"]) {
          this.userObject.id = uuid();
          this.userObject.username = this.formAccount.value["username"];
          this.userObject.email = this.formAccount.value["email"];
          this.userObject.password = this.formAccount.value["password"];
          this.userFormEvent.emit(this.userObject);
        }
      }
    }
  }
}
