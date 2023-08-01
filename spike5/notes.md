# TypeScript with React

## create TS React app

We can use the same boilerplate starter command previously used and add the template option `--template typescript` to generate a project with the tsconfig.json already configured.

```cmd
npx create-react-app my-app --template typescript
```

[Adding TypeScript to React](https://create-react-app.dev/docs/adding-typescript/)

/!\ Adding TS to an existing project can be tricky to configure.
Prefer starting from a TS template where you can allow JS files in your tsconfig.json.

## TLDR: The things to explicitly type are the ones directly linked to the purpose of your project

- Props
- State
- Custom hooks
- Context
- Utility Functions inputs/outputs

## Function components

Let's create a new functional component. For instance, one called "Profile.tsx". It will render information about a user. We will name the file extension '.tsx" to specify that it's a react typescript file.

/!\ Strongly typing functional components is discouraged (implicit children type...)

```ts
const CatFact: React.FunctionComponent<{ fact: string }> = ({ fact }) => (
  <div>{fact}</div>
);
```

instead simply it can be written as normal functions that take a props argument and return a JSX element.

## Passing props

```ts
type AppProps = {
  message: string;
}; /* use `interface` if exporting so that consumers can extend */

//  Function Component; return type is inferred.
const CatFact = ({ fact }: AppProps) => <div>{fact}</div>;

// you can choose annotate the return type so an error is raised if you accidentally return some other type
const CatFact = ({ fact }: AppProps): JSX.Element => <div>{fact}</div>;

// you can also inline the type declaration; eliminates naming the prop types, but looks repetitive
const CatFact = ({ fact }: { fact: string }) => <div>{fact}</div>;
```

```ts
import React from "react";

interface CatFact {
  fact: string;
  length: number;
}

const CatFacts: React.FC<Props> = ({ fact, length }) => {
  return (
    <div>
      <p>{fact}</p>
    </div>
  );
};

export default Profile;
```

TypeScript helps us make sure that the correct props are being passed between components.
If we want to specify that a prop is optional we can declare it using the optional property "?".
To make the lastName property:

```ts
interface Props {
  fact: string;
  length: number;
  optionalProperty?: boolean;
}
```

## States

### Automatic type inferring & any

It is possible to bypass type checking by simply using the `any` type. That allows you to opt out of typescript but also negates all of its benefits. It's also worth noting that typescript can provide automatic documentation for your code because the editor will automatically pick up the type definitions.
Anybody using your code will get intellisense on the shape and purpose of it and making it way more efficient to work collaboratively without having to write or read documentation.
In many cases typescript can automatically infer the type from usage. For this simply hover on the suggested code and generate the types. Make sure to check the types generated as TS might have used a wrong shape of type or the type `any`.

### Implicit and explicit typing

In some case TS can automatically infer the type from usage. This can sometimes be really helpful.
Let's create a state for a username variable with useState in the App component. We can ensure that only a string will be used for the username as follows:

```ts
const [catName, setCatName] = useState("coolcat420");
```

### Generic typing

Now if we try to set username to something that is not a string `setCatName(23)` TS will show an error as username was implicitly type as string
We can however use generic typing with angle brackets `< >` to explicitly type the state.
If our state needs to have more than one type, we can use the "|" operator to describe all the types. For example if the value can be "null":

```ts
const [catName, setCatName] = useState<string | null>();
```

Note that the type null and undefined are two different types.

## definition files

We can create definition files to store all the custom definitions using '.d' in the filename. In React we can add a folder named "@types" in the src folder of our app and a file named index.d.ts.
This file will centralize all the types and interface that we created and can be accessed by all components.
To group types in categories in the index.d.ts, we can create namespaces:

```ts
namespace PersonsN {
  interface Person {
    /**first name of the person! */
    firstName: string;
    lastName?: string;
    age: number;
  }
  type Persons = Person[];
}
```

We can then add JSDoc documentation for each property using

```ts
/**helper text automatically generated */
```

Our Profile component would then be declared as follow:

```ts
const Profile: React.FC<PersonsN.Person> = ({ firstName, lastName, age }) => {
```

## Context

```ts
import { createContext, useState, ReactNode } from "react";

interface AuthContextType {
  user: PersonsN.Person;
   login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error: string }>;

}

const  AuthContext = createContext< AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<PersonsN.Person | null>(null);

  const login = async (email: string, password: string) => {
  // ...
  };


  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
```

## Understanding the types definitions

TypeScript provides us a lot of information on type errors to help us understand what it is expecting.
These errors might seem very hard to understand at first but if you try to analyze them you will see that the provide you with a lot of information.

## Links

[React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

[TypeScript Error translator](https://ts-error-translator.vercel.app/)


- create app with ts template
- adding ts to exising project is tedious, prefer new template
- tsconfig.json created by vite - `"allowsJs": true` let's you still use `.js` files when you want
- strictly type:  
    - props
    - state
    - utility functions - parameters/returnds
    - custom hooks
    - context
- React types can be imported from React package - only create custom types for you own data
- Inferred types - state and events
- send type into useState with Generics
- strongly typing fetched data
- @types folder with definition (.d.ts) files
```ts
/**helper text automatically generated */
```
- any type - sometimes easiest way to type events because of legacy dom 

