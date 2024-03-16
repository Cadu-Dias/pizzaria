import { Directive, HostBinding, InputSignal, input } from '@angular/core';

@Directive({
  selector: '[appBackgroundImage]',
  standalone: true
})
export class BackgroundImageDirective {

  constructor() { }

  backgrundImageUrl: InputSignal<string> = input.required<string>();

  @HostBinding('style.background-image') backgroundContent!: string

  ngOnInit() : void {
    this.backgroundContent = `url(${this.backgrundImageUrl()})`
  }

}
