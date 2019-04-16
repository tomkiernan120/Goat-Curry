import extend from 'extend';
import Sizzle from 'sizzle';

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
    this.init();
  }

  static isString( input ) {
    return typeof input === "string";
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

    }
    else if( !event.target.classList.contains( 'block' ) ) {
      GoatCurry.addEditableArea();
    }
  }

  handleInput( event, GoatCurry ) {
    var elem = event.target;
    var value = elem.innerHTML;
    console.log( value );
  }

  addEditableArea() {
    if( this.editor.length ) {
      console.log( this.editor[0] );
      var node = document.createElement( "div" );
      node.setAttribute( 'contenteditable', true );
      node.classList.add( 'block' );
      node.addEventListener( 'input', () => this.handleInput( event, this ) );
      this.editor[0].appendChild( node );
      node.focus();
    }
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

}

export default GoatCurry;