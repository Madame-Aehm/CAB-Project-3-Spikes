## Spike 15 notes

## Dynamic and Nested Routes

- We've seen how to build some flat routes, but it's also possible to nest routes inside each other. Let's use our About page as an example, and create one sub-route for 'about the app developer', and one for 'about the app content'. So far, we've been self-closing our **&lt;Route&gt;** componenets. If we create seperate opening and closing tags for our About route, we can then nest sub-routes inside. You can even create a sub-index, and a sub-404 within the parent **&lt;Route&gt;**. eg:

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

- Say, though, that we want to replace the entire page content. We don't want the initial About component's content there when we're visiting a sub-route. One possible way around this is React Router's **useLocation** hook. We can get information about the current page by assigning it to a variable, and logging it to the console. One property is **pathname** - this shows you the current page URL. We can then do some conditional rendering, when we're on one of our sub-routes, we will render the **&lt;Outlet /&gt;** component, but if we're not, then we can show the base About page content.

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

