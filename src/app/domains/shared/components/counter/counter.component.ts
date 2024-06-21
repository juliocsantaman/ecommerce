import { Component, Input, OnChanges, SimpleChanges, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  @Input({ required: true }) duration: number = 0;
  @Input({ required: true }) message: string = '';

  constructor() {
    // No async.
    // Before render. 
    console.group('constructor');
    console.log('constructor');
    console.groupEnd();
  }

  ngOnInit(): void {
    // after render.
    // one time.
    // async, then, subscribes.
    console.group('ngOnInit');
    console.log('duration', this.duration);
    console.log('message', this.message);
    console.groupEnd();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Before, during and after the render.
    console.group('ngOnChanges');
    console.log('changes', changes);
    console.groupEnd();
  }

  ngAfterViewInit(): void {
    // after render.
    // if children already render.
    console.group('ngAfterViewInit');
    console.log('');
    console.groupEnd();
  }

  ngOnDestroy(): void {
    console.group('ngOnDestroy');
    console.log('');
    console.groupEnd();
  }

}
