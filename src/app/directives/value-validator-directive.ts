import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

@Directive({
  selector: '[valueMustBePositiveIntegerOrNo]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ValueValidatorDirective,
      multi: true,
    },
  ],
})
export class ValueValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return this.valueValidaor()(control);
  }

  valueValidaor(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (
        (Number(control.value) > 0 &&
          Number.isInteger(Number(control.value))) ||
        control.value === 'Brak'
      ) {
        return null;
      }
      return { forbiddenValue: { value: control.value } };
    };
  }
}
