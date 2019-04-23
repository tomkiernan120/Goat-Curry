export default class Helper {

  constructor() {

  }

  static preventProp( event ) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  static isString( input ) {
    return typeof input === "string";
  }

  static isPlainObject( val ) {
    return !!val && typeof val === 'object' && val.constructor === object;
  }

  static isBrowser() {
    return ![typeof window, typeof document].includes( 'undefined' );
  }

  static isValidJSON( str ) {
    try{
      JSON.parse( str );
      return true;
    }
    catch( e ) {
      return false;
    }
  }

  static isArray( val ) {
    return Array.isArray( val );
  }

  static getClickPosition( event ) {
    event = event || window.event;

    const pageX = event.pageX;
    const pageY = event.pageY;

    if( pageX === undefined ) {
      pageX = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      pageY = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return { x: pageX, y: pageY };
  }

}