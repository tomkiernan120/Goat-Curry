/* eslint linebreak-style: ["error", "windows"] */
import Helper from './Helper';

import {
  Header, Paragraph, Image, List, Link, Quote,
} from './ModuleTypes';

export default class Modules {
  constructor(GoatCurry = {}) {
    this.options = GoatCurry.options;

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
        icon: '<img width="60%" height="auto" style="width:60%;height:auto;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADgSURBVEhL7dQxDgFBGIbhLUgoFBJOISollULlHhqHcAAanWNI6Aml6JQaDVEolER4/1kS+bMj2c2sSMyXPMVMsW+yxQR+v7gsijEUkHgl9LHFPYEeYq+GPaI++O6K09P5eXfBER3EWhkH6EiUBV5rQO4m5pRg8nt1wMZpeAcdsHEWzkF//BNn4Qxu0AEbp796DR2wcRruQgdsnIbllVpCR6I4Dcvk2ZtChzTn4ddaGGGO1ZsNUg3bVoUP+3Aq82HZV8IVSGRmTuHqkLuxOaU0ec8HaJtTuDyGaJqT3x8vCB639MIVvmusGQAAAABJRU5ErkJggg==">',
        tag: 'p',
        method: Paragraph.render,
      },
      Image: {
        icon: '<img width="60%" height="auto" style="width:60%;height:auto;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEoSURBVEhL7dYxS0JRGMbxG4m2JOQoTg19i7a2BvegLVqabXFsCpr6CEEFBX4NB5cQZ8GhwEGqrSGy/1tdOp3z3jjqe2jIB36g5773PnLOHcz+fVaw4VlH0uzhEVPFHTaRJBNopbkuavB3JEYVhdHKLPXRQBBt2NoZgmiD1i4RRBuc1RNevTVXkuIDSOqQ89RmzIsHcLMPbc68+AFl5DmGNpdkq2+xDdlyOWttZubiezx7a/OILn5BE5ISTuDPDBH7o6KLR/DTQn69IwukgnO492oWKpa45W1Z+Mop3Pt9CxdLpPwNVx/fvvNbuUmxZAtrnx9/pGjbzYqLsgvtedHFY+zMQc5de150sbU/K75AkB60YUuHCCJ/S+RtvEngGkdYxTLLpEyWvQOOk7YgRVwR3wAAAABJRU5ErkJggg==">',
        tag: 'img',
        method: Image.render,
      },
      List: {
        icon: '<img width="60%" height="auto" style="width:60%;height:auto;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB0SURBVEhL7ZLRCYAwDETjEM7hPuqmLuFGmhMPDvMTpFKQPHjQNjQHaa14w+hu7nTtGoPmu3u4CGkKmlKEIIxoLWuAhWdzoBez/pj6RTTAQv2ifgzucot1c1aXD4QQRR8va0ADZhwIejFrAGNBY/jJiIoemJ3BGGlQG0dvZwAAAABJRU5ErkJggg==">',
        tag: 'ul',
        method: List.render,
      },
      Link: {
        icon: '<img width="63%" height="auto" style="width:63%;height:auto;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAC6SURBVDhPxZJBDgFBEEXrAlhxEkIkiBsY4jxizVk4BzYSwR3Gyg28361lIpl0rXjJS6pmUtU11WO/oocnfOIeO+hmhCXOsYEbVBMXA1TxNGQRNdEkLm64iOEHTXKIYZ41jvEeMrMJPlA7caFiFegTNIliNamlj2dMJ6fiFeq53teiAi1s+Y5TsYsuVrd9wXSyiyNqu1VmeI1hHt1rM4aBtO1hyBzscIstLDC77W/aqCaaRD+J+57/jdkLos8kYzw3XRYAAAAASUVORK5CYII=">',
        tag: 'a',
        method: Link.render,
      },
      Quote: {
        icon: '<img width="60%" height="auto" style="width:60%;height:auto;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADySURBVEhL7dQ9agJRFIbhaQ0uREzhEqxE0SJuIEVclY2pspIU6S0UwcofAjZpVGwSkvcTDlzGc/TWZl54Cs+c6wwqFlX/rwG2+C3RrA9riB3Ke5o9IWyD8iGzhvUJb0f0MGHegZTlXUuFecspy7uWCvOWU5Z3LRXmLacs71oq7NqX/ANrBW9HvhGmn2J0kw9YHSzh7b0ju2fo0BGPGgSNoL0DGhrkpMU9dFBvENWEHkB7eqCsaphCh940CHrADNp71SC3MXRogboGQRNobw7dLKsudOiElgZB+t/S3q3v56I2vvByfhXXg/ayP/equ6wo/gCI0ZVdTriXOgAAAABJRU5ErkJggg==">',
        tag: 'blockquote',
        method: Quote.render,
      },
    };

    this.goatcurry = GoatCurry;
  }

  addModuleType(options = {}) {
    if (typeof options !== 'object') {
      throw new Error(`Please make sure options for addModuleType is a Obect not ${typeof options}`);
    }

    let AlreadyExists = false;

    this.moduleTypes.forEach((e) => {
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
  }

  handleMoveClick(event, elem, GoatCurry) {
    if (!elem.classList.contains('active')) {
      elem.classList.add('active');

      const popUp = document.createElement('div');

      popUp.style.cssText = 'width:170px;height:50px; border:0; position: absolute; background: white;box-shadow: rgba(0, 0, 0, 0.2) 4px 5px 24px 2px; top: -60px;right:-100px;display:grid;grid-template-columns: repeat( 3, 1fr );';

      const moveUpButton = document.createElement('button');
      moveUpButton.innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACBSURBVEhL7Y1LCoAwDETr0sOKih7EO3kuP5kSMYRK1aa7PBiaQDovOJY0lImD2RQULpSDg9lMostNJbJ851fORRJd3vOMYC6SpMrBJQBFkpmiy4EUACnBn9eMlI3Sxe1GCwBucDvE7QMtv5KUAKRuf/EkMMMFWVyQpbpg5ThWhHACOylBKM8nzs0AAAAASUVORK5CYII=">';
      moveUpButton.style.cssText = 'background:transparent;cursor:pointer;border:0;';

      const removeButton = document.createElement('button');
      removeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24" style=" fill:inherit;"><path style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;block-progression:tb;isolation:auto;mix-blend-mode:normal" d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z" font-weight="400" font-family="sans-serif" white-space="normal" overflow="visible"></path></svg>';
      removeButton.style.cssText = 'background:transparent; cursor:pointer; border: 0;';

      removeButton.addEventListener('click', this.removeButton.bind(this));

      moveUpButton.addEventListener('click', (e) => {
        Helper.preventProp(e);

        const wrapper = this.parentElement.parentElement;
        const blockIndex = wrapper.dataset.blockindex;
        if (blockIndex <= 0) {
          return false;
        }
        const parent = wrapper.parentElement;
        wrapper.remove();

        parent.insertBefore(wrapper, parent.children[blockIndex - 1]);
        Helper.moveArray(GoatCurry.outputJSON.blocks, blockIndex, blockIndex - 1);
        GoatCurry.jsonUpdated();
        GoatCurry.modules.recalculateBlockIndex();
        return true;
      });

      popUp.appendChild(moveUpButton);
      popUp.appendChild(removeButton);

      const moveDownButton = document.createElement('button');
      moveDownButton.innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACNSURBVEhL7ZJJCoAwDEXrUu8q4nAQD6XHcsjXBEOptGK664NPB9P/NrqCNStlubd5ODjZKIIoRRDFVNDwqnkT1Lwm01M2SnudHkICzGAWb5KZKCjaKR0uGF+Ab5jB3YiLVCrKTPElWqDLMYs3nwhJRPC7XPAlIjApF7REx6Rc8CWm5QIK8acMvC9Y4NwJy9tBKxU50YEAAAAASUVORK5CYII=">';

      moveDownButton.style.cssText = 'background: transparent; cursor:pointer; border: 0;';

      moveDownButton.addEventListener('click', (e) => {
        Helper.preventProp(e);

        const wrapper = this.parentElement.parentElement;
        const blockIndex = wrapper.dataset.blockindex;

        if (blockIndex < 0) {
          return false;
        }

        const parent = wrapper.parentElement;
        wrapper.remove();

        parent.insertBefore(wrapper, parent.children[blockIndex + 1]);
        Helper.moveArray(GoatCurry.outputJSON.blocks, blockIndex, blockIndex + 1);
        GoatCurry.jsonUpdated();
        GoatCurry.modules.recalculateBlockIndex();
        return true;
      });

      popUp.appendChild(moveDownButton);

      elem.parentNode.insertBefore(popUp, elem);
    }
  }

  handleOptionClick(event, elem) {
    const popup = document.createElement('div');
    popup.classList.add('option');
    const { length } = Object.keys(this.moduleTypes);
    popup.style.cssText = `background:#fff;width:250px;height:50px;position:absolute;top:0;left:0;z-index:99999999999;box-shadow: rgba(0, 0, 0, 0.2) 4px 5px 24px 2px;display:grid;grid-template-columns: repeat( ${length}, 1fr );`;
    elem.parentNode.insertBefore(popup, elem);

    const entries = Object.entries(this.moduleTypes);

    entries.forEach((e) => {
      const [, property] = e;
      const button = document.createElement('button');
      // console.log(property);
      const { icon } = property;
      if (Helper.isArray(icon)) {
        const [first] = icon;
        button.innerHTML = first;
      } else {
        button.innerHTML = icon;
      }

      button.style.cssText = 'background:transparent;border:0;cursor:pointer;';

      const { method } = property;

      button.addEventListener('click', ev => method(ev, this.goatcurry));

      popup.append(button);
    });

    return this;
  }

  removeButton(e) {
    Helper.preventProp(e);
    const elem = e.currentTarget;
    if (!elem.classList.contains('clicked')) {
      elem.classList.add('clicked');
      elem.style.fill = 'red';
    } else {
      const { blockindex } = elem.parentElement.parentElement.dataset;
      this.goatcurry.outputJSON.blocks.splice(blockindex, 1);
      elem.parentElement.parentElement.remove();
      elem.remove();
      this.goatcurry.jsonUpdated();
    }
  }

  handleBlur(event) {
    const newElem = event.currentTarget;
    const { blockindex } = newElem.dataset;
    const { type } = this.goatcurry.outputJSON.blocks[blockindex];
    const typeCapitalized = type.charAt(0).toUpperCase() + type.slice(1);

    const { tag } = this.moduleTypes[typeCapitalized];

    if (tag) {
      const htmlTag = document.createElement(tag);
      htmlTag.innerHTML = newElem.innerHTML;
      newElem.innerHTML = '';
      newElem.appendChild(htmlTag);
    }
  }

  static recalculateBlockIndex() {
    const wrappers = document.querySelectorAll('.block_wrapper');
    wrappers.forEach((e, i) => {
      e.dataset.blockindex = i;
    });
  }
}
