export default class Modules {
  constructor( options = {} ) {
    this.options = options;

    this.moduleTypes = [
      {
        name: "Heading",
        levels: [ 1, 2, 3, 4, 5 ]
      },
      {
        name: "Paragraph",
      },
      {
        name: "Image"
      },
      {
        name: "List"
      },
      {
        name: "Link"
      },
      {
        name: "Quote"
      }
    ]
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

}