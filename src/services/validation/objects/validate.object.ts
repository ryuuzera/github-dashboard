import { IValidate } from '../validate.interface';

class EmptyObjectValidate implements IValidate {
  public validate(object: Object) {
    for (let prop in object) {
      if (object.hasOwnProperty(prop)) {
        return false;
      }
    }
    return true;
  }
}

export default EmptyObjectValidate;
