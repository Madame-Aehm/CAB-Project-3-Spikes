# Project 3: Spike 9 

## Custom Hooks

We've already been using **Hooks** written by React: `useState`, `useEffect`, `useContext`, etc. We can also [write our own](https://react.dev/learn/reusing-logic-with-custom-hooks) Hooks! Building our own Hooks lets us extract component logic into reusable functions. Hooks differ from regular JavaScript utility functions - a Hook is basically a React Component, but it returns data rather than jsx. It's generally advised to name your Hook with 'use', so that you remember that the [rules of Hooks](https://reactjs.org/docs/hooks-rules.html) apply. 

Custom Hooks are great to prevent duplicating logic, but they can be overkill for simple code. The React Docs recommend looking at when you're using `useEffect`, and consider whether wrapping that logic in a Custom Hook could help put focus on the _intent_ of the code, rather than _implementation_ it. Meaning, give your Hook a clear name, and anyone looking at your code can understand what it is doing without needing to look inside. A very common example is a `fetch`, with the relevant `useState` variables (data, loading, error).

```jsx
const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async() => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(url);
        const result = await response.json();
        response.ok ? setData(result) : setError(result.error);
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

To use the Hook, I import it and call it like a function. I can send parameters to customize the functionality the same as with any JavaScript function. Here, I will pass a string to tell the fetch where to find the data. I could also send a default value for the state. The return is an object with the values of the three states. When I want to call by Hook, I can catch the return values in a variable like normal:

```jsx
const { data, error, loading } = useFetch("....whateverUrl");
```

Custom Hooks with [typescript](https://dev.to/sulistef/how-to-create-a-custom-react-hook-to-fetch-an-api-using-typescript-ioi) can be tricky. We want them to be flexible, but that means having flexible types. Each URL will return something completely different: an array of many characters, or an object for a single character, etc. This is a good place to introduce the concept of [**Generics**](https://www.typescriptlang.org/docs/handbook/2/generics.html). This is where we create a placeholder for a Type that will be passed down through props. 

In the following example, `<Placeholder>` is an arbitrary name given to the "props" Type being passed down. You will often see it represented with `<T>`, but I want to make it really clear where we're using it. Think of this as like parameters when you write a function. When we actually _use_ the type, we'll have to feed it the actual type we want to be used in place of the generic placeholder. 

I've created two interfaces for this Hook: one represents the return of the function, so the `data`, `loading` state, and `error` message. This is so that when you call it in your component, those variables will already be strictly typed. The data variable will need to be typed using generics. The second interface is what I know my API returns when something goes wrong. The catch block doesn't catch the error returned from the API, since that still counts as a successful response, so we have to handle this manually. 

```tsx
interface ReturnData<Placeholder> {
  loading: boolean;
  data: Placeholder | null;
  error: string;
}

interface NotOk {
  error: string
}
```

The syntax to _receive_ a generic type inside a function is to have it follow the function name in **angled brackets** ( **< >** ). I also type the return of the function using the `ReturnData` type I created, and I feed the the generic type it needs for the data. Then, everything inside the function is the same as usual: we create states to hold `data`, `error`, and `loading`, then use a useEffect to call the fetch function. We'll be sending the URL endpoint as normal parameters, so put this in the dependency array of the useEffect to trigger re-fetches.

```tsx
// export const useFetch = <Placeholder,> (url: string): ReturnData<Placeholder> => {   // arrow function syntax is a little different
export default function useFetch <Placeholder> (url: string): ReturnData<Placeholder> {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState<Placeholder | null>(null);

  const handleError = (e: Error) => {
    console.log(e);
    setError(e.message);
  }
  
  useEffect(() => {
    const fetchData = async() => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(url);
        if (response.ok) {
          const result = await response.json() as Placeholder;
          setData(result);
        } else {
          const result = await response.json() as NotOk;
          setError(result.error);
        }
      } catch (e) {
        handleError(e as Error)
      }
    }

    fetchData()
      .catch((e) => {
        handleError(e as Error)
      })
      .finally(() => setLoading(false))
  }, [url]);

  return { data, error, loading }
}
```

Now that our Hook is ready, it's time to use it! It returns a single object with 3 properties, but we can destructure to use those variables directly. Be aware that we've returned an object with properties `data`, `error`, and `loading`. This means we are not restricted to the correct order, but we do have to use the right name! If you want to use the the same Hook multiple times on the same page, then you'll need rename those variables as they come in.

We also pass it the type we expect the data to assume based on which endpoint we're fetching. This is passed between **angled brackets** ( **< >** ) after the Hook name, but before parameters parentheses. You've probably already been doing this when you need to strictly type a `useState()` variable!

```ts
  const { data: charactersArray, loading: arrayLoading, error: arrayError } = useFetch<RickMorty>("https://rickandmortyapi.com/api/character");
  console.log("charactersArray", charactersArray);

  const { data: singleCharacter, loading: singleLoading, error: singleError } = useFetch<Character>("https://rickandmortyapi.com/api/character/1");
  console.log("singleCharacter", singleCharacter);
```

Feel free to play around with the return value. If an object doesn't suit your needs, you could return an array like the `useState()` Hook.
