import { Component, InputSignal, input } from '@angular/core';
import { DashboardContainer } from '../../../core/models/interfaces/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-container',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-container.component.html',
  styleUrl: './dashboard-container.component.scss'
})
export class DashboardContainerComponent {
  containerInfo : InputSignal<DashboardContainer> = input.required<DashboardContainer>();

  constructor(
    private router: Router
  ) {}

  redirectTo() {
    this.router.navigate([`/admin/home/${this.containerInfo().redirectRoute}`])
  }
}
