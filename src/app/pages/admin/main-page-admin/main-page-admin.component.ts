import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-page-admin',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './main-page-admin.component.html',
  styleUrl: './main-page-admin.component.scss'
})
export class MainPageAdminComponent {
  @ViewChild('profileBox', { read: ElementRef, static:false })
  profileBox!: ElementRef;

  profileName : string = sessionStorage.getItem("adminName") as string;
  isProfileBoxVisible : boolean = false

  constructor(
    private router: Router,
  ) {}

  setViewProfileBox() {
    if(this.isProfileBoxVisible)
    {
      this.isProfileBoxVisible = false
      this.profileBox.nativeElement.style = 'display: hidden'
      return;
    }
    this.isProfileBoxVisible = true
    this.profileBox.nativeElement.style = 'visibility: visible'
  }

  goUpdateProfilePage() {
    this.router.navigate(["admin/home/admins/update/", sessionStorage.getItem("id")])
  }

  logout() {
    sessionStorage.clear()
    this.router.navigate(["admin/login"])
  }
}
