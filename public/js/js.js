document.addEventListener( "DOMContentLoaded", function() {

  var GC = new GoatCurry({
    selector: ".editor",
    update: function() {
      var input = document.querySelector('pre');
      input.innerHTML = this.prettyOutput;
    }
  });

});