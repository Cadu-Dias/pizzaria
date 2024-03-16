import { Component, Signal, signal } from '@angular/core';
import { AboutContainerComponent } from '../about-container/about-container.component';
import { AboutContainer } from '../../../core/models/interfaces/interfaces';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [AboutContainerComponent, NgFor],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.scss'
})
export class AboutSectionComponent {
  aboutContainersArray : Signal<AboutContainer[]> = signal([
    {
      imageURL: "assets/images/about-1.svg",
      title: "Made With Love",
      description: "Our pizzas are handcrafted with the freshest ingredients and a passion for great food. From our homemade dough to our vine-ripened tomato sauce, every pizza is made with care and love.",
      buttonText: "Our Menu"
    },
    {
      imageURL: "assets/images/about-2.svg",
      title: "30 minutes delivery",
      description: "Hungry for pizza? We've got you covered with our speedy delivery service. Order now and enjoy a piping hot pizza delivered straight to your door in 30 minutes or less!",
      buttonText: "Our Menu"
    },
    {
      imageURL: "assets/images/about-3.svg",
      title: "Share with friends",
      description: "Pizza is best when shared with friends and family. Whether you're celebrating a special occasion or just enjoying a night in, our pizzas are the perfect way to bring everyone together.",
      buttonText: "Our Menu"
    }
  ])
}
