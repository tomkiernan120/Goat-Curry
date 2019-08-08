/* eslint linebreak-style: ["error", "windows"] */
require( '@babel/polyfill' );
var extend = require( 'extend' );
var Sizzle = require( 'sizzle');
var sanitizeHtml = require('sanitize-html');
var Helper = require('./Helper');
var Modules = require('./modules');
var HTMLHandler = require('./HTMLHandler');

class GoatCurry {
  helper: Object;
  options: any;
  editor: HTMLElement[];
  contentAreas: Object[];
  version: String;
  outputJSON: any;
  prettyOutput: String;
  modules: any;
  activeContextMenu: Boolean;
  buttonDown: Boolean;
  constructor( public settings: Object = {} ) {
    const d = new Date();
    this.helper = Helper;
    this.options = {}
    this.editor = [];
    this.contentAreas = [];
    this.version = '1.0.0';
    this.options = extend(true, this.options, settings);
    this.outputJSON = {
      time: d.getTime(),
      blocks: [],
      version: this.options.version
    };
    this.prettyOutput = '';
    this.jsonUpdated();
    this.init();
    this.modules = new Modules(this);
    this.activeContextMenu = false;
    if (this.options.update && typeof this.options.update === 'function') {
      this.update = this.options.update;
    }
    this.buttonDown = false;
  }

  static sizzle( selector: string ) {
    if (!Helper.isString(selector)) {
      throw new Error(`The selector you are using is not of the type string: ${selector}`);
    }
    return Sizzle(selector);
  }

