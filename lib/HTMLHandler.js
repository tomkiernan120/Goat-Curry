"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint linebreak-style: ["error", "windows"] */
var HTMLHandler =
/*#__PURE__*/
function () {
  function HTMLHandler() {
    _classCallCheck(this, HTMLHandler);
  }

  _createClass(HTMLHandler, null, [{
    key: "stripTags",
    value: function stripTags(html) {
      var tmp = document.createElement('DIV');
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || '';
    }
  }]);

  return HTMLHandler;
}();

module.exports = HTMLHandler;
var _default = HTMLHandler;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9IVE1MSGFuZGxlci50cyJdLCJuYW1lcyI6WyJIVE1MSGFuZGxlciIsImh0bWwiLCJ0bXAiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJ0ZXh0Q29udGVudCIsImlubmVyVGV4dCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUNNQSxXOzs7Ozs7Ozs7OEJBQ2FDLEksRUFBYztBQUM3QixVQUFNQyxHQUFHLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixLQUF2QixDQUFaO0FBQ0FGLE1BQUFBLEdBQUcsQ0FBQ0csU0FBSixHQUFnQkosSUFBaEI7QUFDQSxhQUFPQyxHQUFHLENBQUNJLFdBQUosSUFBbUJKLEdBQUcsQ0FBQ0ssU0FBdkIsSUFBb0MsRUFBM0M7QUFDRDs7Ozs7O0FBSUhDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQlQsV0FBakI7ZUFFZUEsVyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludCBsaW5lYnJlYWstc3R5bGU6IFtcImVycm9yXCIsIFwid2luZG93c1wiXSAqL1xyXG5jbGFzcyBIVE1MSGFuZGxlciB7XHJcbiAgc3RhdGljIHN0cmlwVGFncyhodG1sOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHRtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xyXG4gICAgdG1wLmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICByZXR1cm4gdG1wLnRleHRDb250ZW50IHx8IHRtcC5pbm5lclRleHQgfHwgJyc7XHJcbiAgfVxyXG59XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBIVE1MSGFuZGxlcjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhUTUxIYW5kbGVyO1xyXG4iXX0=