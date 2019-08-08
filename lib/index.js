"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint linebreak-style: ["error", "windows"] */
require('@babel/polyfill');

var extend = require('extend');

var Sizzle = require('sizzle');

var sanitizeHtml = require('sanitize-html');

var Helper = require('./Helper');

var Modules = require('./modules');

var HTMLHandler = require('./HTMLHandler');

var config = require('./config');

var GoatCurry =
/*#__PURE__*/
function () {
  function GoatCurry() {
    var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, GoatCurry);

    this.settings = settings;

    _defineProperty(this, "helper", void 0);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "editor", void 0);

    _defineProperty(this, "contentAreas", void 0);

    _defineProperty(this, "version", void 0);

    _defineProperty(this, "outputJSON", void 0);

    _defineProperty(this, "prettyOutput", void 0);

    _defineProperty(this, "modules", void 0);

    _defineProperty(this, "activeContextMenu", void 0);

    _defineProperty(this, "buttonDown", void 0);

    var d = new Date();
    this.helper = Helper;
    this.options = {};
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

  _createClass(GoatCurry, [{
    key: "beautify",
    value: function beautify() {
      if (typeof this.outputJSON !== 'string') {
        this.prettyOutput = JSON.stringify(this.outputJSON, undefined, 2);
      }

      this.prettyOutput = this.prettyOutput.replace(/&/g, '&amp').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      this.prettyOutput = this.prettyOutput.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, function (match) {
        var cls = 'number';

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

        return "<span class=\"".concat(cls, "\">").concat(match, "</span>");
      });
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      if (this.editor.length) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.editor[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var element = _step.value;

            if (element instanceof HTMLElement) {
              element.addEventListener('click', this.handleClick.bind(this));
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      Helper.preventProp(event);
      var target = event.target;

      if (!target) {
        return false;
      }

      if (Helper.parentContainsClass(target, 'editor_button')) {
        return false;
      }

      if (target.classList.contains('editor') && target.children.length) {
        this.garbageCollection(target);
        var lastItem = target.children.item(target.children.length - 1);
        var position = Helper.getPosition(lastItem);

        if (!lastItem) {
          return false;
        }

        var height = position.y + lastItem.offsetHeight;
        var clickPositions = Helper.getClickPosition(event);

        if (lastItem && height + 10 < clickPositions.y) {
          this.addEditableArea();
        }
      } else if (!Helper.parentContainsClass(target, 'block')) {
        this.addEditableArea();
      }

      return this;
    }
  }, {
    key: "handleInput",
    value: function handleInput(event) {
      var elem = event.target;

      if (!elem) {
        return false;
      }

      var blockIndex = elem.dataset.blockindex;
      var value = elem.innerHTML;

      if (blockIndex && this.outputJSON.blocks.length && this.outputJSON.blocks[blockIndex]) {
        this.outputJSON.blocks[blockIndex].data.text = sanitizeHtml(value, config["default"].sanitizehtml);
        this.jsonUpdated();
      }
    }
  }, {
    key: "addEditableArea",
    value: function addEditableArea() {
      var self = this;

      if (this.editor.length) {
        var wrapper = document.createElement('div');
        wrapper.classList.add('block_wrapper');
        wrapper.dataset.blockindex = self.outputJSON.blocks.length;
        var optionButton = document.createElement('button');
        optionButton.dataset.blockindex = self.outputJSON.blocks.length;
        optionButton.classList.add('editor_button');
        var moveOptions = document.createElement('button');
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
        var node = document.createElement('div');
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
        this.outputJSON.blocks.push({
          type: 'paragraph',
          data: {
            text: ''
          }
        });
        this.jsonUpdated();
        node.focus();
      }
    }
  }, {
    key: "handleFocus",
    value: function handleFocus(event) {
      var target = event.target;
      var button = target.previousSibling;

      if (!button) {
        return false;
      }

      button.style.display = 'block';
      var moveOptions = target.nextSibling;

      if (moveOptions.nodeName === 'DIV') {
        moveOptions.remove();
        moveOptions = target.nextSibling;
      }

      moveOptions.style.display = 'block';
      return this;
    }
  }, {
    key: "handleBlur",
    value: function handleBlur(event) {
      var _this = this;

      var elem = event.target;
      var value = elem.innerHTML;
      var cleanValue;
      cleanValue = sanitizeHtml(value, config["default"].sanitizehtml);
      cleanValue = cleanValue.replace(/<[^\/>][^>]*><\/[^>]+>/g, '');
      elem.innerHTML = cleanValue || value;
      var optionButton = elem.previousSibling;
      var moveOptions = elem.nextSibling;

      if (moveOptions.nodeName === 'DIV') {
        moveOptions.remove();
      }

      moveOptions = elem.nextSibling;

      if (moveOptions.classList.contains('active')) {
        moveOptions.classList.remove('active');
      }

      this.modules.handleBlur(event, elem, this);
      setTimeout(function () {
        if (!_this.buttonDown) {
          optionButton.style.display = 'none';
          moveOptions.style.display = 'none';
        }

        _this.buttonDown = false;
      }, 600);
    }
  }, {
    key: "init",
    value: function init() {
      if (!this.options.selector) {
        throw new Error('Please use css selector to set the editor instance');
      }

      this.editor = GoatCurry.sizzle(this.options.selector);

      if (this.editor.length) {
        // TODO: extend so you can have multiple instances;
        this.bindEvents();
      }

      return;
    }
  }, {
    key: "garbageCollection",
    value: function garbageCollection(target) {
      var _this2 = this;

      var children = target.children;
      var removed = [];

      for (var i = 0; i < children.length; i++) {
        if (children[i] && children[i].children.length && children[i].children[1]) {
          var item = children[i].children[1];

          if (!item.children.length || !HTMLHandler.stripTags(item.innerHTML.trim())) {
            removed.push(children[i].dataset.blockindex);
            children[i].remove();
            break;
          }
        }
      }

      removed.forEach(function (e) {
        if (_this2.outputJSON.blocks[e]) {
          _this2.outputJSON.blocks.splice(e, 1);

          _this2.jsonUpdated();
        }
      });
      this.outputJSON.blocks.forEach(function (e, i) {
        if (!e.data.text && !document.querySelector("[data-blockindex=\"".concat(i, "\"]"))) {
          _this2.outputJSON.blocks.splice(i, 1);
        }
      });
      var options = document.querySelector('.option');

      if (options) {
        options.remove();
      }
    }
  }, {
    key: "update",
    value: function update() {}
  }, {
    key: "jsonUpdated",
    value: function jsonUpdated() {
      var d = new Date();
      this.outputJSON.time = d.getTime();
      this.beautify();
      this.update(this.prettyOutput);
    }
  }], [{
    key: "sizzle",
    value: function sizzle(selector) {
      if (!Helper.isString(selector)) {
        throw new Error("The selector you are using is not of the type string: ".concat(selector));
      }

      return Sizzle(selector);
    }
  }]);

  return GoatCurry;
}();

