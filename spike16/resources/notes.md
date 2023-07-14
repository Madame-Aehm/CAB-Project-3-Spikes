# Spike 16 notes

## React Context

The issue of **state management** in React can be very complicated. You have one variable holding a state that you want to be recognised across multiple pages and/or components. In the past, the only way to keep everything aligned was to utilize **prop-drilling**. This term describes the process in which developers pass props down through many components that don't even use it, just to that it can reach one component at the very bottom. 

React now has a built in tool called [**Context**](https://react.dev/learn/passing-data-deeply-with-context) to help with this. It sets up a **provider** which can wrap the whole app, any component inside can then independently access information held on the Context. Think carefully about what data you are going to need to keep track of across the entire App, such as information about the current User or active theme. 

Context is very convenient, but be aware that it requires more processing power, since the data it holds is essentally **global**. When you update the value of your Context, _all_ components using the Context will also re-render. It isn't [always](https://blog.logrocket.com/pitfalls-of-overusing-react-context/) the best solution. 

We will start by creating a new folder in our 'src' to hold all our Context files. In this folder, I'll create a file and call it `AuthContext.tsx`. This file is going to hold all the data about a user, if we have one. It can also be used to indicate when there _isn't_ a user, since we'll make some pages or components only available to logged-in users.

The first step is to declare and export a variable using React's `createContext()`.

```js
  import { createContext } from "react";

  export const AuthContext = createContext();
```

Immediately we come across a [Typescript](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/) error that tells us we need a **default value** for our Context. This is what will be returned if you try to use your Context outside of it's **Provider**. The best approach is to create a full object variable to represent the "empty" value keys of your Context, and then a Type Interface for this object. Alternatively, you can use this default object to communicate to your user or yourself that somehow you're trying to use your Context outside it's Provider. 

So far, the only thing I know my Context will hold will be a user object, but since I haven't even created that yet, I'm just going to say my user is a `boolean` - they're either logged in, or logged out (I will update this later!). In a folder called `@types`, create a file `index.d.ts` to hold all Types and Interfaces that you're likely to re-use across the App. 

```ts
type User = boolean;
```

Back on the `AuthContext.tsx`, declare a default variable object to pass to the `createContext()` function. To demonstrate how the Provider works, I'm going to let my user variable be a `boolean`, or a `string` that communicates `"No provider"`. I will also need to create an interface for my AuthContext, which will also need to apply to the default.

```ts
import { createContext } from "react";

interface AuthContextType {
  user: User | "No provider"
}

const defaultValue: AuthContextType = {
  user: "No provider"
}

export const AuthContext = createContext(defaultValue);
```

We now have a very simple Context. Let's test it first without creating a Provider. To access anything on your Context, you need to use the `useContext()` hook, and pass it the Context variable you exported. If I do this in any Component and log it to the console, I should see my default object values.

The Provider exists as a property on my Context, so from the `main.tsx`, I can wrap this `AuthContext.Provider` Component around whichever Components or Routes that I want to share the values. In our case, all of them! This is where I then define the true value of my `value` - I can set my user to `false`. The problem here though is that I don't have any of the data I want to pass as the value. There's nowhere to write a function to check if a user is logged in, or to create a state to hold the result. 

So we're going to create a new Component just to return the Provider. We can do this on the same `AuthContext.tsx` file, or you can create a new folder to hold all your Providers seperate. I'm going to call this function `AuthContextProvider`, and then I can wrap _this_ around my App on `main.tsx`. I return the <AuthContext.Provider>, but I now have somewhere I can write JavaScript to actually create and manipulate the variables and functions I would want to send with `value`. 

```ts
type Props = {
  children: ReactNode
}

export const AuthContextProvider = (props: Props) => {
  const [user, setUser] = useState<User>(false)
  return (
    <AuthContext.Provider value={{ user }}>
      { props.children }
    </AuthContext.Provider>
  )
}
```

This is all probably very abstract, and you're not expected to understand immediately what's happening. Especially since most of the magic is actually happening under the hood in the React Hooks and functions provided for us. But try to follow the flow - where is the data created, how and to where is it being passed? Console.log every step of the way if you're unsure what your variable holds. 

Now, whenever we use the `useContext()` hook and pass it our `AuthContext`, we will be able to access anything shared as a `value` on the Provider. We can then **destructure** to access specifically the variables from the value that we want. eg:

```js
  const { user } = useContext(AuthContext);
```

Now we can start doing some conditional rendering related to whether we have a user or not. Remember, at the moment the user is set to `false`. We could put some sign in the NavBar to indicate that a user is logged in or not.

We can take that a step further, and create an 'imitation' login function on the AuthContext. All it needs to do is to update the state of the user variable with some fake account details. Now put that login function into the Provider value so we can access it from anywhere! Let's log in from the NavBar. If you also want to logout, you'll just have to create a function that does the opposite.

```ts
const login = () => {
  setUser(true);
}

const logout = () => {
  setUser(false);
}
```

Now we want to pass this through our Context Provider, but if we add them to the `value`, Typescript complains. It's tedious, but anytime we want to update what our Context shares, we also need to update the default value, and the Context Type.

```ts
interface AuthContextType {
  user: User | "No provider"
  login: () => void
  logout: () => void
}

const defaultValue: AuthContextType = {
  user: "No provider",
  login: () => { throw Error("No provider") },
  logout: () => { throw Error("No provider") }
}
```

A void function is a function that doesn't **return** anything. For the default value, I've had them throw an error that simply communicates there is no provider. If I were to forget my Provider, this error message will remind me to implement it.

## Protected Route

Say I want to set some private Routes on my App. For example, unless a user is logged in, they aren't allowed to view the selected character page. We can create a component to act as a **Protected Layout**, which we will wrap around any component we wish to keep private from non-users. 

We will need to access the user state from the AuthContext to determine whether a user is logged in. If user is `true` (or, later, more likely a user data `object`), we will return the `props.children`. If the user state is `false`, or `null`, then we can either return something to communicate that they need to sign in to view the page, or we can use `useNavigate()` or `<Navigate />` to automatically redirect them to the login or home page.

```js
import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  return (
    <>{ user ? children : <p>You need to log in to view this page</p> }</>
  )
}

export default ProtectedRoute
```

Now I just need to import this component into the `main.tsx` and wrap it around any route path component that I want to be protected! 

## Custom Hooks

We've already been using **Hooks** written by React: `useState`, `useEffect`, `useContext`, etc. We can also [write our own](https://react.dev/learn/reusing-logic-with-custom-hooks) Hooks! Building our own Hooks lets us extract component logic into reusable functions. It's generally adviced to name your Hook with 'use', so that you remember that the [rules of Hooks](https://reactjs.org/docs/hooks-rules.html) apply. 

Custom Hooks are great to prevent duplicating logic, but they can be overkill for simple code. The React Docs recommend looking at when you're using `useEffect`, and consider whether wrapping that logic in a Custom Hook could help put the focus in your component to what your intent for the code is, rather than how you implement it. A very common example is a `fetch` and relevent `useState` variables (data, loading, error).

```ts
const useFetch = (url: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [data, setData] = useState<RickAndMorty>();

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (e) {
        console.log(e);
        setError(e.message)
      }
    }

    fetchData()
    .catch((e) => {
      console.log(e)
      setError(e.message)
    })
    .finally(() => setLoading(false))
  }, [url]);

  return { data, error, loading }
}

export default useFetch
```













## React Custom Hooks with Typescript

- The same way we wrote a custom hook to fetch for our previous project, it's not a bad practise to do it again here. [Here](https://dev.to/sulistef/how-to-create-a-custom-react-hook-to-fetch-an-api-using-typescript-ioi) is a page with a nicely explained example. We're going to try to do the same thing, but I also want to introduce the concept of [**Generics**](https://www.typescriptlang.org/docs/handbook/2/generics.html). This is where we create a placeholder for a Type that will be passed down through props. 

- In the following example, `<Placeholder>` is an arbitrary name given to the "props" Type being passed down. We use it to strictly type the data variable we will be returning:

```ts
interface ReturnData<Placeholder> {
  isLoading: boolean;
  data: Placeholder | null;
  error: null | string;
}
```

- In the Hook itself, it will recieve the Type like props. We can now use it wherever we need it! It could be used to strictly type the parameters or the return, and can also be reached inside the function to be applied to any relevant variables:

```ts
interface NotOk {
  error: string
}

export function useGet<Placeholder>(url: string): ReturnData<Placeholder> {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Placeholder | null>(null);
  const [error, setError] = useState<null | string>(null);

  const get = async () => {
    setError(null);
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        const { error } = await response.json() as NotOk;
        setData(null);
        setError(error.error);
      }
    } catch (error) {
      const { message } = error as Error;
      setError(message);
      setData(null)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    url && get();
  }, [url]);

  return { isLoading, data, error };
}
```

- When we call the function, we just have to be sure to include the Type we wish to pass:

```ts
// I created a type for each response for the catfacts api
interface CatFactType {
  fact: string;
  length?: number;
}
interface CatFactsArray {
  data: CatFactType[];
}
const { data, isLoading, error } = useGet<CatFactType>("https://catfact.ninja/fact");
const { data: factsArray, isLoading: factsLoading, error: factsError } = useGet<CatFactsArray>("https://catfact.ninja/facts");
```











- Let's create a Hook to return our fetch results. Make a folder to hold all our custom Hooks, and then start a file called useFetch.js. This is going to do all our fetches for us, both the 'all' and the individual character endpoints, so we'll need to do a bit of conditional work to make it compatible with both results. Multiple states to hold all potential results, or a parameter to indicate which result is expected, are two potential ways. 

- The Hook will recieve a URL as a parameter, this will be what it 'fetches'. The fetch function itself should be called in a useEffect, like usual. Set the URL in the dependency array of the useEffect. This ensures it will fire even if the Hook is called multiple times on the same page. The return of our Hook is going to be all the states we've collected. We can return an error, a loading state, and then any and all results from our fetch.

- On the pages where we're going to replace the fetch functions with our Hook, save the return of the Hook (with the appropriate arguments!) into a variable and log it to the console. You'll see it's returning an object with your variables. We can use destructuring to create those variables on the page. If you want to rename a variable, you can put a colon after the variable to be renamed and define the new name. eg:

```js
  const { result: characters, error, loading } = useFetch("https://rickandmortyapi.com/api/character", "all");
```

