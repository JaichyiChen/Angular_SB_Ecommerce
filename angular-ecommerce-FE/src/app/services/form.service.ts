import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { Observable } from 'rxjs';
import { Country } from '../models/country';
import { State } from '../models/state';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private countriesUrl = 'http://localhost:8081/api/countries';
  private stateUrl = 'http://localhost:8081/api/states';

  constructor(private httpClient: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.httpClient
      .get<GetResponseCountries>(this.countriesUrl)
      .pipe(map((data) => data._embedded.countries));
  }

  getStates(theCountryCode: String): Observable<State[]> {
    //search url
    const searchStateUrl = `${this.stateUrl}/search/findByCountryCode?code=${theCountryCode}`;

    return this.httpClient
      .get<GetResponseStates>(searchStateUrl)
      .pipe(map((data) => data._embedded.states));
  }

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

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  };
}
interface GetResponseStates {
  _embedded: {
    states: State[];
  };
}
