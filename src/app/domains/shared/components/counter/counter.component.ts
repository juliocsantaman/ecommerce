import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent implements OnChanges {
  @Input({required: true}) duration: number = 0;
  @Input({required: true}) message: string = '';

  constructor() {
    // No async.
    // Before render. 
    console.group('constructor');
    console.log('constructor');
    console.groupEnd();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Before, during and after the render.
    console.group('ngOnChanges');
    console.log('changes', changes);
    console.groupEnd();
  }

}
