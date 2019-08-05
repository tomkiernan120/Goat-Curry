var Helper = require('../Helper' );
var HTML = require('../HTML' );

class Header {
  static render(...args) {
    console.log(args);
    const [event, GoatCurry] = args;
    Helper.preventProp(event);
    let { currentTarget } = event;

    // get block
    while (!currentTarget.classList.contains('block_wrapper')) {
      currentTarget = currentTarget.offsetParent;
    }

    // get children
    const { children } = currentTarget;
    let item;

    [...children].forEach((e) => {
      if (e.classList.contains('block')) {
        item = e;
      }
    });

    const newInner = HTML.stripTags(item.innerHTML);

    const { blockindex } = currentTarget.dataset;

    const tag = document.createElement('h1');

    tag.innerHTML = newInner;
    item.innerHTML = '';
    item.appendChild(tag);


    if (GoatCurry.outputJSON.blocks[blockindex]) {
      GoatCurry.outputJSON.blocks[blockindex].type = 'heading';
      GoatCurry.jsonUpdated();
    }
  }
}


module.exports = Header;
