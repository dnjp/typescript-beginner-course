//
// Variables
//

// types can be inferred
const hello = "world";
// hello = "foo"; would break due to const
// hello = true; would break due to type differences
console.log(hello);

// types can be made explicit
let foo: string = "bar";
foo = "baz";
console.log(foo);

//
// Functions
//

// provide the return type to functions
const getFullName = (name: string, surname: string): string => {
  return name + ' ' + surname;
}
// types are enforced
console.log(getFullName('daniel', 'posthuma'));

//
// Interfaces
//

interface IUser {
  name: string;
  age?: number;
  getMessage(): string; // can define functions as part of interface
}

const user: IUser = {
  name: 'Daniel',
  age: 28,
  getMessage() {
    return 'hello ' + this.name;
  },
};

const user2: IUser = {
  name: 'Jack',
  getMessage: function (): string {
    return 'hello ' + this.name;
  }
};
console.log(user.getMessage());

//
// Types and Unions
//

// simple string alias
type ID = string;

// simple string alias
type PopularTag = string;

// can be PopularTag or null
type MaybePopularTag = PopularTag | null;

const popularTags: PopularTag[] = ['dragon', 'coffee'];
console.log(popularTags);

let dragonTags: MaybePopularTag = 'dragon';
dragonTags = null;
console.log(dragonTags);

// basic string type
let username: string = "daniel";
console.log(username);

// union operator to say a value can be of different defined types
let pagename: string | number = "1";
pagename = 1;
console.log(pagename);

// can be string or null with null as the default
let errorMessage: string | null = null;

interface IMyUser {
  id: ID;
  name: string;
  surname: string;
};

// can be of type interface or null
let myUser: IMyUser | null = null;

// can have an arbitrary number of types
let someProp: string | number | string[] | null = null;


//
// Any / Void / Never / Unknown
//


