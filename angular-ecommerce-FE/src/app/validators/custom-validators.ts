import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  //whitespace validation
  static notOnlyWhitespace(control: AbstractControl): ValidationErrors | null {
    if (control.value != null && control.value.trim().length === 0) {
      //validation error key used by html template
      return { notOnlyWhitespace: true };
    } else {
      return null;
    }
  }
}
