"use strict";
define("HTMLHandler", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HTMLHandler = (function () {
        function HTMLHandler() {
        }
        HTMLHandler.stripTags = function (html) {
            var tmp = document.createElement('DIV');
            tmp.innerHTML = html;
            return tmp.textContent || tmp.innerText || '';
        };
        return HTMLHandler;
    }());
    module.exports = HTMLHandler;
    exports.default = HTMLHandler;
});
define("Helper", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Helper = (function () {
        function Helper() {
        }
        Helper.preventProp = function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
        };
        Helper.isString = function (input) {
            return typeof input === 'string';
        };
        Helper.isPlainObject = function (val) {
            return !!val && typeof val === 'object';
        };
        Helper.isBrowser = function () {
            var array = [typeof window, typeof document];
            return array.indexOf('undefined') <= -1;
        };
        Helper.isValidJSON = function (str) {
            try {
                JSON.parse(str);
                return true;
            }
            catch (e) {
                return false;
            }
        };
        Helper.isArray = function (val) {
            return Array.isArray(val);
        };
        Helper.getClickPosition = function (event) {
            var currentEvent = event || window.event;
            var pageX = currentEvent.pageX;
            var pageY = currentEvent.pageY;
            if (pageX === undefined) {
                pageX = currentEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                pageY = currentEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            return { x: pageX, y: pageY };
        };
        Helper.moveArray = function (arr, oldIndex, newIndex) {
            if (newIndex >= arr.length) {
                var k = newIndex - arr.length + 1;
                while (k) {
                    k -= 1;
                    arr.push(undefined);
                }
            }
            arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
            return arr;
        };
        Helper.parentContainsClass = function (element, className) {
            var isContained = false;
            var newElement = element;
            if (newElement.classList.contains(className)) {
                isContained = true;
            }
            while (newElement && !isContained) {
                newElement = newElement.offsetParent;
                if (newElement && newElement.classList.contains(className)) {
                    isContained = true;
                }
            }
            return isContained;
        };
        Helper.getPosition = function (element) {
            var xPosition = 0;
            var yPosition = 0;
            var newElement = element;
            while (newElement) {
                xPosition += (newElement.offsetLeft - newElement.scrollLeft + newElement.clientLeft);
                yPosition += (newElement.offsetTop - newElement.scrollTop + newElement.clientTop);
                newElement = newElement.offsetParent;
            }
            return { x: xPosition, y: yPosition };
        };
        Helper.entries = function (obj) {
            var ownProps = Object.keys(obj);
            var i = ownProps.length;
            var resArray = [i];
            while (i--) {
                resArray[i] = [ownProps[i], obj[ownProps[i]]];
            }
            return resArray;
        };
        return Helper;
    }());
    module.exports = Helper;
    exports.default = Helper;
});
define("config", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var config = {
        sanitizehtml: {
            allowedTags: ['h1', 'h2', 'h3', 'h4', 'br']
        },
        icons: {
            plus: '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30" style=" fill:inherit;"><path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M21,16h-5v5 c0,0.553-0.448,1-1,1s-1-0.447-1-1v-5H9c-0.552,0-1-0.447-1-1s0.448-1,1-1h5V9c0-0.553,0.448-1,1-1s1,0.447,1,1v5h5 c0.552,0,1,0.447,1,1S21.552,16,21,16z"></path></svg>',
            paragraph: '<img width="60%" height="auto" style="width:60%;height:auto;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADgSURBVEhL7dQxDgFBGIbhLUgoFBJOISollULlHhqHcAAanWNI6Aml6JQaDVEolER4/1kS+bMj2c2sSMyXPMVMsW+yxQR+v7gsijEUkHgl9LHFPYEeYq+GPaI++O6K09P5eXfBER3EWhkH6EiUBV5rQO4m5pRg8nt1wMZpeAcdsHEWzkF//BNn4Qxu0AEbp796DR2wcRruQgdsnIbllVpCR6I4Dcvk2ZtChzTn4ddaGGGO1ZsNUg3bVoUP+3Aq82HZV8IVSGRmTuHqkLuxOaU0ec8HaJtTuDyGaJqT3x8vCB639MIVvmusGQAAAABJRU5ErkJggg==">',
            image: '<img width="60%" height="auto" style="width:60%;height:auto;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEoSURBVEhL7dYxS0JRGMbxG4m2JOQoTg19i7a2BvegLVqabXFsCpr6CEEFBX4NB5cQZ8GhwEGqrSGy/1tdOp3z3jjqe2jIB36g5773PnLOHcz+fVaw4VlH0uzhEVPFHTaRJBNopbkuavB3JEYVhdHKLPXRQBBt2NoZgmiD1i4RRBuc1RNevTVXkuIDSOqQ89RmzIsHcLMPbc68+AFl5DmGNpdkq2+xDdlyOWttZubiezx7a/OILn5BE5ISTuDPDBH7o6KLR/DTQn69IwukgnO492oWKpa45W1Z+Mop3Pt9CxdLpPwNVx/fvvNbuUmxZAtrnx9/pGjbzYqLsgvtedHFY+zMQc5de150sbU/K75AkB60YUuHCCJ/S+RtvEngGkdYxTLLpEyWvQOOk7YgRVwR3wAAAABJRU5ErkJggg==">',
            list: '<img width="60%" height="auto" style="width:60%;height:auto;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB0SURBVEhL7ZLRCYAwDETjEM7hPuqmLuFGmhMPDvMTpFKQPHjQNjQHaa14w+hu7nTtGoPmu3u4CGkKmlKEIIxoLWuAhWdzoBez/pj6RTTAQv2ifgzucot1c1aXD4QQRR8va0ADZhwIejFrAGNBY/jJiIoemJ3BGGlQG0dvZwAAAABJRU5ErkJggg==">',
            link: '<img width="63%" height="auto" style="width:63%;height:auto;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAC6SURBVDhPxZJBDgFBEEXrAlhxEkIkiBsY4jxizVk4BzYSwR3Gyg28361lIpl0rXjJS6pmUtU11WO/oocnfOIeO+hmhCXOsYEbVBMXA1TxNGQRNdEkLm64iOEHTXKIYZ41jvEeMrMJPlA7caFiFegTNIliNamlj2dMJ6fiFeq53teiAi1s+Y5TsYsuVrd9wXSyiyNqu1VmeI1hHt1rM4aBtO1hyBzscIstLDC77W/aqCaaRD+J+57/jdkLos8kYzw3XRYAAAAASUVORK5CYII=">',
            quote: '<img width="60%" height="auto" style="width:60%;height:auto;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADySURBVEhL7dQ9agJRFIbhaQ0uREzhEqxE0SJuIEVclY2pspIU6S0UwcofAjZpVGwSkvcTDlzGc/TWZl54Cs+c6wwqFlX/rwG2+C3RrA9riB3Ke5o9IWyD8iGzhvUJb0f0MGHegZTlXUuFecspy7uWCvOWU5Z3LRXmLacs71oq7NqX/ANrBW9HvhGmn2J0kw9YHSzh7b0ju2fo0BGPGgSNoL0DGhrkpMU9dFBvENWEHkB7eqCsaphCh940CHrADNp71SC3MXRogboGQRNobw7dLKsudOiElgZB+t/S3q3v56I2vvByfhXXg/ayP/equ6wo/gCI0ZVdTriXOgAAAABJRU5ErkJggg==">',
        }
    };
    exports.default = config;
});
define("index", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require('@babel/polyfill');
    var extend = require('extend');
    var Sizzle = require('sizzle');
    var sanitizeHtml = require('sanitize-html');
    var Helper = require('./Helper');
    var Modules = require('./modules');
    var HTMLHandler = require('./HTMLHandler');
    var config = require('./config');
    var GoatCurry = (function () {
        function GoatCurry(settings) {
            if (settings === void 0) { settings = {}; }
            this.settings = settings;
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
        GoatCurry.sizzle = function (selector) {
            if (!Helper.isString(selector)) {
                throw new Error("The selector you are using is not of the type string: " + selector);
            }
            return Sizzle(selector);
        };
        GoatCurry.prototype.beautify = function () {
            if (typeof this.outputJSON !== 'string') {
                this.prettyOutput = JSON.stringify(this.outputJSON, undefined, 2);
            }
            this.prettyOutput = this.prettyOutput.replace(/&/g, '&amp').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            this.prettyOutput = this.prettyOutput.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, function (match) {
                var cls = 'number';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'key';
                    }
                    else {
                        cls = 'string';
                    }
                }
                else if (/true|false/.test(match)) {
                    cls = 'boolean';
                }
                else if (/null/.test(match)) {
                    cls = 'null';
                }
                return "<span class=\"" + cls + "\">" + match + "</span>";
            });
        };
        GoatCurry.prototype.bindEvents = function () {
            if (this.editor.length) {
                for (var _i = 0, _a = this.editor; _i < _a.length; _i++) {
                    var element = _a[_i];
                    if (element instanceof HTMLElement) {
                        element.addEventListener('click', this.handleClick.bind(this));
                    }
                }
            }
        };
        GoatCurry.prototype.handleClick = function (event) {
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
                if (lastItem && (height + 10) < clickPositions.y) {
                    this.addEditableArea();
                }
            }
            else if (!Helper.parentContainsClass(target, 'block')) {
                this.addEditableArea();
            }
            return this;
        };
        GoatCurry.prototype.handleInput = function (event) {
            var elem = event.target;
            if (!elem) {
                return false;
            }
            var blockIndex = elem.dataset.blockindex;
            var value = elem.innerHTML;
            if (blockIndex && this.outputJSON.blocks.length && this.outputJSON.blocks[blockIndex]) {
                this.outputJSON.blocks[blockIndex].data.text = sanitizeHtml(value, config.default.sanitizehtml);
                this.jsonUpdated();
            }
        };
        GoatCurry.prototype.addEditableArea = function () {
            var self = this;
            if (this.editor.length) {
                var wrapper = document.createElement('div');
                wrapper.classList.add('block_wrapper');
                wrapper.dataset.blockindex = self.outputJSON.blocks.length;
                var optionButton = document.createElement('button');
                optionButton.dataset.blockindex = self.outputJSON.blocks.length;
                optionButton.classList.add('editor_button');
                var moveOptions = document.createElement('button');
                optionButton.innerHTML = config.default.icons.plus;
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
                this.outputJSON.blocks.push({ type: 'paragraph', data: { text: '' } });
                this.jsonUpdated();
                node.focus();
            }
        };
        GoatCurry.prototype.handleFocus = function (event) {
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
        };
        GoatCurry.prototype.handleBlur = function (event) {
            var _this = this;
            var elem = event.target;
            var value = elem.innerHTML;
            var cleanValue;
            cleanValue = sanitizeHtml(value, config.default.sanitizehtml);
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
        };
        GoatCurry.prototype.init = function () {
            if (!this.options.selector) {
                throw new Error('Please use css selector to set the editor instance');
            }
            this.editor = GoatCurry.sizzle(this.options.selector);
            if (this.editor.length) {
                this.bindEvents();
            }
            return;
        };
        GoatCurry.prototype.garbageCollection = function (target) {
            var _this = this;
            var children = target.children;
            var removed = [];
            for (var i = 0; i < children.length; i++) {
                if (children[i] && children[i].children.length && children[i].children[1]) {
                    var count = 0;
                    var item = void 0;
                    while (children[i].children[count] && count < children[i].children.length && !item) {
                        if (children[i].children[count].classList.contains('block')) {
                            item = children[i].children[count];
                        }
                        count++;
                    }
                    if (item && (!item.children.length || !HTMLHandler.stripTags(item.innerHTML.trim()))) {
                        removed.push(children[i].dataset.blockindex);
                        children[i].remove();
                        break;
                    }
                }
            }
            removed.forEach(function (e) {
                if (_this.outputJSON.blocks[e]) {
                    _this.outputJSON.blocks.splice(e, 1);
                    _this.jsonUpdated();
                }
            });
            this.outputJSON.blocks.forEach(function (e, i) {
                if (!e.data.text && !document.querySelector("[data-blockindex=\"" + i + "\"]")) {
                    _this.outputJSON.blocks.splice(i, 1);
                }
            });
            var options = document.querySelector('.option');
            if (options) {
                options.remove();
            }
        };
        GoatCurry.prototype.update = function () {
            var values = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                values[_i] = arguments[_i];
            }
        };
        GoatCurry.prototype.jsonUpdated = function () {
            var d = new Date();
            this.outputJSON.time = d.getTime();
            this.beautify();
            this.update(this.prettyOutput);
        };
        return GoatCurry;
    }());
    exports.default = GoatCurry;
});
define("modules", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GoatCurry = require('./index');
    var HTMLHandler = require('./HTMLHandler');
    var Helper = require('./Helper');
    var Header = require('./ModuleTypes/Header');
    var Paragraph = require('./ModuleTypes/Paragraph');
    var Image = require('./ModuleTypes/Image');
    var List = require('./ModuleTypes/List');
    var Link = require('./ModuleTypes/Link');
    var Quote = require('./ModuleTypes/Quote');
    var config = require('./config');
    var Modules = (function () {
        function Modules(GoatCurry) {
            this.options = GoatCurry.options;
            console.log(config.default);
            this.moduleTypes = {
                Heading: {
                    icon: [
                        '<svg width="60%" style="width:60%;height:60%" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="h1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="svg-inline--fa fa-h1 fa-w-20 fa-9x"><path fill="currentColor" d="M167.675 374.034V400c0 8.837-7.163 16-16 16H38.365c-8.837 0-16-7.163-16-16v-25.966c0-8.837 7.163-16 16-16h20.394v-203.64H38.365c-8.837 0-16-7.163-16-16V112c0-8.837 7.163-16 16-16h113.31c8.837 0 16 7.163 16 16v26.394c0 8.837-7.163 16-16 16h-20.822v71.767h122.29v-71.767h-20.822c-8.837 0-16-7.163-16-16V112c0-8.837 7.163-16 16-16h113.31c8.837 0 16 7.163 16 16v26.394c0 8.837-7.163 16-16 16h-20.393v203.64h20.393c8.837 0 16 7.163 16 16V400c0 8.837-7.163 16-16 16h-113.31c-8.837 0-16-7.163-16-16v-25.966c0-8.837 7.163-16 16-16h20.822v-70.91h-122.29v70.91h20.822c8.837 0 16 7.164 16 16zM534.062 96h-37.166a16.001 16.001 0 0 0-11.085 4.462l-68.156 65.476c-6.347 6.098-6.578 16.177-.515 22.558l21.562 22.698c6.08 6.4 16.195 6.667 22.604.595l18.608-17.629.155-.151.038-.039v158.497H430.17c-8.837 0-16 7.163-16 16V400c0 8.837 7.163 16 16 16H600c8.837 0 16-7.163 16-16v-31.532c0-8.837-7.163-16-16-16h-49.938V112c0-8.837-7.163-16-16-16z" class=""></path></svg>',
                        '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="h2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="svg-inline--fa fa-h2 fa-w-20 fa-9x"><path fill="currentColor" d="M480.776 352.493h124.659c8.837 0 16 7.163 16 16V400c0 8.837-7.163 16-16 16H418.863c-8.053 0-14.853-5.993-15.873-13.981-1.112-8.71-1.708-14.601-1.708-20.982 0-113.106 142.094-134.46 142.094-187.461 0-23.744-19.197-34.372-38.224-34.372-18.898 0-33.069 11.294-43.838 26.397-4.988 6.994-14.706 8.641-21.855 3.878l-28.274-18.837c-7.179-4.783-9.222-14.365-4.74-21.736 22.015-36.198 59.594-57.917 103.415-57.917 59.187 0 106.866 37.127 106.866 97.879.002 95.615-121.174 119.02-135.95 163.625zm-313.101 21.541V400c0 8.837-7.163 16-16 16H38.365c-8.837 0-16-7.163-16-16v-25.966c0-8.837 7.163-16 16-16h20.394v-203.64H38.365c-8.837 0-16-7.163-16-16V112c0-8.837 7.163-16 16-16h113.31c8.837 0 16 7.163 16 16v26.394c0 8.837-7.163 16-16 16h-20.822v71.767h122.29v-71.767h-20.822c-8.837 0-16-7.163-16-16V112c0-8.837 7.163-16 16-16h113.31c8.837 0 16 7.163 16 16v26.394c0 8.837-7.163 16-16 16h-20.393v203.64h20.393c8.837 0 16 7.163 16 16V400c0 8.837-7.163 16-16 16h-113.31c-8.837 0-16-7.163-16-16v-25.966c0-8.837 7.163-16 16-16h20.822v-70.91h-122.29v70.91h20.822c8.837 0 16 7.164 16 16z" class=""></path></svg>',
                        '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="h3" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="svg-inline--fa fa-h3 fa-w-20 fa-9x"><path fill="currentColor" d="M548.084 315.553c0-28.593-28.492-39.079-57.056-39.079H475.28a16 16 0 0 1-14.648-9.563l-8.305-18.899a16 16 0 0 1 2.422-16.758l52.422-62.099c3-3.535 5.863-6.752 8.482-9.6-2.309.048-4.81.077-7.505.077h-82.734c-8.837 0-16-7.163-16-16v-31.507c0-8.837 7.163-16 16-16h169.749c8.837 0 16 7.163 16 16v23.686c0 3.846-1.386 7.564-3.903 10.472l-63.567 73.429c43.714 11.56 76.029 45.669 76.029 93.702 0 58.107-44.871 107.722-114.998 107.722-37.029 0-73.657-12.975-100.954-38.086-5.808-5.343-6.878-14.114-2.5-20.68l19.492-29.238c5.279-7.919 16.318-9.573 23.566-3.405 16.306 13.876 35.164 23.195 56.973 23.195 27.108-.001 46.783-15.716 46.783-37.369zm-380.409 58.481V400c0 8.837-7.163 16-16 16H38.365c-8.837 0-16-7.163-16-16v-25.966c0-8.837 7.163-16 16-16h20.394v-203.64H38.365c-8.837 0-16-7.163-16-16V112c0-8.837 7.163-16 16-16h113.31c8.837 0 16 7.163 16 16v26.394c0 8.837-7.163 16-16 16h-20.822v71.767h122.29v-71.767h-20.822c-8.837 0-16-7.163-16-16V112c0-8.837 7.163-16 16-16h113.31c8.837 0 16 7.163 16 16v26.394c0 8.837-7.163 16-16 16h-20.393v203.64h20.393c8.837 0 16 7.163 16 16V400c0 8.837-7.163 16-16 16h-113.31c-8.837 0-16-7.163-16-16v-25.966c0-8.837 7.163-16 16-16h20.822v-70.91h-122.29v70.91h20.822c8.837 0 16 7.164 16 16z" class=""></path></svg>',
                    ],
                    tag: 'h1',
                    levels: [1, 2, 3],
                    method: Header.render,
                },
                Paragraph: {
                    icon: config.default.icons.paragraph,
                    tag: 'p',
                    method: Paragraph.render,
                },
                Image: {
                    icon: config.default.icons.image,
                    tag: 'img',
                    method: Image.render,
                },
                List: {
                    icon: config.default.icons.list,
                    tag: 'ul',
                    method: List.render,
                },
                Link: {
                    icon: config.default.icons.link,
                    tag: 'a',
                    method: Link.render,
                },
                Quote: {
                    icon: config.default.icons.quote,
                    tag: 'blockquote',
                    method: Quote.render,
                },
            };
            this.goatcurry = GoatCurry;
        }
        Modules.prototype.addModuleType = function (options) {
            if (typeof options !== 'object') {
                throw new Error("Please make sure options for addModuleType is a Obect not " + typeof options);
            }
            var AlreadyExists = false;
            this.moduleTypes.forEach(function (e) {
                if (e.name === options.name) {
                    AlreadyExists = true;
                }
            });
            if (!options.name) {
                throw new Error('Please specify a module name');
            }
            if (AlreadyExists) {
                return false;
            }
            this.moduleTypes.push(options);
            return this.moduleTypes;
        };
        Modules.prototype.handleMoveClick = function (event, elem, GoatCurry) {
            if (elem && !elem.classList.contains('active')) {
                elem.classList.add('active');
                var popUp = document.createElement('div');
                popUp.style.cssText = 'width:170px;height:50px; border:0; position: absolute; background: white;box-shadow: rgba(0, 0, 0, 0.2) 4px 5px 24px 2px; top: -60px;right:-100px;display:grid;grid-template-columns: repeat( 3, 1fr );';
                var moveUpButton = document.createElement('button');
                moveUpButton.innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACBSURBVEhL7Y1LCoAwDETr0sOKih7EO3kuP5kSMYRK1aa7PBiaQDovOJY0lImD2RQULpSDg9lMostNJbJ851fORRJd3vOMYC6SpMrBJQBFkpmiy4EUACnBn9eMlI3Sxe1GCwBucDvE7QMtv5KUAKRuf/EkMMMFWVyQpbpg5ThWhHACOylBKM8nzs0AAAAASUVORK5CYII=">';
                moveUpButton.style.cssText = 'background:transparent;cursor:pointer;border:0;';
                var removeButton = document.createElement('button');
                removeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24" style=" fill:inherit;"><path style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;block-progression:tb;isolation:auto;mix-blend-mode:normal" d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z" font-weight="400" font-family="sans-serif" white-space="normal" overflow="visible"></path></svg>';
                removeButton.style.cssText = 'background:transparent; cursor:pointer; border: 0;';
                removeButton.addEventListener('click', this.removeButton.bind(this));
                moveUpButton.addEventListener('click', function (e) {
                    Helper.preventProp(e);
                    var target = e.currentTarget;
                    var wrapper = target.parentElement.parentElement;
                    var blockIndex = wrapper.dataset.blockindex;
                    if (blockIndex <= 0) {
                        return false;
                    }
                    var parent = wrapper.parentElement;
                    wrapper.remove();
                    parent.insertBefore(wrapper, parent.children[blockIndex - 1]);
                    Helper.moveArray(GoatCurry.outputJSON.blocks, blockIndex, blockIndex - 1);
                    GoatCurry.jsonUpdated();
                    GoatCurry.modules.recalculateBlockIndex();
                    return true;
                });
                popUp.appendChild(moveUpButton);
                popUp.appendChild(removeButton);
                var moveDownButton = document.createElement('button');
                moveDownButton.innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACNSURBVEhL7ZJJCoAwDEXrUu8q4nAQD6XHcsjXBEOptGK664NPB9P/NrqCNStlubd5ODjZKIIoRRDFVNDwqnkT1Lwm01M2SnudHkICzGAWb5KZKCjaKR0uGF+Ab5jB3YiLVCrKTPElWqDLMYs3nwhJRPC7XPAlIjApF7REx6Rc8CWm5QIK8acMvC9Y4NwJy9tBKxU50YEAAAAASUVORK5CYII=">';
                moveDownButton.style.cssText = 'background: transparent; cursor:pointer; border: 0;';
                moveDownButton.addEventListener('click', function (e) {
                    Helper.preventProp(e);
                    var target = e.currentTarget;
                    if (!target) {
                        return false;
                    }
                    var wrapper = target.parentElement.parentElement;
                    var blockIndex = wrapper.dataset.blockindex;
                    if (blockIndex < 0) {
                        return false;
                    }
                    var parent = wrapper.parentElement;
                    wrapper.remove();
                    parent.insertBefore(wrapper, parent.children[blockIndex + 1]);
                    Helper.moveArray(GoatCurry.outputJSON.blocks, blockIndex, blockIndex + 1);
                    GoatCurry.jsonUpdated();
                    GoatCurry.modules.recalculateBlockIndex();
                    return true;
                });
                popUp.appendChild(moveDownButton);
                if (elem && elem.parentNode) {
                    elem.parentNode.insertBefore(popUp, elem);
                }
            }
        };
        Modules.prototype.handleOptionClick = function (event, elem) {
            var _this = this;
            var popup = document.createElement('div');
            popup.classList.add('option');
            var length = Object.keys(this.moduleTypes).length;
            popup.style.cssText = "background:#fff;width:250px;height:50px;position:absolute;top:0;left:0;z-index:99999999999;box-shadow: rgba(0, 0, 0, 0.2) 4px 5px 24px 2px;display:grid;grid-template-columns: repeat( " + length + ", 1fr );";
            if (elem && elem.parentNode) {
                elem.parentNode.insertBefore(popup, elem);
            }
            var entries = Helper.entries(this.moduleTypes);
            entries.forEach(function (e) {
                var name = e[0];
                var property = e[1];
                var button = document.createElement('button');
                var icon = property.icon;
                if (Helper.isArray(icon)) {
                    var first = icon[0];
                    button.innerHTML = first;
                }
                else {
                    button.innerHTML = icon;
                }
                button.style.cssText = 'background:transparent;border:0;cursor:pointer;';
                var method = property.method;
                button.addEventListener('click', function (ev) { return method(ev, _this.goatcurry); });
                popup.append(button);
            });
            return this;
        };
        Modules.prototype.removeButton = function (e) {
            Helper.preventProp(e);
            var elem = e.currentTarget;
            if (!elem.classList.contains('clicked')) {
                elem.classList.add('clicked');
                elem.style.fill = 'red';
            }
            else {
                var blockindex = void 0;
                if (elem && elem.parentElement && elem.parentElement.parentElement && elem.parentElement.parentElement.dataset) {
                    blockindex = elem.parentElement.parentElement.dataset;
                }
                if (!elem) {
                    return false;
                }
                this.goatcurry.outputJSON.blocks.splice(blockindex, 1);
                if (elem && elem.parentElement && elem.parentElement.parentElement) {
                    elem.parentElement.parentElement.remove();
                    elem.remove();
                }
                this.goatcurry.jsonUpdated();
            }
        };
        Modules.prototype.handleBlur = function (event) {
            console.log(event);
            var newElem = event.currentTarget;
            console.log(newElem);
            var blockindex = newElem.dataset.blockindex;
            console.log(blockindex);
            var type = this.goatcurry.outputJSON.blocks[blockindex].type;
            console.log(type);
            var typeCapitalized = type.charAt(0).toUpperCase() + type.slice(1);
            console.log(type);
            var tag = this.moduleTypes[typeCapitalized].tag;
            if (tag) {
                var htmlTag = document.createElement(tag);
                htmlTag.innerHTML = HTMLHandler.stripTags(newElem.innerHTML);
                newElem.innerHTML = '';
                newElem.appendChild(htmlTag);
            }
        };
        Modules.prototype.recalculateBlockIndex = function () {
            var wrappers = document.querySelectorAll('.block_wrapper');
            wrappers.forEach(function (e, i) {
                e.dataset.blockindex = i;
            });
        };
        return Modules;
    }());
    module.exports = Modules;
    exports.default = Modules;
});
define("ModuleTypes/Header", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HTMLHandler = require("../HTMLHandler");
    var Helper = require("../Helper");
    var Header = (function () {
        function Header() {
        }
        Header.render = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log('test');
            var event = args[0], GoatCurry = args[1];
            Helper.preventProp(event);
            var currentTarget = event.currentTarget;
            while (!currentTarget.classList.contains('block_wrapper')) {
                currentTarget = currentTarget.offsetParent;
            }
            var children = currentTarget.children;
            var item;
            if (children.length) {
                for (var i = 0; i < children.length; i++) {
                    console.log(children[i]);
                    if (children[i].classList.contains('block')) {
                        item = children[i];
                    }
                }
            }
            if (typeof item === "undefined" || !item) {
                return false;
            }
            var newInner = HTMLHandler.stripTags(item.innerHTML);
            var blockindex = currentTarget.dataset.blockindex;
            var tag = document.createElement('h1');
            tag.innerHTML = newInner;
            item.innerHTML = '';
            item.appendChild(tag);
            if (GoatCurry.outputJSON.blocks[blockindex]) {
                GoatCurry.outputJSON.blocks[blockindex].type = 'heading';
                GoatCurry.jsonUpdated();
            }
        };
        return Header;
    }());
    module.exports = Header;
    exports.default = Header;
});
define("ModuleTypes/Image", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Image = (function () {
        function Image() {
        }
        Image.render = function () {
        };
        return Image;
    }());
    module.exports = Image;
    exports.default = Image;
});
define("ModuleTypes/Link", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Link = (function () {
        function Link() {
        }
        Link.render = function () {
        };
        return Link;
    }());
    exports.default = Link;
});
define("ModuleTypes/List", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var List = (function () {
        function List() {
        }
        List.render = function () {
        };
        return List;
    }());
    exports.default = List;
});
define("ModuleTypes/Paragraph", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Paragraph = (function () {
        function Paragraph() {
        }
        Paragraph.render = function () {
        };
        return Paragraph;
    }());
    exports.default = Paragraph;
});
define("ModuleTypes/Quote", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Quote = (function () {
        function Quote() {
        }
        Quote.render = function () {
        };
        return Quote;
    }());
    exports.default = Quote;
});
define("ModuleTypes/index", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Header = require('./Header');
    exports.Header = Header;
    var Paragraph = require('./Paragraph');
    exports.Paragraph = Paragraph;
    var Image = require('./Image');
    exports.Image = Image;
    var List = require('./List');
    exports.List = List;
    var Link = require('./Link');
    exports.Link = Link;
    var Quote = require('./Quote');
    exports.Quote = Quote;
    module.exports = {
        Header: Header, Paragraph: Paragraph, Image: Image, List: List, Link: Link, Quote: Quote,
    };
});
//# sourceMappingURL=index.js.map