import extend from 'extend';
import sizzle from 'sizzle';
import sanitizeHtml from 'sanitize-html';

"use strict";

class GoatCurry {

  constructor( options = {} ) {
    var d = new Date();
    var self = this;
    this.options = {};
    this.editor = {};
    this.contentAreas = [];
    this.options.selector = '';
    this.version = this.options.version = "1.0.0";
    this.options = extend( true, this.options, options );
    this.outputJSON = {
      time: d.getTime(),
      blocks: [],
      version: this.version
    };
    this.jsonUpdated();
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
    return sizzle( selector );
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
          console.log( n.dataset );
          if( this.outputJSON.blocks[ n.dataset.blockindex ] ) {
            var removed = this.outputJSON.blocks.splice( n.dataset.blockindex  , 1 );
            this.jsonUpdated();
          } 
          console.log( n );
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
    var blockIndex = elem.dataset.blockindex;
    var value = elem.innerHTML;

    if( blockIndex && this.outputJSON.blocks.length && this.outputJSON.blocks[blockIndex] ){

      this.outputJSON.blocks[blockIndex].data.text = sanitizeHtml( value );
      this.jsonUpdated();
    }

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
      node.dataset.blockindex = this.outputJSON.blocks.length;
      this.editor[0].appendChild( node );
      this.outputJSON.blocks.push( { "type": "pararaph", "data" : { "text" : "" } } );
      this.jsonUpdated();
      node.focus();
    }
  }

  handleFocus( event, GoatCurry ) {
    
  }

  handleBlur( event, GoatCurry ) {
    var elem = event.target;
    var value = elem.innerHTML;
    var cleanValue = sanitizeHtml( value );
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
    // TODO: garbage collection
  }


  jsonUpdated() {
    var d = new Date();
    this.outputJSON.time = d.getTime();
    console.log( this.outputJSON );
  }

}

export default GoatCurry;