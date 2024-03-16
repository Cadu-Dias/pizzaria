import { Component, signal } from '@angular/core';
import { BannerInformation } from '../../../core/models/interfaces/interfaces';
import { BackgroundImageDirective } from '../../../shared/directives/background-image.directive';

@Component({
  selector: 'app-banner-section',
  standalone: true,
  imports: [ BackgroundImageDirective ],
  templateUrl: './banner-section.component.html',
  styleUrl: './banner-section.component.scss'
})
export class BannerSectionComponent {
  
  bannerBackgroundImage = signal<string>('assets/images/home-bg.jpg')

  banner: Array<BannerInformation> = [
    {
      title: "Homemade Pepperoni Pizza",
      imageUrl: "assets/images/home-img-1.png" 
    },
    {
      title: "Pizza With Mushrooms",
      imageUrl: "assets/images/home-img-2.png" 
    },
    {
      title: "Mascarpone And Mushrooms",
      imageUrl: "assets/images/home-img-3.png" 
    },
  ]
  
  selectedBannerInformation : BannerInformation = this.banner[0]
  index: number = 0;

  next() {
    this.index = (this.index + 1) % this.banner.length
    this.selectedBannerInformation = this.banner[this.index]
    
  }

  previous() {
    this.index = (this.index - 1 + this.banner.length) % this.banner.length
    this.selectedBannerInformation = this.banner[this.index]
  }
}
