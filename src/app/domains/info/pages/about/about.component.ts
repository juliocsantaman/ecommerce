import { Component, signal } from '@angular/core';
import { CounterComponent } from '../../../shared/components/counter/counter.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CounterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  duration = signal(5);
  message = signal('This is a message');

  changeDuration(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.duration.set(input.valueAsNumber);
  }

  
  changeMessage(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.message.set(input.value);
  }

}
