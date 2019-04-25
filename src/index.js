/* eslint linebreak-style: ["error", "windows"] */
import '@babel/polyfill';
import extend from 'extend';
import Sizzle from 'sizzle';
import sanitizeHtml from 'sanitize-html';
import Helper from './Helper';
import Modules from './modules';
import HTML from './HTML';

class GoatCurry {
  constructor(options = {}) {
    const d = new Date();
    this.helper = Helper;
    this.options = {};
    this.editor = {};
    this.contentAreas = [];
    this.options.selector = '';
    this.version = '1.0.0';
    this.options.version = '1.0.0';
    this.options = extend(true, this.options, options);
    this.outputJSON = {
      time: d.getTime(),
      blocks: [],
      version: this.version,
    };
    this.prettyOutput = {};
    this.jsonUpdated();
    this.init();
    this.modules = new Modules(this);
    this.activeContextMenu = false;
    if (options.update && typeof options.update === 'function') {
      this.update = options.update;
    }
    this.buttonDown = false;
  }

  static sizzle(selector) {
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

  bindEvents() {
    if (this.editor.length) {
      this.editor.forEach((e) => {
        e.addEventListener('click', this.handleClick.bind(this));
      });

      // document.addEventListener( "click", () => this.documentClick( event, this ) );
    }
  }

  handleClick(event) {
    Helper.preventProp(event);
    const { target } = event;

    if (!target) {
      return false;
    }

    if (Helper.parentContainsClass(target, 'editor_button')) {
      return false;
    }

    if (target.classList.contains('editor') && target.children.length) {
      this.garbageCollection(target);
      const lastItem = target.children.item(event.target.children.length - 1);
      const position = Helper.getPosition(lastItem);
      const height = position.y + lastItem.offsetHeight;
      const clickPositions = Helper.getClickPosition(event);

      if (lastItem && (height + 10) < clickPositions.y) {
        this.addEditableArea();
      }
    } else if (!Helper.parentContainsClass(target, 'block')) {
      this.addEditableArea();
    }
    return this;
  }

  handleInput(event) {
    const elem = event.target;
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
        self.modules.handleOptionClick(event, this, self);
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
      node.setAttribute('contenteditable', true);
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

  handleFocus(event) {
    const { target } = event;
    const button = target.previousSibling;
    button.style.display = 'block';
    let moveOptions = target.nextSibling;

    if (moveOptions.nodeName === 'DIV') {
      moveOptions.remove();
      moveOptions = target.nextSibling;
    }

    moveOptions.style.display = 'block';
    return this;
  }

  handleBlur(event) {
    const elem = event.target;
    const value = elem.innerHTML;
    const cleanValue = sanitizeHtml(HTML.stripTags(value), { allowedTags: [] });
    elem.innerHTML = cleanValue;
    const optionButton = elem.previousSibling;
    let moveOptions = elem.nextSibling;

    if (moveOptions.nodeName === 'DIV') {
      moveOptions.remove();
    }

    moveOptions = elem.nextSibling;

    if (moveOptions.classList.contains('active')) {
      moveOptions.classList.remove('active');
    }

    this.modules.handleBlur(event, elem, GoatCurry);

    setTimeout(() => {
      if (!GoatCurry.buttonDown) {
        optionButton.style.display = 'none';
        moveOptions.style.display = 'none';
      }
      GoatCurry.buttonDown = false;
    }, 600);
  }

  init() {
    if (!this.options.selector) {
      throw new Error('Please use css selector to set the editor instance');
    }

    this.editor = GoatCurry.sizzle(this.options.selector);

    if (this.editor.length) { // TODO: extend so you can have multiple instances;
      this.bindEvents();
    }
  }

  garbageCollection(target) {
    const { children } = target;
    const removed = [];

    [...children].forEach((e) => {
      [...e.children].forEach((item) => {
        if (item.classList.contains('block')) {
          if (!item.children.length || !HTML.stripTags(item.innerHTML.trim())) {
            removed.push(e.dataset.blockindex);
            e.remove();
          }
        }
      });
    });

    removed.forEach((e) => {
      if (this.outputJSON.blocks[e]) {
        this.outputJSON.blocks.splice(e, 1);
        this.jsonUpdated();
      }
    });

    this.outputJSON.blocks.forEach((e, i) => {
      if (!e.data.text && !document.querySelector(`[data-blockindex="${i}"]`)) {
        this.outputJSON.blocks.splice(i, 1);
      }
    });

    const options = document.querySelector('.option');
    console.log(options);
    if (options) {
      options.remove();
    }
  }

  update() { // TODO: create extendable function
    return this;
  }

  jsonUpdated() {
    const d = new Date();
    this.outputJSON.time = d.getTime();
    this.beautify();
    this.update(this.prettyOutput);
  }
}


export default GoatCurry;