  beautify() {
    if (typeof this.outputJSON !== 'string') {
      this.prettyOutput = JSON.stringify(this.outputJSON, undefined, 2);
    }
    this.prettyOutput = this.prettyOutput.replace(/&/g, '&amp').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    this.prettyOutput = this.prettyOutput.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, (match) => {
      let cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return `<span class="${cls}">${match}</span>`;
    });
  }

  bindEvents():void {
    if (this.editor.length) {
      for( let element of this.editor ) {
        if( element instanceof HTMLElement ) {
          element.addEventListener( 'click', this.handleClick.bind( this ));
        }
      }
      // this.editor.forEach((e:Event) => {
      // });

      // document.addEventListener( "click", () => this.documentClick( event, this ) );
    }
  }

  handleClick( event: Event ):any {
    Helper.preventProp(event);
    const target = event.target as HTMLElement;

    if (!target) {
      return false;
    }

    if (Helper.parentContainsClass( target, 'editor_button') ) {
      return false;
    }

    if (target.classList.contains('editor') && target.children.length) {
      this.garbageCollection(target);
      const lastItem = <HTMLElement> target.children.item( target.children.length - 1 );
      const position = Helper.getPosition(lastItem);
      if( !lastItem ) {
        return false;
      }
      const height = position.y + lastItem.offsetHeight;
      const clickPositions = Helper.getClickPosition(event);

      if (lastItem && (height + 10) < clickPositions.y) {
        this.addEditableArea();
      }
    } else if (!Helper.parentContainsClass(target, 'block')) {
      console.log();
      this.addEditableArea();
    }
    return this;
  }

  handleInput( event: Event ):any {
    const elem = event.target as HTMLInputElement;
    if( !elem ) {
      return false;
    }
    const blockIndex = elem.dataset.blockindex;
    const value = elem.innerHTML;

    if (blockIndex && this.outputJSON.blocks.length && this.outputJSON.blocks[blockIndex]) {
      this.outputJSON.blocks[blockIndex].data.text = sanitizeHtml(value, { allowedTags: [] });
      this.jsonUpdated();
    }
  }

  addEditableArea() {
    const self = this;
    if (this.editor.length) {
      const wrapper = document.createElement('div');
      wrapper.classList.add('block_wrapper');
      wrapper.dataset.blockindex = self.outputJSON.blocks.length;

      const optionButton = document.createElement('button');

      optionButton.dataset.blockindex = self.outputJSON.blocks.length;
      optionButton.classList.add('editor_button');

      const moveOptions = document.createElement('button');

      optionButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30" style=" fill:inherit;"><path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M21,16h-5v5 c0,0.553-0.448,1-1,1s-1-0.447-1-1v-5H9c-0.552,0-1-0.447-1-1s0.448-1,1-1h5V9c0-0.553,0.448-1,1-1s1,0.447,1,1v5h5 c0.552,0,1,0.447,1,1S21.552,16,21,16z"></path></svg>';

      optionButton.style.cssText = 'position:absolute;left:-40px;top: 50%; transform: translateY( -50% ); cursor:pointer;z-index: 999999999; background: transparent; border: 0;';
      optionButton.classList.add('editor_button');
      optionButton.addEventListener('click', function (event) {
        Helper.preventProp(event);
        self.buttonDown = true;
        self.modules.handleOptionClick( event, this, self );
      });

      moveOptions.style.cssText = 'position:absolute;cursor:pointer;right:-40px;top:50%;transform:translateY( -50% ); z-index: 99999999; background: transparent; border: 0;';
      moveOptions.classList.add('editor_button');

      moveOptions.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        self.buttonDown = true;
        self.modules.handleMoveClick(event, this, self);
      });

      moveOptions.addEventListener('mouseenter', function () {
        this.style.fill = 'blue';
      });

      moveOptions.addEventListener('mouseleave', function () {
        this.style.fill = 'black';
      });

      optionButton.addEventListener('mouseenter', function () {
        this.style.fill = 'blue';
      });

      optionButton.addEventListener('mouseleave', function () {
        this.style.fill = 'black';
      });

      moveOptions.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30" style=" fill:inherit;"><path style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;block-progression:tb;isolation:auto;mix-blend-mode:normal" d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z" font-weight="400" font-family="sans-serif" white-space="normal" overflow="visible"></path></svg>';

      const node = document.createElement('div');
      node.setAttribute('contenteditable', 'true');
      node.classList.add('block');
      node.addEventListener('input', this.handleInput.bind(this));
      node.addEventListener('focus', this.handleFocus.bind(this));
      node.addEventListener('blur', this.handleBlur.bind(this));
      node.dataset.blockindex = this.outputJSON.blocks.length;
      this.editor[0].appendChild(optionButton);
      wrapper.appendChild(optionButton);
      wrapper.appendChild(node);
      wrapper.appendChild(moveOptions);
      this.editor[0].appendChild(wrapper);
      this.outputJSON.blocks.push({ type: 'paragraph', data: { text: '' } });
      this.jsonUpdated();
      node.focus();
    }
  }

  handleFocus( event: Event ) {
    const target = event.target as HTMLElement;
    const button = target.previousSibling as HTMLElement;
    if( !button ) {
      return false;
    }
    button.style.display = 'block';
    let moveOptions = target.nextSibling as HTMLElement;

    if (moveOptions.nodeName === 'DIV') {
      moveOptions.remove();
      moveOptions = target.nextSibling as HTMLElement;
    }

    moveOptions.style.display = 'block';
    return this;
  }

  handleBlur( event: Event ):void {
    const elem = event.target as HTMLElement;
    const value = elem.innerHTML;
    const cleanValue = sanitizeHtml(HTMLHandler.stripTags(value), { allowedTags: [] });
    elem.innerHTML = cleanValue;
    const optionButton = elem.previousSibling as HTMLElement;
    let moveOptions = elem.nextSibling as HTMLElement;

    if (moveOptions.nodeName === 'DIV') {
      moveOptions.remove();
    }

    moveOptions = elem.nextSibling as HTMLElement;

    if (moveOptions.classList.contains('active')) {
      moveOptions.classList.remove('active');
    }

    this.modules.handleBlur(event, elem, this);

    setTimeout(() => {
      if (!this.buttonDown) {
        optionButton.style.display = 'none';
        moveOptions.style.display = 'none';
      }
      this.buttonDown = false;
    }, 600);
  }

  init() :void {
    if ( !this.options.selector ) {
      throw new Error('Please use css selector to set the editor instance');
    }

    this.editor = GoatCurry.sizzle(this.options.selector);

    if (this.editor.length) { // TODO: extend so you can have multiple instances;
      this.bindEvents();
    }
    return;
  }

  garbageCollection( target: HTMLElement ) {
    const children = target.children as any;
    const removed: any = [];
    for( let i = 0; i < children.length; i++ ) {

      if( children[i] && children[i].children.length && children[i].children[1] ) {

        let item = children[i].children[1];

        if( !item.children.length || !HTMLHandler.stripTags( item.innerHTML.trim() ) ) {
          removed.push( children[i].dataset.blockindex );
          children[i].remove();
          break;
        }

      }
    }

    removed.forEach(( e: number ) => {
      if (this.outputJSON.blocks[e]) {
        this.outputJSON.blocks.splice(e, 1);
        this.jsonUpdated();
      }
    });

    this.outputJSON.blocks.forEach((e: any, i: number) => {
      if (!e.data.text && !document.querySelector(`[data-blockindex="${i}"]`)) {
        this.outputJSON.blocks.splice(i, 1);
      }
    });

    const options = document.querySelector('.option');
    if (options) {
      options.remove();
    }
  }

  update( ...values: any ) :void {

  }

  jsonUpdated() {
    const d = new Date();
    this.outputJSON.time = d.getTime();
    this.beautify();
    this.update(this.prettyOutput);
  }
}


export default GoatCurry;
