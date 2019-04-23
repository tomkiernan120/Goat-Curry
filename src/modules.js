import Helper from './Helper';

export default class Modules {
  constructor( options = {} ) {
    this.options = options;

    this.moduleTypes = {
      "Heading": {
        levels: [ 1, 2, 3, 4, 5 ]
      },
      "Paragraph": {
        tag: "p"
      },
      "Image": {
        tag: "img"
      },
      "List": {
        tag: "ul"
      },
      "Link": {
        tag: "a"
      },
      "Quote": {

      }
    };
  }

  addModuleType( options = {} ) {
    if( typeof options !== "object" ) {
      throw new Error( `Please make sure options for addModuleType is a Obect not ${typeof options}` );
    }

    var AlreadyExists  = false;

    this.moduleTypes.map( ( e, i ) => {
      if( e.name == options.name ) {
        AlreadyExists = true;
      }
    });

    if( !options.name ) {
      throw new Error( `Please specify a module name` );
    }

    if( AlreadyExists ) {
      if( window.console ){
        console.error( `The module named:${options.name}, already exists.` );
      }
      return;
    }
    else {
      this.moduleTypes.push( options );
    }

  }

  handleMoveClick( event, elem, GoatCurry ) {
    if( !elem.classList.contains( "active" ) ) {

      elem.classList.add( "active" );

      var popUp = document.createElement( "div" );

      popUp.style.cssText = "width:170px;height:50px; border:0; position: absolute; background: white;box-shadow: rgba(0, 0, 0, 0.2) 4px 5px 24px 2px; top: -60px;right:-100px;display:grid;grid-template-columns: repeat( 3, 1fr );";

      var moveUpButton = document.createElement( "button" );
      moveUpButton.innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACBSURBVEhL7Y1LCoAwDETr0sOKih7EO3kuP5kSMYRK1aa7PBiaQDovOJY0lImD2RQULpSDg9lMostNJbJ851fORRJd3vOMYC6SpMrBJQBFkpmiy4EUACnBn9eMlI3Sxe1GCwBucDvE7QMtv5KUAKRuf/EkMMMFWVyQpbpg5ThWhHACOylBKM8nzs0AAAAASUVORK5CYII=">';
      moveUpButton.style.cssText = "background:transparent;cursor:pointer;border:0;";

      var removeButton = document.createElement( "button" );
      removeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24" style=" fill:inherit;"><path style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;block-progression:tb;isolation:auto;mix-blend-mode:normal" d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z" font-weight="400" font-family="sans-serif" white-space="normal" overflow="visible"></path></svg>';
      removeButton.style.cssText = "background:transparent; cursor:pointer; border: 0;";

      removeButton.addEventListener( "click", function(e) {
        Helper.preventProp(e);
        if( !this.classList.contains( "clicked" ) ) {
          this.classList.add( "clicked" );
          this.style.fill = "red";
        }
        else {
          var blockIndex = this.parentElement.parentElement.dataset.blockIndex;
          GoatCurry.outputJSON.blocks.splice( blockIndex, 1);
          this.parentElement.parentElement.remove();
          this.remove();
          GoatCurry.jsonUpdated();
        }
      });

      moveUpButton.addEventListener( "click", function(e) {
        Helper.preventProp(e);

        var wrapper = this.parentElement.parentElement;
        var blockIndex = wrapper.dataset.blockindex;
        if( blockIndex <= 0 ){ 
          return false;
        }
        var parent = wrapper.parentElement;
        wrapper.remove();

        parent.insertBefore( wrapper, parent.children[ blockIndex - 1 ] );
        Helper.moveArray( GoatCurry.outputJSON.blocks, blockIndex, blockIndex - 1 );
        GoatCurry.jsonUpdated();
        GoatCurry.modules.recalculateBlockIndex();
      });

      popUp.appendChild( moveUpButton );
      popUp.appendChild( removeButton );

      var moveDownButton = document.createElement( "button" );
      moveDownButton.innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACNSURBVEhL7ZJJCoAwDEXrUu8q4nAQD6XHcsjXBEOptGK664NPB9P/NrqCNStlubd5ODjZKIIoRRDFVNDwqnkT1Lwm01M2SnudHkICzGAWb5KZKCjaKR0uGF+Ab5jB3YiLVCrKTPElWqDLMYs3nwhJRPC7XPAlIjApF7REx6Rc8CWm5QIK8acMvC9Y4NwJy9tBKxU50YEAAAAASUVORK5CYII=">';

      moveUpButton.style.cssText = "background: transparent; cursor:pointer; border: 0;";

      moveDownButton.addEventListener( "click", function(e) {
        Helper.preventProp(e);

        var wrapper = this.parentElement.parentElement;
        var blockIndex = wrapper.dataset.blockindex;
        
        if( blockIndex < 0 ){ 
          return false;
        }

        var parent = wrapper.parentElement;
        wrapper.remove();

        parent.insertBefore( wrapper, parent.children[ blockIndex + 1 ] );
        Helper.moveArray( GoatCurry.outputJSON.blocks, blockIndex, blockIndex + 1 );
        GoatCurry.jsonUpdated();
        GoatCurry.modules.recalculateBlockIndex();
      });

      popUp.appendChild( moveDownButton );

      elem.parentNode.insertBefore( popUp, elem );
    }
  }

  handleBlur( event, elem, GoatCurry ) {
    var blockIndex = elem.dataset.blockindex;
    var type = GoatCurry.outputJSON.blocks[blockIndex].type;
    var typeCapitalized = type.charAt( 0 ).toUpperCase() + type.slice(1);

    var tag = this.moduleTypes[ typeCapitalized ].tag;

    if( tag ) {
      var htmlTag = document.createElement( tag );
      htmlTag.innerHTML = elem.innerHTML;
      elem.innerHTML = "";
      elem.appendChild( htmlTag );
    }

  }

  recalculateBlockIndex() {
    var wrappers = document.querySelectorAll( '.block_wrapper' );
    wrappers.forEach( ( e,  i ) =>  {
      e.dataset.blockindex = i;
    });
  }

}