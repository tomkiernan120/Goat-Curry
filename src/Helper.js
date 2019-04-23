export default class Helper {

  constructor() {

  }

  static preventProp( event ) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

}