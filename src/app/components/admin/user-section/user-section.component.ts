import { Component, OnDestroy, OnInit, WritableSignal, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../../core/models/interfaces/interfaces';
import { UserService } from '../../../core/services/accounts/user/user.service';
import { AccountContainerComponent } from '../account-container/account-container.component';

@Component({
  selector: 'app-user-section',
  standalone: true,
  imports: [AccountContainerComponent],
  templateUrl: './user-section.component.html',
  styleUrl: './user-section.component.scss'
})
export class UserSectionComponent implements OnInit, OnDestroy{
  subscription : Subscription = new Subscription();
  userArray: WritableSignal<User[]> = signal([])

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.subscription = this.userService.getUsers().subscribe(
      (value) => this.userArray.set(value)
    )      
  }

  deleteAccount(userId: string) {
    let item = this.userArray().filter(user => user.id === userId)
    let indexOf = this.userArray().indexOf(item[0]);
    this.userArray.update(
      userArray => {
        userArray.splice(indexOf, 1)
        return userArray
      }
    )
    this.subscription = this.userService.deleteAccount(userId).subscribe()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
