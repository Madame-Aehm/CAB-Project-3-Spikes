# Project 3: Spike 7

## Nested Routes

We've seen how to build some flat routes, but it's also possible to nest routes inside each other. Each route object in our BrowserRouter array can also accept a property `children`, which will be another array of routes! As an example, let's create an `<About />` component to be rendered at `"/about"`. I have two themes I want to cover in my about section: about the company, and about the developer, so I would like to show different components at `"/about/dev"` and `"/about/company"`. I'll need components for all of them, then add a new path with children to the routes tree.

```ts
  {
    path: "/about",
    element: <About />,
    children: [
      {
        path: "developer",
        element: <AboutDev />
      },
      {
        path: "company",
        element: <AboutCompany />
      }
    ]
  }
```

Notice we omit the **/** for the nested routes. A **/** symbol creates an **absolute** route. If you were to use an absolute route, you would need to specify the full path, like `"/about/developer"`. Be very careful about typos if you choose to define nested routes this way! 

If we visit the nested routes, however, we're still only seeing the main route. The child component of a nested route component can be viewed using the special React Router component `<Outlet />`. This component will need to be placed on the main `<About />` component - it checks the location, and then renders the specified element when the pathname matches. This is great for making tabs or sub-menus. To replace the entire page component, you're probably better to just make a separate route. Alternatively, you could take the pathname from `useLocation()` Hook and apply some conditional rendering.

If you're using `<NavLink>` components for your NavBar, you'll notice the "parent" route always stays active when visiting a nested route. To remove this default behaviour, you can add the property `end` to the `<NavLink>`.

## optional: Route loader, errorElement, etc

The newest version of React Router offers us some additional APIs to use with our Routes. Two very useful are [**loader**](https://reactrouter.com/en/main/route/loader) and [**errorElement**](https://reactrouter.com/en/main/route/error-element). The `loader` property on the route object let's you assign a function to provide data to the route element _before_ it renders. We could have the `loader` do our fetch, so that there's no need to fetch within a useEffect. We might still need to use a useEffect to assign the correct states their values from the loader response, but the fetch itself will already be finished before the page has finished loading. Let's try it for our `"/characters"` and `"characters/:id"` routes.

```tsx
{
  path: "/characters",
  element: <Characters />,
  loader:async () => {
    return fetch("https://rickandmortyapi.com/api/character");
  }
},
```

To access the return of this function, we use the `useLoaderData()` Hook on the component. If we comment out our useEffect and log the Hook result to the console, we can see it's the same fetch response we would normally receive. We can now handle that data how we want. I will still always check for errors, and I will still need to set the types of my response data. You can access the parameters of a dynamic route through the parameters of the function:

```tsx
{
  path: "/character/:id",
  element: <Character />,
  loader:async ({ params }) => {
    return fetch(`https://rickandmortyapi.com/api/character/${params.id}`);
  }
},
```

```tsx
const loaderData = useLoaderData() as RickMorty;

useEffect(() => {
  const { results } = loaderData;
  const { error } = loaderData;
  results && setCharacters(results);
  error && setError(error);
}, [loaderData])
```

But React Router also provides us with some Error handling options. If something goes wrong and an exception is thrown, I can catch that response with the Hook `useRouteError()` on a component I designed specifically to communicate the error. Set that component as the value for `errorElement` property on the route object. 

```tsx
import { useRouteError } from "react-router"

const ErrorElement = () => {
  const routeError = useRouteError() as Error;
  return (
    <div>
      <h1>It appears something went wrong...</h1>
      <p>{ routeError.message }</p>
    </div>
  )
}

export default ErrorElement
```

If you're applying a `loader` function on a dynamic route, the params are passed to the function in an object in the function parameters.

```tsx
{
  path: "/characters/:id",
  element: <Character />,
  loader:async ({ params }) => {
    return fetch(`https://rickandmortyapi.com/api/character/${params.id!}`);
  },
  errorElement: <ErrorElement />
},
```