"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HTMLHandler = require("../HTMLHandler");

var Helper = require("../Helper");

var Header =
/*#__PURE__*/
function () {
  function Header() {
    _classCallCheck(this, Header);
  }

  _createClass(Header, null, [{
    key: "render",
    value: function render() {
      console.log('test');

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var event = args[0],
          GoatCurry = args[1];
      Helper.preventProp(event);
      var currentTarget = event.currentTarget; // get block

      while (!currentTarget.classList.contains('block_wrapper')) {
        currentTarget = currentTarget.offsetParent;
      } // get children


      var _currentTarget = currentTarget,
          children = _currentTarget.children;
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
    }
  }]);

  return Header;
}();

module.exports = Header;
var _default = Header;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Nb2R1bGVUeXBlcy9IZWFkZXIudHMiXSwibmFtZXMiOlsiSFRNTEhhbmRsZXIiLCJyZXF1aXJlIiwiSGVscGVyIiwiSGVhZGVyIiwiY29uc29sZSIsImxvZyIsImFyZ3MiLCJldmVudCIsIkdvYXRDdXJyeSIsInByZXZlbnRQcm9wIiwiY3VycmVudFRhcmdldCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwib2Zmc2V0UGFyZW50IiwiY2hpbGRyZW4iLCJpdGVtIiwibGVuZ3RoIiwiaSIsIm5ld0lubmVyIiwic3RyaXBUYWdzIiwiaW5uZXJIVE1MIiwiYmxvY2tpbmRleCIsImRhdGFzZXQiLCJ0YWciLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsIm91dHB1dEpTT04iLCJibG9ja3MiLCJ0eXBlIiwianNvblVwZGF0ZWQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsV0FBVyxHQUFHQyxPQUFPLENBQUUsZ0JBQUYsQ0FBM0I7O0FBQ0EsSUFBTUMsTUFBTSxHQUFHRCxPQUFPLENBQUUsV0FBRixDQUF0Qjs7SUFFTUUsTTs7Ozs7Ozs7OzZCQUN5QjtBQUMzQkMsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQWEsTUFBYjs7QUFEMkIsd0NBQVhDLElBQVc7QUFBWEEsUUFBQUEsSUFBVztBQUFBOztBQUFBLFVBRXBCQyxLQUZvQixHQUVBRCxJQUZBO0FBQUEsVUFFYkUsU0FGYSxHQUVBRixJQUZBO0FBRzNCSixNQUFBQSxNQUFNLENBQUNPLFdBQVAsQ0FBbUJGLEtBQW5CO0FBSDJCLFVBSXJCRyxhQUpxQixHQUlISCxLQUpHLENBSXJCRyxhQUpxQixFQU0zQjs7QUFDQSxhQUFPLENBQUNBLGFBQWEsQ0FBQ0MsU0FBZCxDQUF3QkMsUUFBeEIsQ0FBaUMsZUFBakMsQ0FBUixFQUEyRDtBQUN6REYsUUFBQUEsYUFBYSxHQUFHQSxhQUFhLENBQUNHLFlBQTlCO0FBQ0QsT0FUMEIsQ0FXM0I7OztBQVgyQiwyQkFZTkgsYUFaTTtBQUFBLFVBWW5CSSxRQVptQixrQkFZbkJBLFFBWm1CO0FBYTNCLFVBQUlDLElBQUo7O0FBRUEsVUFBSUQsUUFBUSxDQUFDRSxNQUFiLEVBQXNCO0FBQ3BCLGFBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0gsUUFBUSxDQUFDRSxNQUE3QixFQUFxQ0MsQ0FBQyxFQUF0QyxFQUEyQztBQUN6Q2IsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQWFTLFFBQVEsQ0FBQ0csQ0FBRCxDQUFyQjs7QUFDQSxjQUFJSCxRQUFRLENBQUNHLENBQUQsQ0FBUixDQUFZTixTQUFaLENBQXNCQyxRQUF0QixDQUFnQyxPQUFoQyxDQUFKLEVBQWdEO0FBQzlDRyxZQUFBQSxJQUFJLEdBQUdELFFBQVEsQ0FBQ0csQ0FBRCxDQUFmO0FBQ0Q7QUFDRjtBQUNGOztBQUdELFVBQUksT0FBT0YsSUFBUCxLQUFnQixXQUFoQixJQUErQixDQUFDQSxJQUFwQyxFQUEyQztBQUN6QyxlQUFPLEtBQVA7QUFDRDs7QUFFRCxVQUFNRyxRQUFRLEdBQUdsQixXQUFXLENBQUNtQixTQUFaLENBQXVCSixJQUFJLENBQUNLLFNBQTVCLENBQWpCO0FBN0IyQixVQStCbkJDLFVBL0JtQixHQStCSlgsYUFBYSxDQUFDWSxPQS9CVixDQStCbkJELFVBL0JtQjtBQWlDM0IsVUFBTUUsR0FBRyxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBWjtBQUVBRixNQUFBQSxHQUFHLENBQUNILFNBQUosR0FBZ0JGLFFBQWhCO0FBQ0FILE1BQUFBLElBQUksQ0FBQ0ssU0FBTCxHQUFpQixFQUFqQjtBQUNBTCxNQUFBQSxJQUFJLENBQUNXLFdBQUwsQ0FBaUJILEdBQWpCOztBQUdBLFVBQUlmLFNBQVMsQ0FBQ21CLFVBQVYsQ0FBcUJDLE1BQXJCLENBQTRCUCxVQUE1QixDQUFKLEVBQTZDO0FBQzNDYixRQUFBQSxTQUFTLENBQUNtQixVQUFWLENBQXFCQyxNQUFyQixDQUE0QlAsVUFBNUIsRUFBd0NRLElBQXhDLEdBQStDLFNBQS9DO0FBQ0FyQixRQUFBQSxTQUFTLENBQUNzQixXQUFWO0FBQ0Q7QUFDRjs7Ozs7O0FBSUhDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjdCLE1BQWpCO2VBRWVBLE0iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBIVE1MSGFuZGxlciA9IHJlcXVpcmUoIFwiLi4vSFRNTEhhbmRsZXJcIiApO1xuY29uc3QgSGVscGVyID0gcmVxdWlyZSggXCIuLi9IZWxwZXJcIiApO1xuIFxuY2xhc3MgSGVhZGVyIHtcbiAgc3RhdGljIHJlbmRlciggLi4uYXJnczogYW55KSB7XG4gICAgY29uc29sZS5sb2coICd0ZXN0JyApXG4gICAgY29uc3QgW2V2ZW50LCBHb2F0Q3VycnldID0gYXJncztcbiAgICBIZWxwZXIucHJldmVudFByb3AoZXZlbnQpO1xuICAgIGxldCB7IGN1cnJlbnRUYXJnZXQgfSA9IGV2ZW50O1xuXG4gICAgLy8gZ2V0IGJsb2NrXG4gICAgd2hpbGUgKCFjdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYmxvY2tfd3JhcHBlcicpKSB7XG4gICAgICBjdXJyZW50VGFyZ2V0ID0gY3VycmVudFRhcmdldC5vZmZzZXRQYXJlbnQ7XG4gICAgfVxuXG4gICAgLy8gZ2V0IGNoaWxkcmVuXG4gICAgY29uc3QgeyBjaGlsZHJlbiB9ID0gY3VycmVudFRhcmdldDtcbiAgICBsZXQgaXRlbTogYW55O1xuXG4gICAgaWYoIGNoaWxkcmVuLmxlbmd0aCApIHtcbiAgICAgIGZvciggbGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCBjaGlsZHJlbltpXSApXG4gICAgICAgIGlmKCBjaGlsZHJlbltpXS5jbGFzc0xpc3QuY29udGFpbnMoICdibG9jaycgKSApIHtcbiAgICAgICAgICBpdGVtID0gY2hpbGRyZW5baV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cblxuICAgIGlmKCB0eXBlb2YgaXRlbSA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhaXRlbSApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBuZXdJbm5lciA9IEhUTUxIYW5kbGVyLnN0cmlwVGFncyggaXRlbS5pbm5lckhUTUwgKTtcblxuICAgIGNvbnN0IHsgYmxvY2tpbmRleCB9ID0gY3VycmVudFRhcmdldC5kYXRhc2V0O1xuXG4gICAgY29uc3QgdGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcblxuICAgIHRhZy5pbm5lckhUTUwgPSBuZXdJbm5lcjtcbiAgICBpdGVtLmlubmVySFRNTCA9ICcnO1xuICAgIGl0ZW0uYXBwZW5kQ2hpbGQodGFnKTtcblxuXG4gICAgaWYgKEdvYXRDdXJyeS5vdXRwdXRKU09OLmJsb2Nrc1tibG9ja2luZGV4XSkge1xuICAgICAgR29hdEN1cnJ5Lm91dHB1dEpTT04uYmxvY2tzW2Jsb2NraW5kZXhdLnR5cGUgPSAnaGVhZGluZyc7XG4gICAgICBHb2F0Q3VycnkuanNvblVwZGF0ZWQoKTtcbiAgICB9XG4gIH1cbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlcjtcblxuZXhwb3J0IGRlZmF1bHQgSGVhZGVyO1xuIl19