var _default = GoatCurry;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiZXh0ZW5kIiwiU2l6emxlIiwic2FuaXRpemVIdG1sIiwiSGVscGVyIiwiTW9kdWxlcyIsIkhUTUxIYW5kbGVyIiwiY29uZmlnIiwiR29hdEN1cnJ5Iiwic2V0dGluZ3MiLCJkIiwiRGF0ZSIsImhlbHBlciIsIm9wdGlvbnMiLCJlZGl0b3IiLCJjb250ZW50QXJlYXMiLCJ2ZXJzaW9uIiwib3V0cHV0SlNPTiIsInRpbWUiLCJnZXRUaW1lIiwiYmxvY2tzIiwicHJldHR5T3V0cHV0IiwianNvblVwZGF0ZWQiLCJpbml0IiwibW9kdWxlcyIsImFjdGl2ZUNvbnRleHRNZW51IiwidXBkYXRlIiwiYnV0dG9uRG93biIsIkpTT04iLCJzdHJpbmdpZnkiLCJ1bmRlZmluZWQiLCJyZXBsYWNlIiwibWF0Y2giLCJjbHMiLCJ0ZXN0IiwibGVuZ3RoIiwiZWxlbWVudCIsIkhUTUxFbGVtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZUNsaWNrIiwiYmluZCIsImV2ZW50IiwicHJldmVudFByb3AiLCJ0YXJnZXQiLCJwYXJlbnRDb250YWluc0NsYXNzIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJjaGlsZHJlbiIsImdhcmJhZ2VDb2xsZWN0aW9uIiwibGFzdEl0ZW0iLCJpdGVtIiwicG9zaXRpb24iLCJnZXRQb3NpdGlvbiIsImhlaWdodCIsInkiLCJvZmZzZXRIZWlnaHQiLCJjbGlja1Bvc2l0aW9ucyIsImdldENsaWNrUG9zaXRpb24iLCJhZGRFZGl0YWJsZUFyZWEiLCJlbGVtIiwiYmxvY2tJbmRleCIsImRhdGFzZXQiLCJibG9ja2luZGV4IiwidmFsdWUiLCJpbm5lckhUTUwiLCJkYXRhIiwidGV4dCIsInNhbml0aXplaHRtbCIsInNlbGYiLCJ3cmFwcGVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYWRkIiwib3B0aW9uQnV0dG9uIiwibW92ZU9wdGlvbnMiLCJzdHlsZSIsImNzc1RleHQiLCJoYW5kbGVPcHRpb25DbGljayIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwiaGFuZGxlTW92ZUNsaWNrIiwiZmlsbCIsIm5vZGUiLCJzZXRBdHRyaWJ1dGUiLCJoYW5kbGVJbnB1dCIsImhhbmRsZUZvY3VzIiwiaGFuZGxlQmx1ciIsImFwcGVuZENoaWxkIiwicHVzaCIsInR5cGUiLCJmb2N1cyIsImJ1dHRvbiIsInByZXZpb3VzU2libGluZyIsImRpc3BsYXkiLCJuZXh0U2libGluZyIsIm5vZGVOYW1lIiwicmVtb3ZlIiwiY2xlYW5WYWx1ZSIsInNldFRpbWVvdXQiLCJzZWxlY3RvciIsIkVycm9yIiwic2l6emxlIiwiYmluZEV2ZW50cyIsInJlbW92ZWQiLCJpIiwic3RyaXBUYWdzIiwidHJpbSIsImZvckVhY2giLCJlIiwic3BsaWNlIiwicXVlcnlTZWxlY3RvciIsImJlYXV0aWZ5IiwiaXNTdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0FBLE9BQU8sQ0FBRSxpQkFBRixDQUFQOztBQUNBLElBQUlDLE1BQU0sR0FBR0QsT0FBTyxDQUFFLFFBQUYsQ0FBcEI7O0FBQ0EsSUFBSUUsTUFBTSxHQUFHRixPQUFPLENBQUUsUUFBRixDQUFwQjs7QUFDQSxJQUFJRyxZQUFZLEdBQUdILE9BQU8sQ0FBQyxlQUFELENBQTFCOztBQUNBLElBQUlJLE1BQU0sR0FBR0osT0FBTyxDQUFDLFVBQUQsQ0FBcEI7O0FBQ0EsSUFBSUssT0FBTyxHQUFHTCxPQUFPLENBQUMsV0FBRCxDQUFyQjs7QUFDQSxJQUFJTSxXQUFXLEdBQUdOLE9BQU8sQ0FBQyxlQUFELENBQXpCOztBQUNBLElBQUlPLE1BQU0sR0FBR1AsT0FBTyxDQUFDLFVBQUQsQ0FBcEI7O0lBRU1RLFM7OztBQVdKLHVCQUE0QztBQUFBLFFBQXhCQyxRQUF3Qix1RUFBTCxFQUFLOztBQUFBOztBQUFBLFNBQXhCQSxRQUF3QixHQUF4QkEsUUFBd0I7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQzFDLFFBQU1DLENBQUMsR0FBRyxJQUFJQyxJQUFKLEVBQVY7QUFDQSxTQUFLQyxNQUFMLEdBQWNSLE1BQWQ7QUFDQSxTQUFLUyxPQUFMLEdBQWUsRUFBZjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0EsU0FBS0MsWUFBTCxHQUFvQixFQUFwQjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxPQUFmO0FBQ0EsU0FBS0gsT0FBTCxHQUFlWixNQUFNLENBQUMsSUFBRCxFQUFPLEtBQUtZLE9BQVosRUFBcUJKLFFBQXJCLENBQXJCO0FBQ0EsU0FBS1EsVUFBTCxHQUFrQjtBQUNoQkMsTUFBQUEsSUFBSSxFQUFFUixDQUFDLENBQUNTLE9BQUYsRUFEVTtBQUVoQkMsTUFBQUEsTUFBTSxFQUFFLEVBRlE7QUFHaEJKLE1BQUFBLE9BQU8sRUFBRSxLQUFLSCxPQUFMLENBQWFHO0FBSE4sS0FBbEI7QUFLQSxTQUFLSyxZQUFMLEdBQW9CLEVBQXBCO0FBQ0EsU0FBS0MsV0FBTDtBQUNBLFNBQUtDLElBQUw7QUFDQSxTQUFLQyxPQUFMLEdBQWUsSUFBSW5CLE9BQUosQ0FBWSxJQUFaLENBQWY7QUFDQSxTQUFLb0IsaUJBQUwsR0FBeUIsS0FBekI7O0FBQ0EsUUFBSSxLQUFLWixPQUFMLENBQWFhLE1BQWIsSUFBdUIsT0FBTyxLQUFLYixPQUFMLENBQWFhLE1BQXBCLEtBQStCLFVBQTFELEVBQXNFO0FBQ3BFLFdBQUtBLE1BQUwsR0FBYyxLQUFLYixPQUFMLENBQWFhLE1BQTNCO0FBQ0Q7O0FBQ0QsU0FBS0MsVUFBTCxHQUFrQixLQUFsQjtBQUNEOzs7OytCQVNVO0FBQ1QsVUFBSSxPQUFPLEtBQUtWLFVBQVosS0FBMkIsUUFBL0IsRUFBeUM7QUFDdkMsYUFBS0ksWUFBTCxHQUFvQk8sSUFBSSxDQUFDQyxTQUFMLENBQWUsS0FBS1osVUFBcEIsRUFBZ0NhLFNBQWhDLEVBQTJDLENBQTNDLENBQXBCO0FBQ0Q7O0FBQ0QsV0FBS1QsWUFBTCxHQUFvQixLQUFLQSxZQUFMLENBQWtCVSxPQUFsQixDQUEwQixJQUExQixFQUFnQyxNQUFoQyxFQUF3Q0EsT0FBeEMsQ0FBZ0QsSUFBaEQsRUFBc0QsTUFBdEQsRUFBOERBLE9BQTlELENBQXNFLElBQXRFLEVBQTRFLE1BQTVFLENBQXBCO0FBQ0EsV0FBS1YsWUFBTCxHQUFvQixLQUFLQSxZQUFMLENBQWtCVSxPQUFsQixDQUEwQix1R0FBMUIsRUFBbUksVUFBQ0MsS0FBRCxFQUFXO0FBQ2hLLFlBQUlDLEdBQUcsR0FBRyxRQUFWOztBQUNBLFlBQUksS0FBS0MsSUFBTCxDQUFVRixLQUFWLENBQUosRUFBc0I7QUFDcEIsY0FBSSxLQUFLRSxJQUFMLENBQVVGLEtBQVYsQ0FBSixFQUFzQjtBQUNwQkMsWUFBQUEsR0FBRyxHQUFHLEtBQU47QUFDRCxXQUZELE1BRU87QUFDTEEsWUFBQUEsR0FBRyxHQUFHLFFBQU47QUFDRDtBQUNGLFNBTkQsTUFNTyxJQUFJLGFBQWFDLElBQWIsQ0FBa0JGLEtBQWxCLENBQUosRUFBOEI7QUFDbkNDLFVBQUFBLEdBQUcsR0FBRyxTQUFOO0FBQ0QsU0FGTSxNQUVBLElBQUksT0FBT0MsSUFBUCxDQUFZRixLQUFaLENBQUosRUFBd0I7QUFDN0JDLFVBQUFBLEdBQUcsR0FBRyxNQUFOO0FBQ0Q7O0FBQ0QsdUNBQXVCQSxHQUF2QixnQkFBK0JELEtBQS9CO0FBQ0QsT0FkbUIsQ0FBcEI7QUFlRDs7O2lDQUVpQjtBQUNoQixVQUFJLEtBQUtsQixNQUFMLENBQVlxQixNQUFoQixFQUF3QjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUN0QiwrQkFBb0IsS0FBS3JCLE1BQXpCLDhIQUFrQztBQUFBLGdCQUF6QnNCLE9BQXlCOztBQUNoQyxnQkFBSUEsT0FBTyxZQUFZQyxXQUF2QixFQUFxQztBQUNuQ0QsY0FBQUEsT0FBTyxDQUFDRSxnQkFBUixDQUEwQixPQUExQixFQUFtQyxLQUFLQyxXQUFMLENBQWlCQyxJQUFqQixDQUF1QixJQUF2QixDQUFuQztBQUNEO0FBQ0Y7QUFMcUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU12QjtBQUNGOzs7Z0NBRVlDLEssRUFBbUI7QUFDOUJyQyxNQUFBQSxNQUFNLENBQUNzQyxXQUFQLENBQW1CRCxLQUFuQjtBQUNBLFVBQU1FLE1BQU0sR0FBR0YsS0FBSyxDQUFDRSxNQUFyQjs7QUFFQSxVQUFJLENBQUNBLE1BQUwsRUFBYTtBQUNYLGVBQU8sS0FBUDtBQUNEOztBQUVELFVBQUl2QyxNQUFNLENBQUN3QyxtQkFBUCxDQUE0QkQsTUFBNUIsRUFBb0MsZUFBcEMsQ0FBSixFQUEyRDtBQUN6RCxlQUFPLEtBQVA7QUFDRDs7QUFFRCxVQUFJQSxNQUFNLENBQUNFLFNBQVAsQ0FBaUJDLFFBQWpCLENBQTBCLFFBQTFCLEtBQXVDSCxNQUFNLENBQUNJLFFBQVAsQ0FBZ0JaLE1BQTNELEVBQW1FO0FBQ2pFLGFBQUthLGlCQUFMLENBQXVCTCxNQUF2QjtBQUNBLFlBQU1NLFFBQVEsR0FBaUJOLE1BQU0sQ0FBQ0ksUUFBUCxDQUFnQkcsSUFBaEIsQ0FBc0JQLE1BQU0sQ0FBQ0ksUUFBUCxDQUFnQlosTUFBaEIsR0FBeUIsQ0FBL0MsQ0FBL0I7QUFDQSxZQUFNZ0IsUUFBUSxHQUFHL0MsTUFBTSxDQUFDZ0QsV0FBUCxDQUFtQkgsUUFBbkIsQ0FBakI7O0FBQ0EsWUFBSSxDQUFDQSxRQUFMLEVBQWdCO0FBQ2QsaUJBQU8sS0FBUDtBQUNEOztBQUNELFlBQU1JLE1BQU0sR0FBR0YsUUFBUSxDQUFDRyxDQUFULEdBQWFMLFFBQVEsQ0FBQ00sWUFBckM7QUFDQSxZQUFNQyxjQUFjLEdBQUdwRCxNQUFNLENBQUNxRCxnQkFBUCxDQUF3QmhCLEtBQXhCLENBQXZCOztBQUVBLFlBQUlRLFFBQVEsSUFBS0ksTUFBTSxHQUFHLEVBQVYsR0FBZ0JHLGNBQWMsQ0FBQ0YsQ0FBL0MsRUFBa0Q7QUFDaEQsZUFBS0ksZUFBTDtBQUNEO0FBQ0YsT0FiRCxNQWNLLElBQUksQ0FBQ3RELE1BQU0sQ0FBQ3dDLG1CQUFQLENBQTJCRCxNQUEzQixFQUFtQyxPQUFuQyxDQUFMLEVBQWtEO0FBRXJELGFBQUtlLGVBQUw7QUFDRDs7QUFDRCxhQUFPLElBQVA7QUFDRDs7O2dDQUVZakIsSyxFQUFtQjtBQUM5QixVQUFNa0IsSUFBSSxHQUFHbEIsS0FBSyxDQUFDRSxNQUFuQjs7QUFDQSxVQUFJLENBQUNnQixJQUFMLEVBQVk7QUFDVixlQUFPLEtBQVA7QUFDRDs7QUFDRCxVQUFNQyxVQUFVLEdBQUdELElBQUksQ0FBQ0UsT0FBTCxDQUFhQyxVQUFoQztBQUNBLFVBQU1DLEtBQUssR0FBR0osSUFBSSxDQUFDSyxTQUFuQjs7QUFFQSxVQUFJSixVQUFVLElBQUksS0FBSzNDLFVBQUwsQ0FBZ0JHLE1BQWhCLENBQXVCZSxNQUFyQyxJQUErQyxLQUFLbEIsVUFBTCxDQUFnQkcsTUFBaEIsQ0FBdUJ3QyxVQUF2QixDQUFuRCxFQUF1RjtBQUNyRixhQUFLM0MsVUFBTCxDQUFnQkcsTUFBaEIsQ0FBdUJ3QyxVQUF2QixFQUFtQ0ssSUFBbkMsQ0FBd0NDLElBQXhDLEdBQStDL0QsWUFBWSxDQUFDNEQsS0FBRCxFQUFReEQsTUFBTSxXQUFOLENBQWU0RCxZQUF2QixDQUEzRDtBQUNBLGFBQUs3QyxXQUFMO0FBQ0Q7QUFDRjs7O3NDQUVpQjtBQUNoQixVQUFNOEMsSUFBSSxHQUFHLElBQWI7O0FBQ0EsVUFBSSxLQUFLdEQsTUFBTCxDQUFZcUIsTUFBaEIsRUFBd0I7QUFDdEIsWUFBTWtDLE9BQU8sR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLEtBQXZCLENBQWhCO0FBQ0FGLFFBQUFBLE9BQU8sQ0FBQ3hCLFNBQVIsQ0FBa0IyQixHQUFsQixDQUFzQixlQUF0QjtBQUNBSCxRQUFBQSxPQUFPLENBQUNSLE9BQVIsQ0FBZ0JDLFVBQWhCLEdBQTZCTSxJQUFJLENBQUNuRCxVQUFMLENBQWdCRyxNQUFoQixDQUF1QmUsTUFBcEQ7QUFFQSxZQUFNc0MsWUFBWSxHQUFHSCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBckI7QUFFQUUsUUFBQUEsWUFBWSxDQUFDWixPQUFiLENBQXFCQyxVQUFyQixHQUFrQ00sSUFBSSxDQUFDbkQsVUFBTCxDQUFnQkcsTUFBaEIsQ0FBdUJlLE1BQXpEO0FBQ0FzQyxRQUFBQSxZQUFZLENBQUM1QixTQUFiLENBQXVCMkIsR0FBdkIsQ0FBMkIsZUFBM0I7QUFFQSxZQUFNRSxXQUFXLEdBQUdKLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixRQUF2QixDQUFwQjtBQUVBRSxRQUFBQSxZQUFZLENBQUNULFNBQWIsR0FBeUIsOFlBQXpCO0FBRUFTLFFBQUFBLFlBQVksQ0FBQ0UsS0FBYixDQUFtQkMsT0FBbkIsR0FBNkIsOElBQTdCO0FBQ0FILFFBQUFBLFlBQVksQ0FBQzVCLFNBQWIsQ0FBdUIyQixHQUF2QixDQUEyQixlQUEzQjtBQUNBQyxRQUFBQSxZQUFZLENBQUNuQyxnQkFBYixDQUE4QixPQUE5QixFQUF1QyxVQUFVRyxLQUFWLEVBQWlCO0FBQ3REckMsVUFBQUEsTUFBTSxDQUFDc0MsV0FBUCxDQUFtQkQsS0FBbkI7QUFDQTJCLFVBQUFBLElBQUksQ0FBQ3pDLFVBQUwsR0FBa0IsSUFBbEI7QUFDQXlDLFVBQUFBLElBQUksQ0FBQzVDLE9BQUwsQ0FBYXFELGlCQUFiLENBQWdDcEMsS0FBaEMsRUFBdUMsSUFBdkMsRUFBNkMyQixJQUE3QztBQUNELFNBSkQ7QUFNQU0sUUFBQUEsV0FBVyxDQUFDQyxLQUFaLENBQWtCQyxPQUFsQixHQUE0QiwySUFBNUI7QUFDQUYsUUFBQUEsV0FBVyxDQUFDN0IsU0FBWixDQUFzQjJCLEdBQXRCLENBQTBCLGVBQTFCO0FBRUFFLFFBQUFBLFdBQVcsQ0FBQ3BDLGdCQUFaLENBQTZCLE9BQTdCLEVBQXNDLFVBQVVHLEtBQVYsRUFBaUI7QUFDckRBLFVBQUFBLEtBQUssQ0FBQ3FDLGNBQU47QUFDQXJDLFVBQUFBLEtBQUssQ0FBQ3NDLGVBQU47QUFDQVgsVUFBQUEsSUFBSSxDQUFDekMsVUFBTCxHQUFrQixJQUFsQjtBQUNBeUMsVUFBQUEsSUFBSSxDQUFDNUMsT0FBTCxDQUFhd0QsZUFBYixDQUE2QnZDLEtBQTdCLEVBQW9DLElBQXBDLEVBQTBDMkIsSUFBMUM7QUFDRCxTQUxEO0FBT0FNLFFBQUFBLFdBQVcsQ0FBQ3BDLGdCQUFaLENBQTZCLFlBQTdCLEVBQTJDLFlBQVk7QUFDckQsZUFBS3FDLEtBQUwsQ0FBV00sSUFBWCxHQUFrQixNQUFsQjtBQUNELFNBRkQ7QUFJQVAsUUFBQUEsV0FBVyxDQUFDcEMsZ0JBQVosQ0FBNkIsWUFBN0IsRUFBMkMsWUFBWTtBQUNyRCxlQUFLcUMsS0FBTCxDQUFXTSxJQUFYLEdBQWtCLE9BQWxCO0FBQ0QsU0FGRDtBQUlBUixRQUFBQSxZQUFZLENBQUNuQyxnQkFBYixDQUE4QixZQUE5QixFQUE0QyxZQUFZO0FBQ3RELGVBQUtxQyxLQUFMLENBQVdNLElBQVgsR0FBa0IsTUFBbEI7QUFDRCxTQUZEO0FBSUFSLFFBQUFBLFlBQVksQ0FBQ25DLGdCQUFiLENBQThCLFlBQTlCLEVBQTRDLFlBQVk7QUFDdEQsZUFBS3FDLEtBQUwsQ0FBV00sSUFBWCxHQUFrQixPQUFsQjtBQUNELFNBRkQ7QUFJQVAsUUFBQUEsV0FBVyxDQUFDVixTQUFaLEdBQXdCLHVxQkFBeEI7QUFFQSxZQUFNa0IsSUFBSSxHQUFHWixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBYjtBQUNBVyxRQUFBQSxJQUFJLENBQUNDLFlBQUwsQ0FBa0IsaUJBQWxCLEVBQXFDLE1BQXJDO0FBQ0FELFFBQUFBLElBQUksQ0FBQ3JDLFNBQUwsQ0FBZTJCLEdBQWYsQ0FBbUIsT0FBbkI7QUFDQVUsUUFBQUEsSUFBSSxDQUFDNUMsZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsS0FBSzhDLFdBQUwsQ0FBaUI1QyxJQUFqQixDQUFzQixJQUF0QixDQUEvQjtBQUNBMEMsUUFBQUEsSUFBSSxDQUFDNUMsZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsS0FBSytDLFdBQUwsQ0FBaUI3QyxJQUFqQixDQUFzQixJQUF0QixDQUEvQjtBQUNBMEMsUUFBQUEsSUFBSSxDQUFDNUMsZ0JBQUwsQ0FBc0IsTUFBdEIsRUFBOEIsS0FBS2dELFVBQUwsQ0FBZ0I5QyxJQUFoQixDQUFxQixJQUFyQixDQUE5QjtBQUNBMEMsUUFBQUEsSUFBSSxDQUFDckIsT0FBTCxDQUFhQyxVQUFiLEdBQTBCLEtBQUs3QyxVQUFMLENBQWdCRyxNQUFoQixDQUF1QmUsTUFBakQ7QUFDQSxhQUFLckIsTUFBTCxDQUFZLENBQVosRUFBZXlFLFdBQWYsQ0FBMkJkLFlBQTNCO0FBQ0FKLFFBQUFBLE9BQU8sQ0FBQ2tCLFdBQVIsQ0FBb0JkLFlBQXBCO0FBQ0FKLFFBQUFBLE9BQU8sQ0FBQ2tCLFdBQVIsQ0FBb0JMLElBQXBCO0FBQ0FiLFFBQUFBLE9BQU8sQ0FBQ2tCLFdBQVIsQ0FBb0JiLFdBQXBCO0FBQ0EsYUFBSzVELE1BQUwsQ0FBWSxDQUFaLEVBQWV5RSxXQUFmLENBQTJCbEIsT0FBM0I7QUFDQSxhQUFLcEQsVUFBTCxDQUFnQkcsTUFBaEIsQ0FBdUJvRSxJQUF2QixDQUE0QjtBQUFFQyxVQUFBQSxJQUFJLEVBQUUsV0FBUjtBQUFxQnhCLFVBQUFBLElBQUksRUFBRTtBQUFFQyxZQUFBQSxJQUFJLEVBQUU7QUFBUjtBQUEzQixTQUE1QjtBQUNBLGFBQUs1QyxXQUFMO0FBQ0E0RCxRQUFBQSxJQUFJLENBQUNRLEtBQUw7QUFDRDtBQUNGOzs7Z0NBRVlqRCxLLEVBQWU7QUFDMUIsVUFBTUUsTUFBTSxHQUFHRixLQUFLLENBQUNFLE1BQXJCO0FBQ0EsVUFBTWdELE1BQU0sR0FBR2hELE1BQU0sQ0FBQ2lELGVBQXRCOztBQUNBLFVBQUksQ0FBQ0QsTUFBTCxFQUFjO0FBQ1osZUFBTyxLQUFQO0FBQ0Q7O0FBQ0RBLE1BQUFBLE1BQU0sQ0FBQ2hCLEtBQVAsQ0FBYWtCLE9BQWIsR0FBdUIsT0FBdkI7QUFDQSxVQUFJbkIsV0FBVyxHQUFHL0IsTUFBTSxDQUFDbUQsV0FBekI7O0FBRUEsVUFBSXBCLFdBQVcsQ0FBQ3FCLFFBQVosS0FBeUIsS0FBN0IsRUFBb0M7QUFDbENyQixRQUFBQSxXQUFXLENBQUNzQixNQUFaO0FBQ0F0QixRQUFBQSxXQUFXLEdBQUcvQixNQUFNLENBQUNtRCxXQUFyQjtBQUNEOztBQUVEcEIsTUFBQUEsV0FBVyxDQUFDQyxLQUFaLENBQWtCa0IsT0FBbEIsR0FBNEIsT0FBNUI7QUFDQSxhQUFPLElBQVA7QUFDRDs7OytCQUVXcEQsSyxFQUFxQjtBQUFBOztBQUMvQixVQUFNa0IsSUFBSSxHQUFHbEIsS0FBSyxDQUFDRSxNQUFuQjtBQUNBLFVBQU1vQixLQUFLLEdBQUdKLElBQUksQ0FBQ0ssU0FBbkI7QUFDQSxVQUFJaUMsVUFBSjtBQUNBQSxNQUFBQSxVQUFVLEdBQUc5RixZQUFZLENBQUM0RCxLQUFELEVBQVF4RCxNQUFNLFdBQU4sQ0FBZTRELFlBQXZCLENBQXpCO0FBQ0E4QixNQUFBQSxVQUFVLEdBQUdBLFVBQVUsQ0FBQ2xFLE9BQVgsQ0FBb0IseUJBQXBCLEVBQStDLEVBQS9DLENBQWI7QUFDQTRCLE1BQUFBLElBQUksQ0FBQ0ssU0FBTCxHQUFpQmlDLFVBQVUsSUFBSWxDLEtBQS9CO0FBQ0EsVUFBTVUsWUFBWSxHQUFHZCxJQUFJLENBQUNpQyxlQUExQjtBQUNBLFVBQUlsQixXQUFXLEdBQUdmLElBQUksQ0FBQ21DLFdBQXZCOztBQUVBLFVBQUlwQixXQUFXLENBQUNxQixRQUFaLEtBQXlCLEtBQTdCLEVBQW9DO0FBQ2xDckIsUUFBQUEsV0FBVyxDQUFDc0IsTUFBWjtBQUNEOztBQUVEdEIsTUFBQUEsV0FBVyxHQUFHZixJQUFJLENBQUNtQyxXQUFuQjs7QUFFQSxVQUFJcEIsV0FBVyxDQUFDN0IsU0FBWixDQUFzQkMsUUFBdEIsQ0FBK0IsUUFBL0IsQ0FBSixFQUE4QztBQUM1QzRCLFFBQUFBLFdBQVcsQ0FBQzdCLFNBQVosQ0FBc0JtRCxNQUF0QixDQUE2QixRQUE3QjtBQUNEOztBQUVELFdBQUt4RSxPQUFMLENBQWE4RCxVQUFiLENBQXdCN0MsS0FBeEIsRUFBK0JrQixJQUEvQixFQUFxQyxJQUFyQztBQUVBdUMsTUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZixZQUFJLENBQUMsS0FBSSxDQUFDdkUsVUFBVixFQUFzQjtBQUNwQjhDLFVBQUFBLFlBQVksQ0FBQ0UsS0FBYixDQUFtQmtCLE9BQW5CLEdBQTZCLE1BQTdCO0FBQ0FuQixVQUFBQSxXQUFXLENBQUNDLEtBQVosQ0FBa0JrQixPQUFsQixHQUE0QixNQUE1QjtBQUNEOztBQUNELFFBQUEsS0FBSSxDQUFDbEUsVUFBTCxHQUFrQixLQUFsQjtBQUNELE9BTlMsRUFNUCxHQU5PLENBQVY7QUFPRDs7OzJCQUVZO0FBQ1gsVUFBSyxDQUFDLEtBQUtkLE9BQUwsQ0FBYXNGLFFBQW5CLEVBQThCO0FBQzVCLGNBQU0sSUFBSUMsS0FBSixDQUFVLG9EQUFWLENBQU47QUFDRDs7QUFFRCxXQUFLdEYsTUFBTCxHQUFjTixTQUFTLENBQUM2RixNQUFWLENBQWlCLEtBQUt4RixPQUFMLENBQWFzRixRQUE5QixDQUFkOztBQUVBLFVBQUksS0FBS3JGLE1BQUwsQ0FBWXFCLE1BQWhCLEVBQXdCO0FBQUU7QUFDeEIsYUFBS21FLFVBQUw7QUFDRDs7QUFDRDtBQUNEOzs7c0NBRWtCM0QsTSxFQUFzQjtBQUFBOztBQUN2QyxVQUFNSSxRQUFRLEdBQUdKLE1BQU0sQ0FBQ0ksUUFBeEI7QUFDQSxVQUFNd0QsT0FBWSxHQUFHLEVBQXJCOztBQUNBLFdBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3pELFFBQVEsQ0FBQ1osTUFBN0IsRUFBcUNxRSxDQUFDLEVBQXRDLEVBQTJDO0FBRXpDLFlBQUl6RCxRQUFRLENBQUN5RCxDQUFELENBQVIsSUFBZXpELFFBQVEsQ0FBQ3lELENBQUQsQ0FBUixDQUFZekQsUUFBWixDQUFxQlosTUFBcEMsSUFBOENZLFFBQVEsQ0FBQ3lELENBQUQsQ0FBUixDQUFZekQsUUFBWixDQUFxQixDQUFyQixDQUFsRCxFQUE0RTtBQUUxRSxjQUFJRyxJQUFJLEdBQUdILFFBQVEsQ0FBQ3lELENBQUQsQ0FBUixDQUFZekQsUUFBWixDQUFxQixDQUFyQixDQUFYOztBQUVBLGNBQUksQ0FBQ0csSUFBSSxDQUFDSCxRQUFMLENBQWNaLE1BQWYsSUFBeUIsQ0FBQzdCLFdBQVcsQ0FBQ21HLFNBQVosQ0FBdUJ2RCxJQUFJLENBQUNjLFNBQUwsQ0FBZTBDLElBQWYsRUFBdkIsQ0FBOUIsRUFBK0U7QUFDN0VILFlBQUFBLE9BQU8sQ0FBQ2YsSUFBUixDQUFjekMsUUFBUSxDQUFDeUQsQ0FBRCxDQUFSLENBQVkzQyxPQUFaLENBQW9CQyxVQUFsQztBQUNBZixZQUFBQSxRQUFRLENBQUN5RCxDQUFELENBQVIsQ0FBWVIsTUFBWjtBQUNBO0FBQ0Q7QUFFRjtBQUNGOztBQUVETyxNQUFBQSxPQUFPLENBQUNJLE9BQVIsQ0FBZ0IsVUFBRUMsQ0FBRixFQUFpQjtBQUMvQixZQUFJLE1BQUksQ0FBQzNGLFVBQUwsQ0FBZ0JHLE1BQWhCLENBQXVCd0YsQ0FBdkIsQ0FBSixFQUErQjtBQUM3QixVQUFBLE1BQUksQ0FBQzNGLFVBQUwsQ0FBZ0JHLE1BQWhCLENBQXVCeUYsTUFBdkIsQ0FBOEJELENBQTlCLEVBQWlDLENBQWpDOztBQUNBLFVBQUEsTUFBSSxDQUFDdEYsV0FBTDtBQUNEO0FBQ0YsT0FMRDtBQU9BLFdBQUtMLFVBQUwsQ0FBZ0JHLE1BQWhCLENBQXVCdUYsT0FBdkIsQ0FBK0IsVUFBQ0MsQ0FBRCxFQUFTSixDQUFULEVBQXVCO0FBQ3BELFlBQUksQ0FBQ0ksQ0FBQyxDQUFDM0MsSUFBRixDQUFPQyxJQUFSLElBQWdCLENBQUNJLFFBQVEsQ0FBQ3dDLGFBQVQsOEJBQTRDTixDQUE1QyxTQUFyQixFQUF5RTtBQUN2RSxVQUFBLE1BQUksQ0FBQ3ZGLFVBQUwsQ0FBZ0JHLE1BQWhCLENBQXVCeUYsTUFBdkIsQ0FBOEJMLENBQTlCLEVBQWlDLENBQWpDO0FBQ0Q7QUFDRixPQUpEO0FBTUEsVUFBTTNGLE9BQU8sR0FBR3lELFFBQVEsQ0FBQ3dDLGFBQVQsQ0FBdUIsU0FBdkIsQ0FBaEI7O0FBQ0EsVUFBSWpHLE9BQUosRUFBYTtBQUNYQSxRQUFBQSxPQUFPLENBQUNtRixNQUFSO0FBQ0Q7QUFDRjs7OzZCQUU4QixDQUU5Qjs7O2tDQUVhO0FBQ1osVUFBTXRGLENBQUMsR0FBRyxJQUFJQyxJQUFKLEVBQVY7QUFDQSxXQUFLTSxVQUFMLENBQWdCQyxJQUFoQixHQUF1QlIsQ0FBQyxDQUFDUyxPQUFGLEVBQXZCO0FBQ0EsV0FBSzRGLFFBQUw7QUFDQSxXQUFLckYsTUFBTCxDQUFZLEtBQUtMLFlBQWpCO0FBQ0Q7OzsyQkF4UWM4RSxRLEVBQW1CO0FBQ2hDLFVBQUksQ0FBQy9GLE1BQU0sQ0FBQzRHLFFBQVAsQ0FBZ0JiLFFBQWhCLENBQUwsRUFBZ0M7QUFDOUIsY0FBTSxJQUFJQyxLQUFKLGlFQUFtRUQsUUFBbkUsRUFBTjtBQUNEOztBQUNELGFBQU9qRyxNQUFNLENBQUNpRyxRQUFELENBQWI7QUFDRDs7Ozs7O2VBdVFZM0YsUyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludCBsaW5lYnJlYWstc3R5bGU6IFtcImVycm9yXCIsIFwid2luZG93c1wiXSAqL1xyXG5yZXF1aXJlKCAnQGJhYmVsL3BvbHlmaWxsJyApO1xyXG52YXIgZXh0ZW5kID0gcmVxdWlyZSggJ2V4dGVuZCcgKTtcclxudmFyIFNpenpsZSA9IHJlcXVpcmUoICdzaXp6bGUnKTtcclxudmFyIHNhbml0aXplSHRtbCA9IHJlcXVpcmUoJ3Nhbml0aXplLWh0bWwnKTtcclxudmFyIEhlbHBlciA9IHJlcXVpcmUoJy4vSGVscGVyJyk7XHJcbnZhciBNb2R1bGVzID0gcmVxdWlyZSgnLi9tb2R1bGVzJyk7XHJcbnZhciBIVE1MSGFuZGxlciA9IHJlcXVpcmUoJy4vSFRNTEhhbmRsZXInKTtcclxudmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnJyk7XHJcblxyXG5jbGFzcyBHb2F0Q3Vycnkge1xyXG4gIGhlbHBlcjogT2JqZWN0O1xyXG4gIG9wdGlvbnM6IGFueTtcclxuICBlZGl0b3I6IEhUTUxFbGVtZW50W107XHJcbiAgY29udGVudEFyZWFzOiBPYmplY3RbXTtcclxuICB2ZXJzaW9uOiBTdHJpbmc7XHJcbiAgb3V0cHV0SlNPTjogYW55O1xyXG4gIHByZXR0eU91dHB1dDogU3RyaW5nO1xyXG4gIG1vZHVsZXM6IGFueTtcclxuICBhY3RpdmVDb250ZXh0TWVudTogQm9vbGVhbjtcclxuICBidXR0b25Eb3duOiBCb29sZWFuO1xyXG4gIGNvbnN0cnVjdG9yKCBwdWJsaWMgc2V0dGluZ3M6IE9iamVjdCA9IHt9ICkge1xyXG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKCk7XHJcbiAgICB0aGlzLmhlbHBlciA9IEhlbHBlcjtcclxuICAgIHRoaXMub3B0aW9ucyA9IHt9XHJcbiAgICB0aGlzLmVkaXRvciA9IFtdO1xyXG4gICAgdGhpcy5jb250ZW50QXJlYXMgPSBbXTtcclxuICAgIHRoaXMudmVyc2lvbiA9ICcxLjAuMCc7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBleHRlbmQodHJ1ZSwgdGhpcy5vcHRpb25zLCBzZXR0aW5ncyk7XHJcbiAgICB0aGlzLm91dHB1dEpTT04gPSB7XHJcbiAgICAgIHRpbWU6IGQuZ2V0VGltZSgpLFxyXG4gICAgICBibG9ja3M6IFtdLFxyXG4gICAgICB2ZXJzaW9uOiB0aGlzLm9wdGlvbnMudmVyc2lvblxyXG4gICAgfTtcclxuICAgIHRoaXMucHJldHR5T3V0cHV0ID0gJyc7XHJcbiAgICB0aGlzLmpzb25VcGRhdGVkKCk7XHJcbiAgICB0aGlzLmluaXQoKTtcclxuICAgIHRoaXMubW9kdWxlcyA9IG5ldyBNb2R1bGVzKHRoaXMpO1xyXG4gICAgdGhpcy5hY3RpdmVDb250ZXh0TWVudSA9IGZhbHNlO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy51cGRhdGUgJiYgdHlwZW9mIHRoaXMub3B0aW9ucy51cGRhdGUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdGhpcy51cGRhdGUgPSB0aGlzLm9wdGlvbnMudXBkYXRlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5idXR0b25Eb3duID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgc2l6emxlKCBzZWxlY3Rvcjogc3RyaW5nICkge1xyXG4gICAgaWYgKCFIZWxwZXIuaXNTdHJpbmcoc2VsZWN0b3IpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIHNlbGVjdG9yIHlvdSBhcmUgdXNpbmcgaXMgbm90IG9mIHRoZSB0eXBlIHN0cmluZzogJHtzZWxlY3Rvcn1gKTtcclxuICAgIH1cclxuICAgIHJldHVybiBTaXp6bGUoc2VsZWN0b3IpO1xyXG4gIH1cclxuXHJcbiAgYmVhdXRpZnkoKSB7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMub3V0cHV0SlNPTiAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgdGhpcy5wcmV0dHlPdXRwdXQgPSBKU09OLnN0cmluZ2lmeSh0aGlzLm91dHB1dEpTT04sIHVuZGVmaW5lZCwgMik7XHJcbiAgICB9XHJcbiAgICB0aGlzLnByZXR0eU91dHB1dCA9IHRoaXMucHJldHR5T3V0cHV0LnJlcGxhY2UoLyYvZywgJyZhbXAnKS5yZXBsYWNlKC88L2csICcmbHQ7JykucmVwbGFjZSgvPi9nLCAnJmd0OycpO1xyXG4gICAgdGhpcy5wcmV0dHlPdXRwdXQgPSB0aGlzLnByZXR0eU91dHB1dC5yZXBsYWNlKC8oXCIoXFxcXHVbYS16QS1aMC05XXs0fXxcXFxcW151XXxbXlxcXFxcIl0pKlwiKFxccyo6KT98XFxiKHRydWV8ZmFsc2V8bnVsbClcXGJ8LT9cXGQrKD86XFwuXFxkKik/KD86W2VFXVsrLV0/XFxkKyk/KS9nLCAobWF0Y2gpID0+IHtcclxuICAgICAgbGV0IGNscyA9ICdudW1iZXInO1xyXG4gICAgICBpZiAoL15cIi8udGVzdChtYXRjaCkpIHtcclxuICAgICAgICBpZiAoLzokLy50ZXN0KG1hdGNoKSkge1xyXG4gICAgICAgICAgY2xzID0gJ2tleSc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNscyA9ICdzdHJpbmcnO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICgvdHJ1ZXxmYWxzZS8udGVzdChtYXRjaCkpIHtcclxuICAgICAgICBjbHMgPSAnYm9vbGVhbic7XHJcbiAgICAgIH0gZWxzZSBpZiAoL251bGwvLnRlc3QobWF0Y2gpKSB7XHJcbiAgICAgICAgY2xzID0gJ251bGwnO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBgPHNwYW4gY2xhc3M9XCIke2Nsc31cIj4ke21hdGNofTwvc3Bhbj5gO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBiaW5kRXZlbnRzKCk6dm9pZCB7XHJcbiAgICBpZiAodGhpcy5lZGl0b3IubGVuZ3RoKSB7XHJcbiAgICAgIGZvciggbGV0IGVsZW1lbnQgb2YgdGhpcy5lZGl0b3IgKSB7XHJcbiAgICAgICAgaWYoIGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCApIHtcclxuICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljay5iaW5kKCB0aGlzICkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGFuZGxlQ2xpY2soIGV2ZW50OiBFdmVudCApOmFueSB7XHJcbiAgICBIZWxwZXIucHJldmVudFByb3AoZXZlbnQpO1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xyXG5cclxuICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoSGVscGVyLnBhcmVudENvbnRhaW5zQ2xhc3MoIHRhcmdldCwgJ2VkaXRvcl9idXR0b24nKSApIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0b3InKSAmJiB0YXJnZXQuY2hpbGRyZW4ubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuZ2FyYmFnZUNvbGxlY3Rpb24odGFyZ2V0KTtcclxuICAgICAgY29uc3QgbGFzdEl0ZW0gPSA8SFRNTEVsZW1lbnQ+IHRhcmdldC5jaGlsZHJlbi5pdGVtKCB0YXJnZXQuY2hpbGRyZW4ubGVuZ3RoIC0gMSApO1xyXG4gICAgICBjb25zdCBwb3NpdGlvbiA9IEhlbHBlci5nZXRQb3NpdGlvbihsYXN0SXRlbSk7XHJcbiAgICAgIGlmKCAhbGFzdEl0ZW0gKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGhlaWdodCA9IHBvc2l0aW9uLnkgKyBsYXN0SXRlbS5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgIGNvbnN0IGNsaWNrUG9zaXRpb25zID0gSGVscGVyLmdldENsaWNrUG9zaXRpb24oZXZlbnQpO1xyXG5cclxuICAgICAgaWYgKGxhc3RJdGVtICYmIChoZWlnaHQgKyAxMCkgPCBjbGlja1Bvc2l0aW9ucy55KSB7XHJcbiAgICAgICAgdGhpcy5hZGRFZGl0YWJsZUFyZWEoKTtcclxuICAgICAgfVxyXG4gICAgfSBcclxuICAgIGVsc2UgaWYgKCFIZWxwZXIucGFyZW50Q29udGFpbnNDbGFzcyh0YXJnZXQsICdibG9jaycpKSB7XHJcbiAgICAgIFxyXG4gICAgICB0aGlzLmFkZEVkaXRhYmxlQXJlYSgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVJbnB1dCggZXZlbnQ6IEV2ZW50ICk6YW55IHtcclxuICAgIGNvbnN0IGVsZW0gPSBldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIGlmKCAhZWxlbSApIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgYmxvY2tJbmRleCA9IGVsZW0uZGF0YXNldC5ibG9ja2luZGV4O1xyXG4gICAgY29uc3QgdmFsdWUgPSBlbGVtLmlubmVySFRNTDtcclxuXHJcbiAgICBpZiAoYmxvY2tJbmRleCAmJiB0aGlzLm91dHB1dEpTT04uYmxvY2tzLmxlbmd0aCAmJiB0aGlzLm91dHB1dEpTT04uYmxvY2tzW2Jsb2NrSW5kZXhdKSB7XHJcbiAgICAgIHRoaXMub3V0cHV0SlNPTi5ibG9ja3NbYmxvY2tJbmRleF0uZGF0YS50ZXh0ID0gc2FuaXRpemVIdG1sKHZhbHVlLCBjb25maWcuZGVmYXVsdC5zYW5pdGl6ZWh0bWwgKTtcclxuICAgICAgdGhpcy5qc29uVXBkYXRlZCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYWRkRWRpdGFibGVBcmVhKCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBpZiAodGhpcy5lZGl0b3IubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKCdibG9ja193cmFwcGVyJyk7XHJcbiAgICAgIHdyYXBwZXIuZGF0YXNldC5ibG9ja2luZGV4ID0gc2VsZi5vdXRwdXRKU09OLmJsb2Nrcy5sZW5ndGg7XHJcblxyXG4gICAgICBjb25zdCBvcHRpb25CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuXHJcbiAgICAgIG9wdGlvbkJ1dHRvbi5kYXRhc2V0LmJsb2NraW5kZXggPSBzZWxmLm91dHB1dEpTT04uYmxvY2tzLmxlbmd0aDtcclxuICAgICAgb3B0aW9uQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2VkaXRvcl9idXR0b24nKTtcclxuXHJcbiAgICAgIGNvbnN0IG1vdmVPcHRpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcblxyXG4gICAgICBvcHRpb25CdXR0b24uaW5uZXJIVE1MID0gJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHg9XCIwcHhcIiB5PVwiMHB4XCIgd2lkdGg9XCIzMFwiIGhlaWdodD1cIjMwXCIgdmlld0JveD1cIjAgMCAzMCAzMFwiIHN0eWxlPVwiIGZpbGw6aW5oZXJpdDtcIj48cGF0aCBkPVwiTTE1LDNDOC4zNzMsMywzLDguMzczLDMsMTVjMCw2LjYyNyw1LjM3MywxMiwxMiwxMnMxMi01LjM3MywxMi0xMkMyNyw4LjM3MywyMS42MjcsMywxNSwzeiBNMjEsMTZoLTV2NSBjMCwwLjU1My0wLjQ0OCwxLTEsMXMtMS0wLjQ0Ny0xLTF2LTVIOWMtMC41NTIsMC0xLTAuNDQ3LTEtMXMwLjQ0OC0xLDEtMWg1VjljMC0wLjU1MywwLjQ0OC0xLDEtMXMxLDAuNDQ3LDEsMXY1aDUgYzAuNTUyLDAsMSwwLjQ0NywxLDFTMjEuNTUyLDE2LDIxLDE2elwiPjwvcGF0aD48L3N2Zz4nO1xyXG5cclxuICAgICAgb3B0aW9uQnV0dG9uLnN0eWxlLmNzc1RleHQgPSAncG9zaXRpb246YWJzb2x1dGU7bGVmdDotNDBweDt0b3A6IDUwJTsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKCAtNTAlICk7IGN1cnNvcjpwb2ludGVyO3otaW5kZXg6IDk5OTk5OTk5OTsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IGJvcmRlcjogMDsnO1xyXG4gICAgICBvcHRpb25CdXR0b24uY2xhc3NMaXN0LmFkZCgnZWRpdG9yX2J1dHRvbicpO1xyXG4gICAgICBvcHRpb25CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBIZWxwZXIucHJldmVudFByb3AoZXZlbnQpO1xyXG4gICAgICAgIHNlbGYuYnV0dG9uRG93biA9IHRydWU7XHJcbiAgICAgICAgc2VsZi5tb2R1bGVzLmhhbmRsZU9wdGlvbkNsaWNrKCBldmVudCwgdGhpcywgc2VsZiApO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIG1vdmVPcHRpb25zLnN0eWxlLmNzc1RleHQgPSAncG9zaXRpb246YWJzb2x1dGU7Y3Vyc29yOnBvaW50ZXI7cmlnaHQ6LTQwcHg7dG9wOjUwJTt0cmFuc2Zvcm06dHJhbnNsYXRlWSggLTUwJSApOyB6LWluZGV4OiA5OTk5OTk5OTsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IGJvcmRlcjogMDsnO1xyXG4gICAgICBtb3ZlT3B0aW9ucy5jbGFzc0xpc3QuYWRkKCdlZGl0b3JfYnV0dG9uJyk7XHJcblxyXG4gICAgICBtb3ZlT3B0aW9ucy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgc2VsZi5idXR0b25Eb3duID0gdHJ1ZTtcclxuICAgICAgICBzZWxmLm1vZHVsZXMuaGFuZGxlTW92ZUNsaWNrKGV2ZW50LCB0aGlzLCBzZWxmKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBtb3ZlT3B0aW9ucy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuc3R5bGUuZmlsbCA9ICdibHVlJztcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBtb3ZlT3B0aW9ucy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuc3R5bGUuZmlsbCA9ICdibGFjayc7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgb3B0aW9uQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zdHlsZS5maWxsID0gJ2JsdWUnO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIG9wdGlvbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuc3R5bGUuZmlsbCA9ICdibGFjayc7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgbW92ZU9wdGlvbnMuaW5uZXJIVE1MID0gJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHg9XCIwcHhcIiB5PVwiMHB4XCIgd2lkdGg9XCIzMFwiIGhlaWdodD1cIjMwXCIgdmlld0JveD1cIjAgMCAzMCAzMFwiIHN0eWxlPVwiIGZpbGw6aW5oZXJpdDtcIj48cGF0aCBzdHlsZT1cImxpbmUtaGVpZ2h0Om5vcm1hbDt0ZXh0LWluZGVudDowO3RleHQtYWxpZ246c3RhcnQ7dGV4dC1kZWNvcmF0aW9uLWxpbmU6bm9uZTt0ZXh0LWRlY29yYXRpb24tc3R5bGU6c29saWQ7dGV4dC1kZWNvcmF0aW9uLWNvbG9yOiMwMDA7dGV4dC10cmFuc2Zvcm06bm9uZTtibG9jay1wcm9ncmVzc2lvbjp0Yjtpc29sYXRpb246YXV0bzttaXgtYmxlbmQtbW9kZTpub3JtYWxcIiBkPVwiTSAzIDcgQSAxLjAwMDEgMS4wMDAxIDAgMSAwIDMgOSBMIDI3IDkgQSAxLjAwMDEgMS4wMDAxIDAgMSAwIDI3IDcgTCAzIDcgeiBNIDMgMTQgQSAxLjAwMDEgMS4wMDAxIDAgMSAwIDMgMTYgTCAyNyAxNiBBIDEuMDAwMSAxLjAwMDEgMCAxIDAgMjcgMTQgTCAzIDE0IHogTSAzIDIxIEEgMS4wMDAxIDEuMDAwMSAwIDEgMCAzIDIzIEwgMjcgMjMgQSAxLjAwMDEgMS4wMDAxIDAgMSAwIDI3IDIxIEwgMyAyMSB6XCIgZm9udC13ZWlnaHQ9XCI0MDBcIiBmb250LWZhbWlseT1cInNhbnMtc2VyaWZcIiB3aGl0ZS1zcGFjZT1cIm5vcm1hbFwiIG92ZXJmbG93PVwidmlzaWJsZVwiPjwvcGF0aD48L3N2Zz4nO1xyXG5cclxuICAgICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICBub2RlLnNldEF0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJywgJ3RydWUnKTtcclxuICAgICAgbm9kZS5jbGFzc0xpc3QuYWRkKCdibG9jaycpO1xyXG4gICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdGhpcy5oYW5kbGVJbnB1dC5iaW5kKHRoaXMpKTtcclxuICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuaGFuZGxlRm9jdXMuYmluZCh0aGlzKSk7XHJcbiAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMuaGFuZGxlQmx1ci5iaW5kKHRoaXMpKTtcclxuICAgICAgbm9kZS5kYXRhc2V0LmJsb2NraW5kZXggPSB0aGlzLm91dHB1dEpTT04uYmxvY2tzLmxlbmd0aDtcclxuICAgICAgdGhpcy5lZGl0b3JbMF0uYXBwZW5kQ2hpbGQob3B0aW9uQnV0dG9uKTtcclxuICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChvcHRpb25CdXR0b24pO1xyXG4gICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKG5vZGUpO1xyXG4gICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKG1vdmVPcHRpb25zKTtcclxuICAgICAgdGhpcy5lZGl0b3JbMF0uYXBwZW5kQ2hpbGQod3JhcHBlcik7XHJcbiAgICAgIHRoaXMub3V0cHV0SlNPTi5ibG9ja3MucHVzaCh7IHR5cGU6ICdwYXJhZ3JhcGgnLCBkYXRhOiB7IHRleHQ6ICcnIH0gfSk7XHJcbiAgICAgIHRoaXMuanNvblVwZGF0ZWQoKTtcclxuICAgICAgbm9kZS5mb2N1cygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGFuZGxlRm9jdXMoIGV2ZW50OiBFdmVudCApIHtcclxuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcclxuICAgIGNvbnN0IGJ1dHRvbiA9IHRhcmdldC5wcmV2aW91c1NpYmxpbmcgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBpZiggIWJ1dHRvbiApIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgbGV0IG1vdmVPcHRpb25zID0gdGFyZ2V0Lm5leHRTaWJsaW5nIGFzIEhUTUxFbGVtZW50O1xyXG5cclxuICAgIGlmIChtb3ZlT3B0aW9ucy5ub2RlTmFtZSA9PT0gJ0RJVicpIHtcclxuICAgICAgbW92ZU9wdGlvbnMucmVtb3ZlKCk7XHJcbiAgICAgIG1vdmVPcHRpb25zID0gdGFyZ2V0Lm5leHRTaWJsaW5nIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmVPcHRpb25zLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVCbHVyKCBldmVudDogRXZlbnQgKSA6dm9pZCB7XHJcbiAgICBjb25zdCBlbGVtID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xyXG4gICAgY29uc3QgdmFsdWUgPSBlbGVtLmlubmVySFRNTDtcclxuICAgIGxldCBjbGVhblZhbHVlOiBhbnk7XHJcbiAgICBjbGVhblZhbHVlID0gc2FuaXRpemVIdG1sKHZhbHVlLCBjb25maWcuZGVmYXVsdC5zYW5pdGl6ZWh0bWwgKTtcclxuICAgIGNsZWFuVmFsdWUgPSBjbGVhblZhbHVlLnJlcGxhY2UoIC88W15cXC8+XVtePl0qPjxcXC9bXj5dKz4vZywgJycgKTtcclxuICAgIGVsZW0uaW5uZXJIVE1MID0gY2xlYW5WYWx1ZSB8fCB2YWx1ZTtcclxuICAgIGNvbnN0IG9wdGlvbkJ1dHRvbiA9IGVsZW0ucHJldmlvdXNTaWJsaW5nIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgbGV0IG1vdmVPcHRpb25zID0gZWxlbS5uZXh0U2libGluZyBhcyBIVE1MRWxlbWVudDtcclxuXHJcbiAgICBpZiAobW92ZU9wdGlvbnMubm9kZU5hbWUgPT09ICdESVYnKSB7XHJcbiAgICAgIG1vdmVPcHRpb25zLnJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmVPcHRpb25zID0gZWxlbS5uZXh0U2libGluZyBhcyBIVE1MRWxlbWVudDtcclxuXHJcbiAgICBpZiAobW92ZU9wdGlvbnMuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xyXG4gICAgICBtb3ZlT3B0aW9ucy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm1vZHVsZXMuaGFuZGxlQmx1cihldmVudCwgZWxlbSwgdGhpcyk7XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5idXR0b25Eb3duKSB7XHJcbiAgICAgICAgb3B0aW9uQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgbW92ZU9wdGlvbnMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmJ1dHRvbkRvd24gPSBmYWxzZTtcclxuICAgIH0sIDYwMCk7XHJcbiAgfVxyXG5cclxuICBpbml0KCkgOnZvaWQge1xyXG4gICAgaWYgKCAhdGhpcy5vcHRpb25zLnNlbGVjdG9yICkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSB1c2UgY3NzIHNlbGVjdG9yIHRvIHNldCB0aGUgZWRpdG9yIGluc3RhbmNlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5lZGl0b3IgPSBHb2F0Q3Vycnkuc2l6emxlKHRoaXMub3B0aW9ucy5zZWxlY3Rvcik7XHJcblxyXG4gICAgaWYgKHRoaXMuZWRpdG9yLmxlbmd0aCkgeyAvLyBUT0RPOiBleHRlbmQgc28geW91IGNhbiBoYXZlIG11bHRpcGxlIGluc3RhbmNlcztcclxuICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBnYXJiYWdlQ29sbGVjdGlvbiggdGFyZ2V0OiBIVE1MRWxlbWVudCApIHtcclxuICAgIGNvbnN0IGNoaWxkcmVuID0gdGFyZ2V0LmNoaWxkcmVuIGFzIGFueTtcclxuICAgIGNvbnN0IHJlbW92ZWQ6IGFueSA9IFtdO1xyXG4gICAgZm9yKCBsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKyApIHtcclxuXHJcbiAgICAgIGlmKCBjaGlsZHJlbltpXSAmJiBjaGlsZHJlbltpXS5jaGlsZHJlbi5sZW5ndGggJiYgY2hpbGRyZW5baV0uY2hpbGRyZW5bMV0gKSB7XHJcblxyXG4gICAgICAgIGxldCBpdGVtID0gY2hpbGRyZW5baV0uY2hpbGRyZW5bMV07XHJcblxyXG4gICAgICAgIGlmKCAhaXRlbS5jaGlsZHJlbi5sZW5ndGggfHwgIUhUTUxIYW5kbGVyLnN0cmlwVGFncyggaXRlbS5pbm5lckhUTUwudHJpbSgpICkgKSB7XHJcbiAgICAgICAgICByZW1vdmVkLnB1c2goIGNoaWxkcmVuW2ldLmRhdGFzZXQuYmxvY2tpbmRleCApO1xyXG4gICAgICAgICAgY2hpbGRyZW5baV0ucmVtb3ZlKCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlZC5mb3JFYWNoKCggZTogbnVtYmVyICkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5vdXRwdXRKU09OLmJsb2Nrc1tlXSkge1xyXG4gICAgICAgIHRoaXMub3V0cHV0SlNPTi5ibG9ja3Muc3BsaWNlKGUsIDEpO1xyXG4gICAgICAgIHRoaXMuanNvblVwZGF0ZWQoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5vdXRwdXRKU09OLmJsb2Nrcy5mb3JFYWNoKChlOiBhbnksIGk6IG51bWJlcikgPT4ge1xyXG4gICAgICBpZiAoIWUuZGF0YS50ZXh0ICYmICFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1ibG9ja2luZGV4PVwiJHtpfVwiXWApKSB7XHJcbiAgICAgICAgdGhpcy5vdXRwdXRKU09OLmJsb2Nrcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3B0aW9uJyk7XHJcbiAgICBpZiAob3B0aW9ucykge1xyXG4gICAgICBvcHRpb25zLnJlbW92ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCAuLi52YWx1ZXM6IGFueSApIDp2b2lkIHtcclxuXHJcbiAgfVxyXG5cclxuICBqc29uVXBkYXRlZCgpIHtcclxuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgdGhpcy5vdXRwdXRKU09OLnRpbWUgPSBkLmdldFRpbWUoKTtcclxuICAgIHRoaXMuYmVhdXRpZnkoKTtcclxuICAgIHRoaXMudXBkYXRlKHRoaXMucHJldHR5T3V0cHV0KTtcclxuICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBHb2F0Q3Vycnk7XHJcbiJdfQ==