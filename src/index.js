"use strict";

export default class GoatCurry {

  constructor( options = {} ) {
    this.options = options;
  }

  get options () {
    return this.options();
  }

}