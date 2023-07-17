# Spike 15 notes

## React Router Continued...

### Nested Routes

We've seen how to build some flat routes, but it's also possible to nest routes inside each other. Each route object in our BrowserRouter array can also accept a property `children`, which will be another array of routes! As an example, let's create an `<About />` component to be rendered at `"/about"`. I have two themes I want to cover in my about section: about the company, and about the developer, so I would like to show different components at `"/about/dev"` and `"/about/company"`. 

I'll need components for all of them. Here you have to decide how you want your navigation to be structured. Do you want there to be 3 pages, or only 2? Add a new path with children to the routes tree.

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

If we visit the nested routes, however, we're still only seeing the main route. 







 Let's use our Characters page as an example, and create a nested route for single character by ID.

```js
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Error404 from "./pages/Error404";
import About from "./pages/About";
import AboutDev from "./pages/AboutDev";
import AboutApp from "./pages/AboutApp";

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Homepage /> } />
      <Route path="*" element={ <Error404 /> } />
      <Route path='about' element={ <About /> }>
        <Route path='dev' element={ <AboutDev /> } />
        <Route path='app' element={ <AboutApp /> } />
      </Route>
    </Routes>
  );
}
```
- This will create valid paths for 'about/dev' and 'about/app'. If we visit those routes now, though, we're still only going to see the About component. The last step is to put React Router's **&lt;Outlet /&gt;** component onto our About page component. This will render the element linked to the sub-path! You can use it to add sub-content to your About page.

- Say, though, that we want to replace the entire page content. We don't want to see the initial About component's content when we're visiting a sub-route. One possible way around this is React Router's **useLocation** hook. We can get information about the current page by assigning it to a variable, and logging it to the console. One property is **pathname** - this shows you the current page URL. We can then do some conditional rendering, when we're on one of our sub-routes, we will render the **&lt;Outlet /&gt;** component, but if we're not, then we can show the base About page content.

- If you've chosen to use **&lt;NavLink&gt;** components in your navigation bar, you'll notice that your parent path stays active even on the sub-routes. If you want to prevent this default behaviour, simply apply the NavLink property **end**. eg:

```js
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <NavLink className={({ isActive }) => isActive ? "active" : null} to={"/"}>Home</NavLink>
      <NavLink className={({ isActive }) => isActive ? "active" : null} to={"/about"} end>About</NavLink>
    </nav>
  )
}
```

### Dynamic Routes (URL Parameters)

- Some of you may have used **URL parameters** in your last project. If you didn't, you also very likely used them one or more of the endpoints from your API. This refers to dynamic values that the file being requested can then access. 

- On the homepage of our app, let's make a fetch request to the Rick and Morty API. We can make a small card component to display each character, like what we did for the practice challenge. But instead of opening a model, I'm going to link to a new page.

- In my pages folder, I will create a page component to be the landing page for my dynamic route. Then, in my App.js, I will link it to a new **&lt;Route&gt;**. I'm going to set the path to **"character/:id"**. ie:

```js
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Error404 from "./pages/Error404";
import Character from ".pages/Character";

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Homepage /> } />
      <Route path="*" element={ <Error404 /> } />
      <Route path="character/:id" element={ <Character /> } >
    </Routes>
  );
}
```

- The colon **( : )** is React Router's way of referring to the URL parameters. The path is 'character', then we're seperating the params with a **slash** **( / )**. The 'id' is arbitrary, much the same as parameters for a function. I can now set the path on my **&lt;Link&gt;** to take me to the 'character' path, but I am going to substitute the ':id' in the URL for the id of my character. I could do this with a plus, to add two strings together, or I can use **template literals**.

```js
<Link to={`character/${c.id}`} >Learn more..</Link>
```

- On the component that is our Character page, we can now use React Router's **useParams()** hook to access that id! If we create a variable to take the return of the hook, we can now view all our params. Since we have only one, it's a nice opportunity to **destructure** the return. Now that I've got the ID of the character, I can do a fetch for specifically that character. 

- Take care to either verify the ID before doing the fetch, or to add a conditional to catch any errors. If there isn't a response from the API from the parameters, have some conditional rendering to signal that to the user. 