import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@utils/functions';

@Pipe({
    name: 'formatDate',
    standalone: true
})

export class FormatDatePipe implements PipeTransform {

  transform(value: string, format: string = 'd/m/Y'): string {
    return formatDate(value, format);
  }

}
