document.addEventListener( "DOMContentLoaded", function() {

  var GC = new GoatCurry({
    selector: ".editor",
  });

  GC.update = function() {
    var input  = document.querySelector( 'code.language-json' );
    // console.log( outputJSON )
    input.innerHTML = JSON.stringify( GC.outputJSON );
  }

});