export default class HTML {

  constructor() {

  }

  static stripTags( html ) {
    var tmp = document.createElement( "DIV" );
    tmp.innerHTML = text;
    return tmp.textContent || tmp.innerText || "";
  }

}