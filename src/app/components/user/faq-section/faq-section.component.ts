import { Component, ElementRef, ViewChildren } from '@angular/core';
import { Faq } from '../../../core/models/interfaces/interfaces';

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [],
  templateUrl: './faq-section.component.html',
  styleUrl: './faq-section.component.scss'
})
export class FaqSectionComponent {
  faqArray : Faq[] = [
    {
      id: 1,
      title: "How does it work?",
      description: "Simply browse our menu, choose your favorite pizzas, and place your order online or by phone. We'll start preparing your meal right away and have it hot and ready for pickup or delivery."
    },
    {
      id: 2,
      title: "How long does it take for delivery?",
      description: "Delivery times can vary based on your location and order volume, but we typically deliver within 30-45 minutes. We aim to get your pizza to you as quickly and freshly as possible!"
    },
    {
      id: 3,
      title: "Can I order for huge parties?",
      description: "Absolutely! We cater to events of all sizes. For large orders, we recommend calling at least 24 hours in advance so we can ensure your food is prepared and delivered on time."
    },
    {
      id: 4,
      title: "How much protein it contains?",
      description: "The protein content varies by pizza depending on the toppings. For example, a slice of our classic pepperoni pizza contains approximately 12 grams of protein. Check our nutritional information for details on each pizza."
    },
    {
      id: 5,
      title: "Is it cooked with oil?",
      description: "Our pizzas are lightly brushed with olive oil for flavor. We use high-quality ingredients and traditional baking methods to ensure a delicious and authentic taste without excess oil."
    }
  ]
  

  activeFaqId: number = 1

  @ViewChildren('faqContainer', { read: ElementRef })
  faqContainer!: ElementRef[];

  faqContainerArray: ElementRef[] = []
  ngAfterViewInit(): void {
    this.faqContainer.map((value) => {
      this.faqContainerArray.push(value)
    })

    this.faqContainerArray[this.activeFaqId - 1].nativeElement.classList.add("active")
  }

  activateFaq(faq: Faq) {
    if(this.activeFaqId === faq.id) {
      return;  
    }
    this.faqContainerArray[this.activeFaqId - 1].nativeElement.classList.remove("active")
    this.faqContainerArray[faq.id - 1].nativeElement.classList.add("active")
    this.activeFaqId = faq.id
  }
}
