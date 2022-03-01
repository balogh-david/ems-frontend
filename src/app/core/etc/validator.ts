import { AbstractControl, ValidatorFn } from "@angular/forms";


/**
 * Validálások osztálya.
 * @export
 */
export default class Validation {

  static emailPattern: string = "[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{1,4}$";
  static passwordPattern: string = "(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z]).*$"

  /**
   * Két mező megerősítésének validálása.
   * @param {string} controlName - Első mező.
   * @param {string} checkControlName - Második mező, amelynek matchelnie kell.
   * @return {ValidatorFn}
   * @static
   */
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl) => {
      switch (abstractControl.get(controlName)?.value) {
        case abstractControl.get(checkControlName)?.value:
          return null;
        default:
          abstractControl.get(checkControlName)?.setErrors({ notMatch: true });
          return { notMatch: true };
      }
    };
  }
}
