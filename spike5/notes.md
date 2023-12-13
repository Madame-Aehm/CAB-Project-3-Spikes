# Project 3: Spike 5

## Typescript in React

Adding Typescript to an existing project can be tricky. Read about the steps [here](https://marketsplash.com/tutorials/typescript/how-to-add-typescript-to-existing-react-project/). It's much easier to just use one of the boilerplate scripts to create a new project already configured for Typescript. This can be achieved by adding `--ts` or `--typescript` when running the `create-react-app` script, or by selecting Typescript from the prompts when creating a project with **Vite** or **Next.js**. These projects will now include a package of pre-made Types specific to the framework. 

The most important things to assign explicit Types to are the variables that will be passed around: **Props**, **State**, **Context**, and **function Parameters and Returns** (including **event handlers**, **utility functions**, and **custom Hooks**).

## Definition files

If we only use a Type or Interface once, declaring it in the Component that uses it is fine. But if we want to use the same Type across many Components, we can store them in a **definition file**. Create a `@types` folder in the src, and a file named inside called `index.ts`. If you have many Types, you can create more files to keep them organised. Each Type/Interface will need to be `exported` so that it can then be `imported` and used across the app. 

```ts
export type Zodiac = "Aquarius" | "Pisces" | "Aries" | "Taurus" | "Gemini" | "Cancer" | "Leo" | "Virgo" | "Libra" | "Scorpio" | "Sagittarius" | "Capricorn";
export interface User {
  username: string
  star_sign: Zodiac
}
```

## Function components

Let's create a new functional component called `Profile.tsx` - it will render information about a user. We will name the file extension `.tsx` to specify that it's a React Typescript file. You might see in older tutorials/documentation the type `React.FunctionComponent` or `FC`, but this is generally agreed to be redundant. 

However, it will still be necessary to explicitly Type your Props. You can do this by creating a Type for whole props object:

```ts
type Props = {
  user: User
}
const Profile = (props: Props) => <p>{ props.user.username } is a { props.user.star_sign }</p>;
```

Or by destructuring the Props and applying a Type to each property:

```ts
const Profile = ({ user }: { user: User }) => <p>{ user.username } is a { user.star_sign }</p>;
```

```ts
function App() {
  return (
    <Profile user={{ username: "Emily", star_sign: "Cancer" }} />
  )
}
```

You can choose to annotate the return Type so an error is raised if you accidentally return some other Type than a JSX element:

```ts
const Profile = ({ user }: { user: User }): JSX.Element => <p>{ user.username } is a { user.star_sign }</p>;
```

TypeScript helps us make sure that the correct props are being passed between components. If we want to specify that a prop is optional we can declare it using the optional property "?". This means Typescript will remind us any time we attempt to use this variable that it could be `undefined`, so make sure to do some conditional rendering to prevent errors. 

```ts
type Props = {
  user: User
  optionalProperty?: string;
}
```
```tsx
const Profile = ({ user, optionalProperty }: Props): JSX.Element => {
  return (
    <>
      <p>{ user.username } is a { user.star_sign }</p>
      { optionalProperty && <p>{ optionalProperty }</p> }
    </>
  )
};
```

## States

### Implicit and explicit typing

Typescript can automatically infer the type from usage. Let's create a state for a username variable with `useState()`. Unless otherwise stated, the Type of the initial value will be inferred to be the Type of the state variable. `catName` will be locked to `string`:

```tsx
const [catName, setCatName] = useState("coolcat420");
```

To explicitly Type `catName` to accept a `number` **or** a `string`, we'll have to pass those Types into the Hook using **Generics** (we will cover this in more depth when we cover Custom Hooks). For now, know that you can use **angled brackets** to pass the desired Types into the Hook. (A single bar **|** functions as an **or** operator in Typescript).

```tsx
const [catName, setCatName] = useState<string | number>("coolcat420");
```

This is commonly used if your state is initialized as `null`. (Note that `null` and `undefined` are different Types.)

## Events

The easiest way to properly Type your events is to have the entire function inline on the element - this way, Typescript can infer the Event Type. 

```tsx
<input onChange={(event) => {
  console.log(event.target.value);
}} />
```

However, if you're importing a function, or simply prefer to define a handler outside the element, then you'll need to explicitly Type the Event. The Event Type will need to be imported from the 'react' package - some will also need to be passed a Generics addition of the HTML element type using it. [This page](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events) has a good list of event Types with a description of when to use them. A trick is to first send the event through the parameters of an inline anonymous function, then you can hover and copy/paste the inferred Type! 

```ts
const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  console.log(event.target.value);
}
```

For some asynchronous functions, it is sometimes necessary to add a `.catch()` block in the event callback. 

### Automatic type inferring & any

It is possible to bypass Type checking by simply using the `any` type. That allows you to opt out of Typescript, but also negates all of its benefits. It's also worth noting that typescript can provide automatic documentation for your code, as the editor will automatically pick up the Type definitions. Anybody using your code will get [Intellisense](https://code.visualstudio.com/docs/editor/intellisense) on the shape and purpose of your variables and functions, making it more efficient to work collaboratively without having to read or write documentation. Hover over code to view further details.

If you're fetching data from an external source, you should create custom Types to handle what you expect to receive. You should check what your API sends back for both a successful and failed response, then use a **JSON to Typescript Converter** to help you create your custom Type! Always review what the converter returns, and test it on multiple end-points to catch any properties that could have a hidden Union Type! Some good converters can be found [here](https://jsonformatter.org/json-to-typescript), [here](https://transform.tools/json-to-typescript), and [here](https://quicktype.io/typescript).

## Understanding the types definitions

TypeScript provides us a lot of information on type errors to help us understand what it is expecting. These errors might seem very hard to understand at first, but if you try to analyze them you will see that they provide you with a lot of information. [Here](https://ts-error-translator.vercel.app/) is a handy translator, if you find them unclear. 

## Links

[React TypeScript Cheat Sheet](https://react-typescript-cheatsheet.netlify.app/)

[TypeScript Error translator](https://ts-error-translator.vercel.app/)