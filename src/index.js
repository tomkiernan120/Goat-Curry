import extend from 'extend';
import Sizzle from 'sizzle';
import sanitize from 'sanitize-html';

"use strict";

class GoatCurry {

  constructor( options = {} ) {
    var self = this;
    this.options = {};
    this.editor = {};
    this.contentAreas = [];
    this.options.selector = '';
    this.version = this.options.version = "1.0.0";
    this.options = extend( true, this.options, options );
    this.outputJSON = [];
    this.init();
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


  sizzle( selector ) {
    if( !GoatCurry.isString( selector ) ) {
      throw new Error( `The selector you are using is not of the type string: ${selector}` );
    }
    return Sizzle( selector );
  } 

  doNothing() {
    console.log( 'Consider nothing done!' );
  }

  bindEvents() {
    var self = this;
    if( this.editor.length ) {
      this.editor.forEach( (e, i) => {
        e.addEventListener( 'click', () =>  this.handleClick( event, this ) );
      });
    }
  }

  handleClick( event, GoatCurry ) {

    if( event.target.classList.contains( "editor" ) && event.target.children.length ) {
      for( var n of event.target.children ) {
        if( !n.children.length && !n.innerHTML ) {
          n.remove();
        }
      }

      var lastItem = event.target.children.item( event.target.children.length - 1 );

      if( lastItem ) {

        var position = GoatCurry.getPosition( lastItem );
        
        if( position.y  ) {

          var height = position.y + lastItem.offsetHeight;
          var clickPositions = this.getClickPosition( event );

          if( height < clickPositions.y ) {
            this.addEditableArea()
          }

        }

      }

    }
    else if( !event.target.classList.contains( 'block' ) ) {
      GoatCurry.addEditableArea();
    }
  }

  handleInput( event, GoatCurry ) {
    var elem = event.target;
    var value = elem.innerHTML;
  }

  getClickPosition( event ) {
    event = event || window.event;

    var pageX = event.pageX;
    var pageY = event.pageY;

    if( pageX === undefined ) {
      pageX = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      pageY = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return { x: pageX, y: pageY };
  }

  addEditableArea() {
    if( this.editor.length ) {
      console.log( this.editor[0] );
      var node = document.createElement( "div" );
      node.setAttribute( 'contenteditable', true );
      node.classList.add( 'block' );
      node.addEventListener( 'input', () => this.handleInput( event, this ) );
      node.addEventListener( 'focus', () => this.handleFocus( event, this ) );
      node.addEventListener( 'blur', () => this.handleBlur( event, this ) );
      this.editor[0].appendChild( node );
      node.focus();
    }
  }

  handleFocus( event, GoatCurry ) {
    if( thi )
  }

  handleBlur( event, GoatCurry ) {
    var elem = event.target;
    var value = elem.innerHTML;
    var cleanValue = sanitize( value );
    elem.innerHTML = cleanValue;
  }

  getPosition( element ) {
    var xPosition = 0;
    var yPosition = 0;

    while( element ) {
      xPosition += ( element.offsetLeft - element.scrollLeft + element.clientLeft );
      yPosition += ( element.offsetTop - element.scrollTop + element.clientTop );
      element = element.offsetParent;
    }

    return { x: xPosition, y: yPosition };
  }

  init() {
    if( this.options.selector ) {
      this.editor = this.sizzle( this.options.selector );

      if( this.editor.length ) {
        for( var i = 0; i < this.editor.length; i++ ) {

          let domEl = this.editor[i];

          if( domEl.children.length ) {
            // instantiate editableness
          }
          else {

          }

          this.bindEvents();
        } 
      }
    } 
  }

  garbageCollection() {



  }

}

export default GoatCurry;