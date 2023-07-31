# Spike 3 - React Intro p2

## Events

Adding [events](https://www.w3schools.com/jsref/dom_obj_event.asp) to your elements is handled **inline** in JSX. All events will be written **on** + the event type in **camelCase**. eg. `onClick`, `onChange`, `onSubmit`, etc.

These events will accept a function much the same as an **Event Listener**. You can use an anonymous function, or you can write the function and then pass it to the event. In React, a common naming convention is to add "handle" to the function names that are "handling" the events. The same as with an Event Listener callback, the first parameter will always be the Event Object. Let's create a `<button>` with an `onClick` event that simply logs a message to the console.

```js
<button onClick={() => {
  console.log("button has been clicked");
}}>Click me!</button>

//or
function handleClick() {
  console.log("button has been clicked");
}
<button onClick={handleClick}>Click me! </button>
```

## React State

React is called React because it is "reacting" to changes. But if it reacted to any and all changes, it would be impossible to control! So a special type of variable exists to hold the values that we want React to be "watching". This is known as [**state**](https://react.dev/learn/state-a-components-memory). The best way to demonstrate is to compare the way React responds to a regular variable. Let's create an `<input />` to go with our `<button />`, then write some code to have the button change the value of a variable we're displaying in our return to the value typed by a user into the input.

```js
function App() {
  let myName = "Emily";
  let newName = "";

  function handleChange (event) {
    console.log("input", event.target.value)
    newName = e.target.value;
  }

  function handleClick () {
    console.log("before", myName);
    myName = newName
    console.log("after", myName);
  }

  return (
    <div>
      <p>My name is: <b>{ myName }</b></p>
      <input onChange={handleChange}/>
      <br/><br/>
      <button onClick={handleClick}>Click me! </button>
    </div>
  )
}
```

This looks a bit different to how we would do it with Vanilla JavaScript. With Vanilla, we would be able to use a method like `.getElementById()` to target the input element itself in the `click` event. That's not going to work here, because the element isn't even created until the return of the function, so I've had to create a second variable to hold the input value. It starts as just an empty string, but then for every change made to the input value, my `newName` is reinitialized.

What I want to happen is for the variable `myName` to be reinitialized with the same value as `newName`, and then for me to _see_ the change in the DOM. We can see in the console that the value of the variable is updating, but the DOM stays the same. This is because React doesn't re-render for a regular variable change. Remember how much work that was in Vanilla JS? To remove the existing value, then add new ones? It isn't going to do all of that unless it knows it needs to. 

It knows it needs to do this for state changes. To create a state variable, we will use the `useState()` React Hook (we'll cover Hooks in another spike). This will need to be **imported** from 'react' into every file you want to use it. 

```js
import { useState } from 'react'

function App() {
const [myName, setMyName] = useState("Emily");

 return (
  // content
  )
}
```

For now, what you need to understand is that the first item in the returned array is the **state variable** (this holds the value), and the second item is the **state setter function**, which you will use in order to update the state variable. You will set the **initial value** of the state when you create it. It will be important to pay attention to your initial states for rendering purposes later.

It's a common naming practise to name your state setter function the same as your variable with "set". The names are actually arbitrary, but you'll quickly lose track of which function belongs to which variable if you don't follow a pattern.

Instead of **reinitializing** a `let` variable, I can now use the state setter function to reset the value of my variable. 

```js
  function handleClick () {
    console.log("before", myName);
    setMyName(newName)
    console.log("after", myName);
  }
```

Notice though, that even though the DOM updates correctly, now our console logs are wrong! This takes some practise to understand, but it's crucial to using React: **state values update on the next render**. If you are trying to apply some other JavaScript functionality to the state value, it will still be applying to the old value, not the new. 

We can use an `<input />` with an `onChange` event, together with some console logs to demonstrate this. Every time I make a change in the input, I'll update the value state, which triggers a re-render. 

```jsx
  <input id='input' value={inputValue} onChange={(e) => {
    setInputValue(e.target.value);
    console.log(inputValue);
  }}/>
```

## React Effects

Sometimes we want to trigger some functionality not based on a user interaction, but because something else on the page has updated, or as the component is mounted/unmounted. For this, we can use React's [`useEffect()` hook](https://react.dev/reference/react/useEffect). This takes a **callback**, and then an optional **dependency array**.

The callback is essentially the "effect" taking place. The default behaviour of `useEffect()` with no dependency array is to trigger the callback function on _every_ render of the component, including the first. We can use console logs to see how it runs every single time we update _any_ state. 

It's more likely though, that you're either going to want the `useEffect()` to only run once, or to run only when _specific_ states are updated. We use our dependency array to communicate this. An empty array means the effect will run on the **first** render only. If you want your effect to run when a specific state updates, put that state into the array. The Hook will compare the value of the variable/s between renders - if _any_ of them are different, it will run the effect.

```ts
useEffect(() => console.log("I run on every render!"));

useEffect(() => console.log("I run only on the first render!"), []);

useEffect(() => console.log("I run on the first render, and again any time the user state variable updates!"), [user]);
```

Think about what you're trying to achieve when you implement `useEffect()`. According to the React [docs](https://react.dev/learn/you-might-not-need-an-effect), "If you’re not trying to synchronize with some external system, you probably don’t need an Effect."

Our most common use-case will be to make fetch requests when the page loads, and to re-fetch data based on some user interaction. We would then have a state variable waiting to be updated with the result from our fetch. It's very important to remember the dependency array when updating state from a `useEffect()` - otherwise you'll find yourself in an infinite loop! The state change triggers a re-render, which triggers the `useEffect()`, which updates the state, which triggers a re-render...........

```ts
  useEffect(() => {
    async function fetchData () {
      try {
        const response = await fetch("https://rickandmortyapi.com/api/character");
        const result = await response.json();
        setCharacters(result.results);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [])
```