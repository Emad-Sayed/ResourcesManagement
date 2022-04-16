import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toAlphaMonth'
})
export class ToAlphaMonthPipe implements PipeTransform {

  transform(value: any): any {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return monthNames[value-1];
  }

}
