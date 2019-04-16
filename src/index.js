import extend from 'extend';
import Sizzle from 'sizzle';

"use strict";

class GoatCurry {

  constructor( options = {} ) {
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
    if( this.editor.length ) {
      this.editor.forEach( (e, i) => {
        e.addEventListener( 'click', () =>  this.handleClick() );
      });
    }
  }

  handleClick(e) {
    console.log( arguments )
  }

  addEditableArea() {
    if( this.editor.length ) {
      console.log( this.editor[0] );
      var node = document.createElement( "div" );
      node.setAttribute( 'contenteditable', true );
      node.classList.add( 'block' );
      this.editor[0].appendChild( node );
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