import "@babel/polyfill";
import extend from 'extend';
import Sizzle from 'sizzle';
import sanitizeHtml from 'sanitize-html';
import Helper from './Helper';
import Modules from './Modules';
import HTML from './HTML';

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
    this.modules = new Modules( this.options );
    this.activeContextMenu = false;
    if( !options.update && typeof options.update === "function" ) {
      this.update = options.update;
    }
    this.buttonDown = false;
  }

  sizzle( selector ) {
    if( !Helper.isString( selector ) ) {
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

      document.addEventListener( "click", () => this.documentClick( event, this ) );
    }
  }

  handleClick( event, GoatCurry ) {
    Helper.preventProp(event);
    var target = event.target;

    if( !target ) {
      return false;
    }

    if( Helper.parentContainsClass( target, 'editor_button' )) {
      return false;
    }

    if( target.classList.contains( "editor" ) && target.children.length ) {

      this.garbageCollection( target );

      var lastItem = target.children.item( event.target.children.length - 1 );

      if( lastItem ) {      
        var position = GoatCurry.getPosition( lastItem );        
        var height = position.y + lastItem.offsetHeight;
        var clickPositions = Helper.getClickPosition( event );

        if( ( height + 10 ) < clickPositions.y ) {
          this.addEditableArea()
        }
      }
    }
    else if( !Helper.parentContainsClass( target, 'block' ) ) {
      this.addEditableArea();
    }
  }

  handleInput( event, GoatCurry ) {
    var elem = event.target;
    var blockIndex = elem.dataset.blockindex;
    var value = elem.innerHTML;

    if( blockIndex && this.outputJSON.blocks.length && this.outputJSON.blocks[blockIndex] ){

      this.outputJSON.blocks[blockIndex].data.text = sanitizeHtml( value, { allowedTags: [] } );
      this.jsonUpdated();
    }

  }



  addEditableArea() {

    var self = this;
    if( this.editor.length ) {

      var wrapper = document.createElement( "div" );
      wrapper.classList.add( "block_wrapper" );
      wrapper.dataset.blockindex = this.outputJSON.blocks.length;

      var optionButton = document.createElement( "button" );

      optionButton.dataset.blockindex = this.outputJSON.blocks.length;
      optionButton.classList.add( "editor_button" );

      var moveOptions = document.createElement( "button" );

      optionButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30" style=" fill:inherit;"><path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M21,16h-5v5 c0,0.553-0.448,1-1,1s-1-0.447-1-1v-5H9c-0.552,0-1-0.447-1-1s0.448-1,1-1h5V9c0-0.553,0.448-1,1-1s1,0.447,1,1v5h5 c0.552,0,1,0.447,1,1S21.552,16,21,16z"></path></svg>';

      optionButton.style.cssText = "position:absolute;left:-40px;top: 50%; transform: translateY( -50% ); cursor:pointer;z-index: 999999999; background: transparent; border: 0;";
      optionButton.classList.add( "editor_button" );
      optionButton.addEventListener( 'click', function(event) {
        Helper.preventProp(event);
        self.buttonDown = true;
      });

      moveOptions.style.cssText = "position:absolute;right:-40px;top:50%;transform:translateY( -50% ); z-index: 99999999; background: transparent; border: 0;";
      moveOptions.classList.add( "editor_button" );
      moveOptions.addEventListener( 'click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        self.buttonDown = true;
        self.modules.handleMoveClick( event, this, self );
      })

      moveOptions.addEventListener( "mouseenter", function(e) {
        this.style.fill = "blue";
      });

      moveOptions.addEventListener( "mouseleave", function(e) {
        this.style.fill = "black";
      });      

      optionButton.addEventListener( "mouseenter", function(e) {
        this.style.fill = "blue";
      });

      optionButton.addEventListener( "mouseleave", function(e) {
        this.style.fill = "black";
      });

      moveOptions.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30" style=" fill:inherit;"><path style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;block-progression:tb;isolation:auto;mix-blend-mode:normal" d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z" font-weight="400" font-family="sans-serif" white-space="normal" overflow="visible"></path></svg>';

      var node = document.createElement( "div" );
      node.setAttribute( 'contenteditable', true );
      node.classList.add( 'block' );
      node.addEventListener( 'input', () => this.handleInput( event, this ) );
      node.addEventListener( 'focus', () => this.handleFocus( event, this ) );
      node.addEventListener( 'blur', () => this.handleBlur( event, this ) );
      node.dataset.blockindex = this.outputJSON.blocks.length;
      this.editor[0].appendChild( optionButton );

      wrapper.appendChild( optionButton );
      wrapper.appendChild( node );
      wrapper.appendChild( moveOptions );

      this.editor[0].appendChild( wrapper );
      this.outputJSON.blocks.push( { "type": "paragraph", "data" : { "text" : "" } } );
      this.jsonUpdated();
      node.focus();
    }
  }

  handleFocus( event, GoatCurry ) {
    var elem = event.target;
    var button = elem.previousSibling;
    button.style.display = "block";
    var moveOptions = elem.nextSibling;

    if( moveOptions.nodeName === "DIV" ) {
      moveOptions.remove();
      moveOptions = elem.nextSibling();
    }

    moveOptions.style.display = "block";
  }

  handleBlur( event, GoatCurry ) {
    var elem = event.target;
    var value = elem.innerHTML;
    var cleanValue = sanitizeHtml( HTML.stripTags(value), { allowedTags: [] } );
    elem.innerHTML = cleanValue;
    var optionButton = elem.previousSibling;
    var moveOptions = elem.nextSibling;

    if( moveOptions.nodeName === "DIV" ) {
      moveOptions.remove();
    }

    moveOptions = elem.nextSibling;

    if( moveOptions.classList.contains( "active" ) ){
      moveOptions.classList.remove( "active" );
    }

    this.modules.handleBlur( event, elem, GoatCurry );

    setTimeout( function() {
      if( !GoatCurry.buttonDown ) {
        optionButton.style.display = "none";
        moveOptions.style.display = "none";
      }
      GoatCurry.buttonDown = false;
    }, 600);
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
    if( !this.options.selector ) {
      throw new Error( `Please use css selector to set the editor instance` );
    }

    this.editor = this.sizzle( this.options.selector );

    if( this.editor.length ) { // TODO: extend so you can have multiple instances;
        this.bindEvents();
    }
  }

  garbageCollection( target ) { 

    if( !target ) {
      console.error( `Could not find ${target}` );   
    }

    var children = target.children;
    var removed = [];
    for (let item of children) {
      if( !item.children[1].children.length && !item.children[1].innerHTML.trim() ){
        removed.push( item.dataset.blockindex );
        item.remove();
      }
    }

    if( removed.length ) {
      removed.forEach( ( e, i ) => {
        if( this.outputJSON.blocks[ e ] ) {
          this.outputJSON.blocks.splice( e, 1 );
          this.jsonUpdated();
        }
      });
    }
  }

  update() {
    
  }

  jsonUpdated() {
    var d = new Date();
    this.outputJSON.time = d.getTime();
    this.update();
  }

}


export default GoatCurry;