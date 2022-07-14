//
// Variables
//
// types can be inferred
var hello = "world";
// hello = "foo"; would break due to const
// hello = true; would break due to type differences
console.log(hello);
// types can be made explicit
var foo = "bar";
foo = "baz";
console.log(foo);
//
// Functions
//
// provide the return type to functions
var getFullName = function (name, surname) {
    return name + ' ' + surname;
};
// types are enforced
console.log(getFullName('daniel', 'posthuma'));
var user = {
    name: 'Daniel',
    age: 28,
    getMessage: function () {
        return 'hello ' + this.name;
    }
};
var user2 = {
    name: 'Jack',
    getMessage: function () {
        return 'hello ' + this.name;
    }
};
console.log(user.getMessage());
console.log(user2.getMessage());
var popularTags = ['dragon', 'coffee'];
console.log(popularTags);
var dragonTags = 'dragon';
dragonTags = null;
console.log(dragonTags);
// basic string type
var username = "daniel";
console.log(username);
// union operator to say a value can be of different defined types
var pagename = "1";
pagename = 1;
console.log(pagename);
// can be string or null with null as the default
var errorMessage = null;
console.log(errorMessage);
;
// can be of type interface or null
var myUser = null;
console.log(myUser);
// can have an arbitrary number of types
var someProp = null;
console.log(someProp);
//
// Any / Void / Never / Unknown
//
// *Void*
var doSomething = function () {
    console.log('doSomething');
};
console.log(doSomething());
// void is defined as either null or void
var foo2 = null;
// foo2 = "foo?"; does not compile
console.log(foo2);
// *Any*
// the any type turns off typescript checking, allowing you to do anything
var foo3 = "foo3";
foo3 = true;
foo3 = 1;
// foo3.bar(); compiles even though it will fail at runtime
console.log(foo3);
// the 'any' type should be avoided if at all possible
// the never keyword is rare, but is used to indicate 
// control flows that should never happen
var throwAnError = function () {
    throw "my error";
};
try {
    throwAnError();
}
catch (e) {
    console.log("the error is: ", e);
}
// unknown
var vany = 10;
var vunknown = 10;
var s1 = vany;
var s2 = vunknown; // type assertion
console.log('any', s1, 'unknown', s2, 'len', s2.length /* undefined because it is really a number */);
console.log(typeof s2); // -> number
var pageno = "1";
var numpageno = pageno; // convert to unknown first so that you can convert to number
console.log(typeof pageno, pageno, typeof numpageno /* still shows string */, numpageno);
//
// DOM
//
var someElement = document.querySelector('.foo');
var myElement = someElement;
console.log('someElement:any', someElement.value); // bad way to do the conversion
console.log('myElement:HTMLInputElement', myElement.value); // the right way to do this
document.getElementById('name').blur();
someElement.addEventListener('blur', function (event) {
    var target = event.target;
    console.log('event', target.value);
});
