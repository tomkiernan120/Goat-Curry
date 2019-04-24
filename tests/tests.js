var GoatCurry = new GoatCurry( { selector: '#test' } );

QUnit.test( "Library Exists", function( assert ) {
  assert.ok( typeof GoatCurry === "object" , "Passed!" );
});

QUnit.module( "Helper Functions" );

QUnit.test( "Helper module exists", function( assert ){
  assert.ok( GoatCurry.helper, "Passed!" );
});

QUnit.test( "isString returns correct boolean", function( assert ){
  assert.ok( GoatCurry.helper.isString( 'test' ), "Passed!" );
  assert.notOk( GoatCurry.helper.isString( {} ), "Passed!" );
  assert.ok( typeof GoatCurry.helper.isString( "test" ) === "boolean", "Passed!" );
});

QUnit.test( "isPlainObject returns correct boolean", function( assert ) {
  assert.ok( GoatCurry.helper.isPlainObject( {} ), "Passed!" );
});

QUnit.test( "isValidJSON returns correct boolean", function( assert ) {
  assert.notOk( GoatCurry.helper.isValidJSON( '{ test : "test"}' ), "Passed!" );
  assert.ok( GoatCurry.helper.isValidJSON( '{"array": [1, 2, 3 ], "boolean": true, "color": "#82b92c", "null": null, "number": 123, "object": {"a": "b", "c": "d", "e": "f"}, "string": "Hello World"}' ), "Passed!" );
});

QUnit.test( "isArray returns correct boolean", function( assert ) {
  assert.ok( GoatCurry.helper.isArray( [ "test", "test" ] ), "Passed!" );
  assert.notOk( GoatCurry.helper.isArray( 'test' ), 'Passed!' );
});