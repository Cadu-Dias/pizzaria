import { Component, InputSignal, OnInit, input, ɵINPUT_SIGNAL_BRAND_WRITE_TYPE } from '@angular/core';
import { AboutContainer } from '../../../core/models/interfaces/interfaces';

@Component({
  selector: 'app-about-container',
  standalone: true,
  imports: [],
  templateUrl: './about-container.component.html',
  styleUrl: './about-container.component.scss'
})
export class AboutContainerComponent {
  aboutInformation : InputSignal<AboutContainer> = input.required<AboutContainer>()
}
