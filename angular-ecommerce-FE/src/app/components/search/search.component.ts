import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  keyWord: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    this.router.navigateByUrl(`/search/${this.keyWord}`);
  }
}
