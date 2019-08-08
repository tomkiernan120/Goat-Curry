"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint linebreak-style: ["error", "windows"] */
var Helper =
/*#__PURE__*/
function () {
  function Helper() {
    _classCallCheck(this, Helper);
  }

  _createClass(Helper, null, [{
    key: "preventProp",
    value: function preventProp(event) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, {
    key: "isString",
    value: function isString(input) {
      return typeof input === 'string';
    }
  }, {
    key: "isPlainObject",
    value: function isPlainObject(val) {
      return !!val && _typeof(val) === 'object';
    }
  }, {
    key: "isBrowser",
    value: function isBrowser() {
      var array = [typeof window === "undefined" ? "undefined" : _typeof(window), typeof document === "undefined" ? "undefined" : _typeof(document)];
      return array.indexOf('undefined') <= -1;
    }
  }, {
    key: "isValidJSON",
    value: function isValidJSON(str) {
      try {
        JSON.parse(str);
        return true;
      } catch (e) {
        return false;
      }
    }
  }, {
    key: "isArray",
    value: function isArray(val) {
      return Array.isArray(val);
    }
  }, {
    key: "getClickPosition",
    value: function getClickPosition(event) {
      var currentEvent = event || window.event;
      var pageX = currentEvent.pageX;
      var pageY = currentEvent.pageY;

      if (pageX === undefined) {
        pageX = currentEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        pageY = currentEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }

      return {
        x: pageX,
        y: pageY
      };
    }
  }, {
    key: "moveArray",
    value: function moveArray(arr, oldIndex, newIndex) {
      if (newIndex >= arr.length) {
        var k = newIndex - arr.length + 1;

        while (k) {
          k -= 1;
          arr.push(undefined);
        }
      }

      arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
      return arr;
    }
  }, {
    key: "parentContainsClass",
    value: function parentContainsClass(element, className) {
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
    }
  }, {
    key: "getPosition",
    value: function getPosition(element) {
      var xPosition = 0;
      var yPosition = 0;
      var newElement = element;

      while (newElement) {
        xPosition += newElement.offsetLeft - newElement.scrollLeft + newElement.clientLeft;
        yPosition += newElement.offsetTop - newElement.scrollTop + newElement.clientTop;
        newElement = newElement.offsetParent;
      }

      return {
        x: xPosition,
        y: yPosition
      };
    }
  }]);

  return Helper;
}();

module.exports = Helper;
var _default = Helper;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9IZWxwZXIudHMiXSwibmFtZXMiOlsiSGVscGVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsImlucHV0IiwidmFsIiwiYXJyYXkiLCJ3aW5kb3ciLCJkb2N1bWVudCIsImluZGV4T2YiLCJzdHIiLCJKU09OIiwicGFyc2UiLCJlIiwiQXJyYXkiLCJpc0FycmF5IiwiY3VycmVudEV2ZW50IiwicGFnZVgiLCJwYWdlWSIsInVuZGVmaW5lZCIsImNsaWVudFgiLCJib2R5Iiwic2Nyb2xsTGVmdCIsImRvY3VtZW50RWxlbWVudCIsImNsaWVudFkiLCJzY3JvbGxUb3AiLCJ4IiwieSIsImFyciIsIm9sZEluZGV4IiwibmV3SW5kZXgiLCJsZW5ndGgiLCJrIiwicHVzaCIsInNwbGljZSIsImVsZW1lbnQiLCJjbGFzc05hbWUiLCJpc0NvbnRhaW5lZCIsIm5ld0VsZW1lbnQiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsIm9mZnNldFBhcmVudCIsInhQb3NpdGlvbiIsInlQb3NpdGlvbiIsIm9mZnNldExlZnQiLCJjbGllbnRMZWZ0Iiwib2Zmc2V0VG9wIiwiY2xpZW50VG9wIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFDTUEsTTs7Ozs7Ozs7O2dDQUNnQkMsSyxFQUFlO0FBQ2pDQSxNQUFBQSxLQUFLLENBQUNDLGNBQU47QUFDQUQsTUFBQUEsS0FBSyxDQUFDRSx3QkFBTjtBQUNEOzs7NkJBRWdCQyxLLEVBQXlCO0FBQ3hDLGFBQU8sT0FBT0EsS0FBUCxLQUFpQixRQUF4QjtBQUNEOzs7a0NBRXFCQyxHLEVBQW9CO0FBQ3hDLGFBQU8sQ0FBQyxDQUFDQSxHQUFGLElBQVMsUUFBT0EsR0FBUCxNQUFlLFFBQS9CO0FBQ0Q7OztnQ0FFMkI7QUFDMUIsVUFBTUMsS0FBSyxHQUFHLFFBQVFDLE1BQVIseUNBQVFBLE1BQVIsVUFBdUJDLFFBQXZCLHlDQUF1QkEsUUFBdkIsRUFBZDtBQUNBLGFBQU9GLEtBQUssQ0FBQ0csT0FBTixDQUFjLFdBQWQsS0FBOEIsQ0FBQyxDQUF0QztBQUNEOzs7Z0NBRW1CQyxHLEVBQWM7QUFDaEMsVUFBSTtBQUNGQyxRQUFBQSxJQUFJLENBQUNDLEtBQUwsQ0FBV0YsR0FBWDtBQUNBLGVBQU8sSUFBUDtBQUNELE9BSEQsQ0FHRSxPQUFPRyxDQUFQLEVBQVU7QUFDVixlQUFPLEtBQVA7QUFDRDtBQUNGOzs7NEJBRWVSLEcsRUFBb0I7QUFDbEMsYUFBT1MsS0FBSyxDQUFDQyxPQUFOLENBQWNWLEdBQWQsQ0FBUDtBQUNEOzs7cUNBRXdCSixLLEVBQWE7QUFDcEMsVUFBTWUsWUFBWSxHQUFHZixLQUFLLElBQUlNLE1BQU0sQ0FBQ04sS0FBckM7QUFEb0MsVUFHOUJnQixLQUg4QixHQUdwQkQsWUFIb0IsQ0FHOUJDLEtBSDhCO0FBQUEsVUFJOUJDLEtBSjhCLEdBSXBCRixZQUpvQixDQUk5QkUsS0FKOEI7O0FBTXBDLFVBQUlELEtBQUssS0FBS0UsU0FBZCxFQUF5QjtBQUN2QkYsUUFBQUEsS0FBSyxHQUFHRCxZQUFZLENBQUNJLE9BQWIsR0FBdUJaLFFBQVEsQ0FBQ2EsSUFBVCxDQUFjQyxVQUFyQyxHQUFrRGQsUUFBUSxDQUFDZSxlQUFULENBQXlCRCxVQUFuRjtBQUNBSixRQUFBQSxLQUFLLEdBQUdGLFlBQVksQ0FBQ1EsT0FBYixHQUF1QmhCLFFBQVEsQ0FBQ2EsSUFBVCxDQUFjSSxTQUFyQyxHQUFpRGpCLFFBQVEsQ0FBQ2UsZUFBVCxDQUF5QkUsU0FBbEY7QUFDRDs7QUFFRCxhQUFPO0FBQUVDLFFBQUFBLENBQUMsRUFBRVQsS0FBTDtBQUFZVSxRQUFBQSxDQUFDLEVBQUVUO0FBQWYsT0FBUDtBQUNEOzs7OEJBRWlCVSxHLEVBQVVDLFEsRUFBa0JDLFEsRUFBa0I7QUFDOUQsVUFBSUEsUUFBUSxJQUFJRixHQUFHLENBQUNHLE1BQXBCLEVBQTRCO0FBQzFCLFlBQUlDLENBQUMsR0FBR0YsUUFBUSxHQUFHRixHQUFHLENBQUNHLE1BQWYsR0FBd0IsQ0FBaEM7O0FBQ0EsZUFBT0MsQ0FBUCxFQUFVO0FBQ1JBLFVBQUFBLENBQUMsSUFBSSxDQUFMO0FBQ0FKLFVBQUFBLEdBQUcsQ0FBQ0ssSUFBSixDQUFTZCxTQUFUO0FBQ0Q7QUFDRjs7QUFDRFMsTUFBQUEsR0FBRyxDQUFDTSxNQUFKLENBQVdKLFFBQVgsRUFBcUIsQ0FBckIsRUFBd0JGLEdBQUcsQ0FBQ00sTUFBSixDQUFXTCxRQUFYLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLENBQXhCO0FBQ0EsYUFBT0QsR0FBUDtBQUNEOzs7d0NBRTJCTyxPLEVBQWNDLFMsRUFBbUI7QUFDM0QsVUFBSUMsV0FBVyxHQUFHLEtBQWxCO0FBQ0EsVUFBSUMsVUFBVSxHQUFHSCxPQUFqQjs7QUFFQSxVQUFJRyxVQUFVLENBQUNDLFNBQVgsQ0FBcUJDLFFBQXJCLENBQThCSixTQUE5QixDQUFKLEVBQThDO0FBQzVDQyxRQUFBQSxXQUFXLEdBQUcsSUFBZDtBQUNEOztBQUVELGFBQU9DLFVBQVUsSUFBSSxDQUFDRCxXQUF0QixFQUFtQztBQUNqQ0MsUUFBQUEsVUFBVSxHQUFHQSxVQUFVLENBQUNHLFlBQXhCOztBQUNBLFlBQUlILFVBQVUsSUFBSUEsVUFBVSxDQUFDQyxTQUFYLENBQXFCQyxRQUFyQixDQUE4QkosU0FBOUIsQ0FBbEIsRUFBNEQ7QUFDMURDLFVBQUFBLFdBQVcsR0FBRyxJQUFkO0FBQ0Q7QUFDRjs7QUFFRCxhQUFPQSxXQUFQO0FBQ0Q7OztnQ0FFbUJGLE8sRUFBZTtBQUNqQyxVQUFJTyxTQUFTLEdBQUcsQ0FBaEI7QUFDQSxVQUFJQyxTQUFTLEdBQUcsQ0FBaEI7QUFFQSxVQUFJTCxVQUFVLEdBQUdILE9BQWpCOztBQUVBLGFBQU9HLFVBQVAsRUFBbUI7QUFDakJJLFFBQUFBLFNBQVMsSUFBS0osVUFBVSxDQUFDTSxVQUFYLEdBQXdCTixVQUFVLENBQUNoQixVQUFuQyxHQUFnRGdCLFVBQVUsQ0FBQ08sVUFBekU7QUFDQUYsUUFBQUEsU0FBUyxJQUFLTCxVQUFVLENBQUNRLFNBQVgsR0FBdUJSLFVBQVUsQ0FBQ2IsU0FBbEMsR0FBOENhLFVBQVUsQ0FBQ1MsU0FBdkU7QUFDQVQsUUFBQUEsVUFBVSxHQUFHQSxVQUFVLENBQUNHLFlBQXhCO0FBQ0Q7O0FBRUQsYUFBTztBQUFFZixRQUFBQSxDQUFDLEVBQUVnQixTQUFMO0FBQWdCZixRQUFBQSxDQUFDLEVBQUVnQjtBQUFuQixPQUFQO0FBQ0Q7Ozs7OztBQUdISyxNQUFNLENBQUNDLE9BQVAsR0FBaUJqRCxNQUFqQjtlQUNlQSxNIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50IGxpbmVicmVhay1zdHlsZTogW1wiZXJyb3JcIiwgXCJ3aW5kb3dzXCJdICovXHJcbmNsYXNzIEhlbHBlciB7XHJcbiAgc3RhdGljIHByZXZlbnRQcm9wKCBldmVudDogRXZlbnQgKSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaXNTdHJpbmcoIGlucHV0OiBzdHJpbmcgKSA6Ym9vbGVhbiB7XHJcbiAgICByZXR1cm4gdHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJztcclxuICB9XHJcblxyXG4gIHN0YXRpYyBpc1BsYWluT2JqZWN0KCB2YWw6IGFueSApIDpib29sZWFuIHtcclxuICAgIHJldHVybiAhIXZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JztcclxuICB9XHJcblxyXG4gIHN0YXRpYyBpc0Jyb3dzZXIoKSA6Ym9vbGVhbiB7XHJcbiAgICBjb25zdCBhcnJheSA9IFt0eXBlb2Ygd2luZG93LCB0eXBlb2YgZG9jdW1lbnQgXVxyXG4gICAgcmV0dXJuIGFycmF5LmluZGV4T2YoJ3VuZGVmaW5lZCcpIDw9IC0xO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGlzVmFsaWRKU09OKCBzdHI6IHN0cmluZyApIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIEpTT04ucGFyc2Uoc3RyKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBpc0FycmF5KCB2YWw6IGFueSApOiBib29sZWFuIHtcclxuICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0Q2xpY2tQb3NpdGlvbiggZXZlbnQ6IGFueSApIHtcclxuICAgIGNvbnN0IGN1cnJlbnRFdmVudCA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcclxuXHJcbiAgICBsZXQgeyBwYWdlWCB9ID0gY3VycmVudEV2ZW50O1xyXG4gICAgbGV0IHsgcGFnZVkgfSA9IGN1cnJlbnRFdmVudDtcclxuXHJcbiAgICBpZiAocGFnZVggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBwYWdlWCA9IGN1cnJlbnRFdmVudC5jbGllbnRYICsgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0ICsgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQ7XHJcbiAgICAgIHBhZ2VZID0gY3VycmVudEV2ZW50LmNsaWVudFkgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCArIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHsgeDogcGFnZVgsIHk6IHBhZ2VZIH07XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgbW92ZUFycmF5KCBhcnI6IGFueSwgb2xkSW5kZXg6IG51bWJlciwgbmV3SW5kZXg6IG51bWJlcikge1xyXG4gICAgaWYgKG5ld0luZGV4ID49IGFyci5sZW5ndGgpIHtcclxuICAgICAgbGV0IGsgPSBuZXdJbmRleCAtIGFyci5sZW5ndGggKyAxO1xyXG4gICAgICB3aGlsZSAoaykge1xyXG4gICAgICAgIGsgLT0gMTtcclxuICAgICAgICBhcnIucHVzaCh1bmRlZmluZWQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBhcnIuc3BsaWNlKG5ld0luZGV4LCAwLCBhcnIuc3BsaWNlKG9sZEluZGV4LCAxKVswXSk7XHJcbiAgICByZXR1cm4gYXJyO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHBhcmVudENvbnRhaW5zQ2xhc3MoIGVsZW1lbnQ6IGFueSwgY2xhc3NOYW1lOiBzdHJpbmcpIHtcclxuICAgIGxldCBpc0NvbnRhaW5lZCA9IGZhbHNlO1xyXG4gICAgbGV0IG5ld0VsZW1lbnQgPSBlbGVtZW50O1xyXG5cclxuICAgIGlmIChuZXdFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7XHJcbiAgICAgIGlzQ29udGFpbmVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB3aGlsZSAobmV3RWxlbWVudCAmJiAhaXNDb250YWluZWQpIHtcclxuICAgICAgbmV3RWxlbWVudCA9IG5ld0VsZW1lbnQub2Zmc2V0UGFyZW50O1xyXG4gICAgICBpZiAobmV3RWxlbWVudCAmJiBuZXdFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7XHJcbiAgICAgICAgaXNDb250YWluZWQgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGlzQ29udGFpbmVkO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldFBvc2l0aW9uKCBlbGVtZW50OiBhbnkgKSB7XHJcbiAgICBsZXQgeFBvc2l0aW9uID0gMDtcclxuICAgIGxldCB5UG9zaXRpb24gPSAwO1xyXG5cclxuICAgIGxldCBuZXdFbGVtZW50ID0gZWxlbWVudDtcclxuXHJcbiAgICB3aGlsZSAobmV3RWxlbWVudCkge1xyXG4gICAgICB4UG9zaXRpb24gKz0gKG5ld0VsZW1lbnQub2Zmc2V0TGVmdCAtIG5ld0VsZW1lbnQuc2Nyb2xsTGVmdCArIG5ld0VsZW1lbnQuY2xpZW50TGVmdCk7XHJcbiAgICAgIHlQb3NpdGlvbiArPSAobmV3RWxlbWVudC5vZmZzZXRUb3AgLSBuZXdFbGVtZW50LnNjcm9sbFRvcCArIG5ld0VsZW1lbnQuY2xpZW50VG9wKTtcclxuICAgICAgbmV3RWxlbWVudCA9IG5ld0VsZW1lbnQub2Zmc2V0UGFyZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7IHg6IHhQb3NpdGlvbiwgeTogeVBvc2l0aW9uIH07XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEhlbHBlcjtcclxuZXhwb3J0IGRlZmF1bHQgSGVscGVyOyJdfQ==