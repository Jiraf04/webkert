import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datumFormat'
})
export class DatumFormatPipe implements PipeTransform {

  transform(value: any): any {
    if (!value) return '';

    const parts = value.split('T');
    const datePart = parts[0].split('-');
    const timePart = parts[1].slice(0, -1).split(':');

    const year = parseInt(datePart[0]);
    const month = parseInt(datePart[1]) - 1; // JavaScript hónapok 0-tól számolódnak
    const day = parseInt(datePart[2]);
    const hour = parseInt(timePart[0]);
    const minute = parseInt(timePart[1]);

    const formattedDate = new Date(year, month, day, hour, minute);
    return formattedDate.toLocaleString();
  }
}
