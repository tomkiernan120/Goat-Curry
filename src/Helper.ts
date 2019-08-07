/* eslint linebreak-style: ["error", "windows"] */
class Helper {
  static preventProp(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  static isString(input) {
    return typeof input === 'string';
  }

  static isPlainObject(val) {
    return !!val && typeof val === 'object';
  }

  static isBrowser() {
    return ![typeof window, typeof document].includes('undefined');
  }

  static isValidJSON(str) {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }

  static isArray(val) {
    return Array.isArray(val);
  }

  static getClickPosition(event) {
    const currentEvent = event || window.event;

    let { pageX } = currentEvent;
    let { pageY } = currentEvent;

    if (pageX === undefined) {
      pageX = currentEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      pageY = currentEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return { x: pageX, y: pageY };
  }

  static moveArray(arr, oldIndex, newIndex) {
    if (newIndex >= arr.length) {
      let k = newIndex - arr.length + 1;
      while (k) {
        k -= 1;
        arr.push(undefined);
      }
    }
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    return arr;
  }

  static parentContainsClass(element, className) {
    let isContained = false;
    let newElement = element;

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

  static getPosition(element) {
    let xPosition = 0;
    let yPosition = 0;

    let newElement = element;

    while (newElement) {
      xPosition += (newElement.offsetLeft - newElement.scrollLeft + newElement.clientLeft);
      yPosition += (newElement.offsetTop - newElement.scrollTop + newElement.clientTop);
      newElement = newElement.offsetParent;
    }

    return { x: xPosition, y: yPosition };
  }
}

module.exports = Helper;
export default Helper;