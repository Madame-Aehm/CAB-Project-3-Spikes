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

If we visit the nested routes, however, we're still only seeing the main route. The child component of a nested route component can be viewed using the special React Router component `<Outlet />`. This component will need to be placed on the main `<About />` component - it checks the location, and then renders the specified element when the pathname matches. This is great for making tabs or sub-menus. To replace the entire page component, you're probably better to just make a seperate route. Alternatively, you could take the pathname from `useLocation()` Hook and apply some conditional rendering.

If you're using `<NavLink>` components for your NavBar, you'll notice the "parent" route always stays active when visiting a nested route. To remove this default behaviour, you can add the property `end` to the `<NavLink>`.

## Layout Routes

The `children` property on Route objects and the `<Outlet />` component can also be used to make a consistent layout for your routes! Let's create a simple Layout component. Create a folder in `components` called `layouts`, and a file called `WithNav.tsx`. All we want to do is have our `<NavBar />` component at the top of most pages, without having to manually insert it into every page. We will use `props.children` in our `WithNav.tsx` to represent the content of whatever page component out layout is being passed. Since we know this will always be a `ReactNode`, we can apply this Type to the `children` property on the component's props. 

```tsx
import NavBar from "../NavBar"

type Props = {
  children: React.ReactNode
}

const WithNav = (props: Props) => {
  return (
    <>
      <NavBar />
      { props.children }
    </>
  )
}

export default WithNav
```

Now, back over on my `main.tsx`, I can create a "layout route". This is essentially a route with no `path`. The `children` will be any routes you wish the layout to apply to. In this case, I want my `<WithNav>` to apply to every page except my 404. (It might be a good idea to seperate the sub-arrays into variables at this point, just for readability). The `<Outlet />` component represents the child element when the pathname matches, so I will pass it as children to my `<WithNav>` component by putting it between the opening and closing tags.

```tsx
const router = createBrowserRouter([
  {
    element: <WithNav><Outlet /></WithNav>,
    children: [
      {
        path: "/",
        element: <Homepage />
      },
      {
        path: "/characters",
        element: <Characters />
      },
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
    ]
  },
  {
    path: "*",
    element: <Error404 />
  },
])
```

## Dynamic Routes (URL Parameters) with useParams()

Some of you may have used **URL parameters** in your last project. If you didn't, you very likely used parameters in one or more of the endpoints from your API. "Parameters" or "params" refer to dynamic values in the URL that the file being requested can then access. 

On the `Characters.tsx` component, let's make a fetch request to the Rick and Morty API. I have used a combination of [QuickType](https://app.quicktype.io/) and the [Character Schema](https://rickandmortyapi.com/documentation/#character-schema) supplied by the API docs to create some types in my `index.d.ts` in the `@types` folder (I manually create these - Vite doesn't include them in the boilerplate). 

We can then make a small card component to display each character, like what we did for the practice challenge. But instead of opening a model, I'm going to link to a new page. This page will be a single component, but it will recieve the character ID through the params. With that ID, the page will be able to make a fresh fetch request to the API for that specific character.

In my pages folder, I will create a page component to be the landing page for my dynamic route. Then, in my `main.tsx`, I will add a route object for it in my router. I'm going to set the path to `"characters/:id"`. The **colon** ( **:** ) represents a dynamic value in a URL. I could make this a nested route of my "characters" route, but I don't want to mess about the with `<Outlet />`, so I'm going to just use an absolute route to mimic the connection.

```tsx
  {
    path: "/characters/:id",
      element: <Character />
  },
```

Now in the `<Link>` from my character card, I will use template literals or string concatenation to create the path.

```js
<Link to={`characters/${c.id}`} >Learn more..</Link>
```

On the `Character.tsx` component, we can now use React Router's `useParams()` Hook to access that id! If we create a variable to take the return of the hook, we can view all our params. Since we have only one, it's a nice opportunity to **destructure** the return. Now that I've got the ID of the character, I can do a fetch for specifically that character. 

Take care to either verify the ID before doing the fetch, or to add a conditional to catch any errors. In this case, I know that the ID will never be undefined, because if there is no ID, then my usual `"/characters/"` route will apply. But what if your user types something else? If there isn't a response from the API, have some conditional rendering to signal that to the user. 

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

To access the return of this function, we use the `useLoaderData()` Hook on the component. If we comment out our useEffect and log the Hook result to the console, we can see it's the same fetch response we would normally recieve. We can now handle that data how we want. I will still always check for errors, and I will still need to set the types of my response data. 

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