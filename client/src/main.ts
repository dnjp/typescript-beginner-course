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
  getMessage: function(): string {
    return 'hello ' + this.name;
  }
};
console.log(user.getMessage());
console.log(user2.getMessage());

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
console.log(errorMessage);

interface IMyUser {
  id: ID;
  name: string;
  surname: string;
};

// can be of type interface or null
let myUser: IMyUser | null = null;
console.log(myUser);

// can have an arbitrary number of types
let someProp: string | number | string[] | null = null;
console.log(someProp);


//
// Any / Void / Never / Unknown
//

// *Void*

const doSomething = (): void => {
  console.log('doSomething');
}
console.log(doSomething());

// void is defined as either null or void
let foo2: void = null;
// foo2 = "foo?"; does not compile
console.log(foo2);

// *Any*

// the any type turns off typescript checking, allowing you to do anything
let foo3: any = "foo3";
foo3 = true;
foo3 = 1;
// foo3.bar(); compiles even though it will fail at runtime
console.log(foo3);

// the 'any' type should be avoided if at all possible

// the never keyword is rare, but is used to indicate 
// control flows that should never happen
const throwAnError = (): never => {
  throw "my error";
}

try {
  throwAnError();
} catch (e: any) {
  console.log("the error is: ", e);
}

// unknown

let vany: any = 10;
let vunknown: unknown = 10;

let s1: string = vany;
let s2: string = vunknown as string; // type assertion

console.log('any', s1, 'unknown', s2, 'len', s2.length /* undefined because it is really a number */);
console.log(typeof s2); // -> number

let pageno: string = "1";
let numpageno: number = (pageno as unknown) as number; // convert to unknown first so that you can convert to number
console.log(typeof pageno, pageno, typeof numpageno /* still shows string */, numpageno);

//
// DOM
//

const someElement: Element = document.querySelector('.foo');
const myElement: HTMLInputElement = someElement as HTMLInputElement;

console.log('someElement:any', (someElement as any).value); // bad way to do the conversion
console.log('myElement:HTMLInputElement', myElement.value); // the right way to do this

document.getElementById('name').blur();
someElement.addEventListener('blur', (event: Event) => {
  const target: HTMLInputElement = event.target as HTMLInputElement;
  console.log('event', target.value);
});

//
// Classes
//

interface IAUser {
  getFullName(): string;
}

class User implements IAUser {
  protected firstName: string;
  protected lastName: string;
  readonly id: number;
  static readonly maxAge = 50;

  constructor(first: string, last: string, num: number) {
    this.firstName = first;
    this.lastName = last;
    this.id = num;
  }

  // this does not work because id is readonly
  // updateId(): void {
  //   this.id += 1; 
  // }

  getFullName(): string {
    return this.firstName + ' ' + this.lastName;
  }
};

const u1: User = new User('daniel', 'posthuma', 1);
console.log(u1.getFullName());
// console.log(u1.firstName); this does not compile because firstName is private
console.log('max age', User.maxAge);

class Admin extends User {
  private editor: string;

  setEditor(editor: string): void {
    this.editor = editor;
  }

  getEditor(): string {
    return this.editor;
  }
}

const admin: Admin = new Admin('foo', 'bar', 2);

console.log(admin.getFullName());
admin.setEditor('daniel');
console.log('admin', admin.getEditor());

//
// Generics
//

const myAppend = <T>(el: T, list: readonly T[]): T[] => {
  return [...list, el]
}

const updatedArray: string[] = myAppend<string>('baz', ['foo', 'bar'])
console.log(updatedArray);

const searchstr = 'foo';

// const _hasSearchedString = any<string>(
//   (el: string): boolean => el.contains(searchstr),
//   ['foo', 'bar', 'baz']
// )

// takes a generic T type, specifying that only
// an object is allowed
const addId = <T extends Object>(obj: T) => {
  const id: string = Math.random().toString(16).slice(2, 16);
  return {
    ...obj,
    id,
  }
}

interface UserInterface<T, V> {
  name: string;
  data: T;
  meta: V;
};

const jack: UserInterface<{ meta: string }, string> = {
  name: "Jack",
  data: {
    meta: "foo"
  },
  meta: 'bar'
}

const result = addId<(UserInterface<{ meta: string }, string>)>(jack);
console.log(result);

const result2 = addId<string>("jack");
console.log(result2);

const john: UserInterface<string[], string> = {
  name: "john",
  data: ["foo", "bar", "baz"],
  meta: "meta"
}
console.log(john);


//
// Enums
//

//// Enums can have values
enum Status {
  NotStarted = "not_started",
  InProgress = 'in_progress',
  Done = 'done'
};

//// Enums do not need to have values
// enum Status {
//   NotStarted,
//   InProgress,
//   Done
// };

const s: Status = Status.NotStarted;

const printStatus = (status: Status): void => {
  switch (status) {
    case Status.NotStarted:
      console.log(Status.NotStarted);
      break;
    case Status.InProgress:
      console.log(Status.InProgress);
      break;
    case Status.Done:
      console.log(Status.Done);
      break;
  }
}

printStatus(s);

interface Task {
  id: string;
  status: Status;
};