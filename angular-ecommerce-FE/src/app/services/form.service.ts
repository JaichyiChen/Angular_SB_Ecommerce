import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  getCreditCardMonths(): Observable<number[]> {
    let data: number[] = [];

    //build an array for Month dropdown list

    for (let i = 1; i <= 12; i++) {
      data.push(i);
    }
    //need to return obeservable
    //wrapping static data
    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {
    const startYear = new Date().getFullYear();
    const endYear = startYear + 10;
    let data: number[] = [];

    for (let i = startYear; i <= endYear; i++) {
      data.push(i);
    }

    return of(data);
  }
}
