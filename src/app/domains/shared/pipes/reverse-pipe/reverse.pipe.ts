import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
  standalone: true
})
export class ReversePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    const reverse = value.split('').reverse().join('');
    // console.group('ReversePipe');
    // console.log('reverse', reverse);
    // console.groupEnd();
    return reverse;
  }

}
