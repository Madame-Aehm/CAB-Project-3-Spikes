# Spike 16 notes

## React Context

- The issue of **state management** in React can be very complicated. You have one variable holding a state that you want to be recognised across multiple pages and components. In the past, the only way to keep everything aligned was to utilize **prop-drilling**. This term describes the process in which developers pass props down through many components that don't even use it, just to that it can reach one component at the very bottom. It's messy and confusing. 

- React now has a built in tool called **Context** that can help with this. It sets up a **provider** which will wrap the whole app, and now any component inside can independently access information held on the Context. Think carefully about what data you are going to need to keep track of across the entire App, such as information about the current User or active theme. 

- Be aware that Context requires more processing power, since the data it holds is essentally **global**. It isn't [always](https://blog.logrocket.com/pitfalls-of-overusing-react-context/) the best solution. 

- We will start by creating a new folder in our 'src' to hold all our context files. In this folder, I'll create a file and call it AuthContext.js. This file is going to hold all the data about a user, if we have one. It can also be used to indicate when there _isn't_ a user, since we'll make some pages or components only available to logged-in users.

- The first step is to declare and export a variable with **createContext()**. We're also going to export this variable. eg:

```js
  import { createContext } from "react";

  export const AuthContext = createContext();
```

- We now need to create (and export) a **Provider** for our context. Every **&lt;Context.Provider &gt;** component has a **value** prop. This is what will be passed to all the 'children' of the Provider. We're going to write it as a function, so we can make variables to hold all our values and functions we want to send, then **return** the **&lt;Context.Provider &gt;**. Inside this component, we will put **{ props.children }**. This represents the 'children' that will be nested inside the Provider once we've wrapped it around our whole App. Make sure to export this function, so we can import and use it elsewhere! eg:

```js
export const AuthContextProvider = (props) => {
  return(
    <AuthContext.Provider value={}>
      { props.children }
    </AuthContext.Provider>
  )
}
```

- Now on our App.js component, we can import this AuthContextProvider function as a component, and wrap it around our App. eg:

```js
import { AuthContextProvider } from './contexts/AuthContext';
...other imports here

function App() {
  return (
    <AuthContextProvider>
      <Navbar />
      <Routes>
        { routes here... }
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
```

- If I log something to the console to test whether my Context is connected, I should see it from any page.

- We don't have any log in functionality yet, but we can still create some states and functions to imitate it, in preparation for when we will. On my AuthContext, I'm going to create a state for a user. How you initialize your initial user state is up to you, but you should be consistent across your functions when you start to create them. You can create a state to track a user **object**, which exists as either **null** or the user's details. Pass this variable into the Provider as a value. 

- In order to now access this variable somewhere else in the App, we will use React's **useContext()** hook. On any component, import both the useContext hook from React, and the AuthContext from our own file. In the component, call the hook and save the return to a variable. Here, if you log it to the console, you'll see an object with any Provider values represented as properties. We can then **destructure** to access specifically the variables from the value that we want. eg:

```js
  const { user } = useContext(AuthContext);
```

- Now we can start doing some conditional rendering related to whether we have a user or not. Remember, at the moment the user and value is set to 'null'. We could put some sign in the NavBar to indicate that a user is logged in or not. 

- We can take that a step further, and create an 'imitation' login function on the AuthContext. All it needs to do is to update the state of the user variable with some fake account details. Now put that login function into the Provider value so we can access it from anywhere! Let's log in from the NavBar. If you also want to logout, you'll just have to create a function that does the opposite.

- Say I also want to set some private Routes on my App. For example, unless a user is logged in, they aren't allowed to view the selected character page. We can create a component to act as a **Protected Route**, which we will wrap around any component we wish to keep private from non-users. This component will recieve the special **children** props (the same as the context provider!). Destructuring it means you don't have to use props.children. 

- We will need to access the user state from the AuthContext to determine whether a user is an object with details, or null. If user isn't null, we will return the children from the props (this is returning all children components nested inside the tags of my ProtectedRoute). If the user state is 'null', then we can either return something to communicate that they need to sign in to view the page, or we can use the useNavigate again to automatically redirect them to the login or home page. eg:

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

- Now I just need to import this component into the App.js and wrap it around any route path component that I want to be protected! 

## Custom Hooks

- We've already been using Hooks written by React: useState, useEffect, useContext, etc. We can also write our own Hooks! Building our own Hooks lets us extract component logic into reusable functions. It's generally adviced to name your Hook with 'use', so that you rememeber the [rules of Hooks](https://reactjs.org/docs/hooks-rules.html) apply. 

- Let's create a Hook to return our fetch results. Make a folder to hold all our custom Hooks, and then start a file called useFetch.js. This is going to do all our fetches for us, both the 'all' and the individual character endpoints, so we'll need to do a bit of conditional work to make it compatible with both results. Multiple states to hold all potential results, or a parameter to indicate which result is expected, are two potential ways. 

- The Hook will recieve a URL as a parameter, this will be what it 'fetches'. The fetch function itself should be called in a useEffect, like usual. Set the URL in the dependency array of the useEffect. This ensures it will fire even if the Hook is called multiple times on the same page. The return of our Hook is going to be all the states we've collected. We can return an error, a loading state, and then any and all results from our fetch.

- On the pages where we're going to replace the fetch functions with our Hook, save the return of the Hook (with the appropriate arguments!) into a variable and log it to the console. You'll see it's returning an object with your variables. We can use destructuring to create those variables on the page. If you want to rename a variable, you can put a colon after the variable to be renamed and define the new name. eg:

```js
  const { result: characters, error, loading } = useFetch("https://rickandmortyapi.com/api/character", "all");
```

