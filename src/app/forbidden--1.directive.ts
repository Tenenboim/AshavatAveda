import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidatorFn } from '@angular/forms';

// @Directive({
//   selector: '[appForbidden1]',
//   providers: [{provide: NG_VALIDATORS, useExisting: Forbidden1Directive, multi: true}]
// })
// // export class Forbidden1Directive implements Validator {
// //   @Input('appForbiddenName') forbiddenName: string;
 
// //   validate(control: AbstractControl): {[key: string]: any} | null {
// //     return this.forbiddenName ? forbiddenNameValidator(new RegExp(this.forbiddenName, 'i'))(control)
// //                               : null;
// //   }

// // }
// export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
//   return (control: AbstractControl): {[key: string]: any} | null => {
//     const forbidden = nameRe.test(control.value);
    
//     return forbidden ? {'forbiddenName': {value: control.value}} : null;
//   };
// }