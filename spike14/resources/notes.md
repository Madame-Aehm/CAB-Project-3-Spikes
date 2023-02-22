# Spike 14 notes

## React Router Intro

- **React Router** is React's answer to "pages". React is a single page application, which means that it's really only a single index.html file which we then use JavaScript to fill dynamically. React Router lets you set "routes" that will render specific page components when that route is visited. 

- React router isn't included in the initial npx create-react-app package, so we'll start by installing it through the terminal:
```
npm install react-router-dom
```

- We're following the [documentation](https://reactrouter.com/en/v6.3.0/getting-started/overview) for a slightly older version, until the newest version is finalized. Feel free however, to Google and read through the newest version release notes! Also be aware there were some really big changes between React Router V5 and V6 - we're using V6! If you're looking for solutions online, make sure the version is correct or you could have problems.

- First we will be importing the **BrowserRouter** component from "react-router-dom". It's best to do this at the highest level possible, so we'll import it into our index.js file and wrap it around the **App** component. Think of BrowserRouter as the component that connects your app to the URL.

- Next we need to import the **Routes** and **Route**. Think of Routes (plural) like a container for all our Route (singular) components. We should do this on our App.js file. Instead of returning a div, we will return our routes, so the URL will determine which of the "pages" are being rendered. 

- Let's make some "pages", so we have something to show when we're testing if our routes are working. I'll start by making a folder in the **src** to hold all my page components. You can call this **pages**, **views**, or **routes**. Whatever is most clear for you. Inside, make at least two functional components: Homepage.js and About.js. If you've installed the **E7 React/Redux/React-Native snippets** extension, you can use **rfce** to boilerplate a React Functional Component. Return a simple **&lt;div&gt;** with an **&lt;h1&gt;** to show your location. 

- Each Route takes a few props: the **path** (ie, the URL address), and the **element** (ie, the main page level component to be rendered). For the main landing page of the app, we can set the path to **"/"** or apply the **index** property and then I will put my Homepage.js component as the element. eg:

```js
import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage"

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Homepage /> } />
      // <Route index element={ <Homepage /> } /> // alternative
    </Routes>
  );
}
```

- Create a route with a path "/about" to display your About component. Now, if you put "localhost:3000/about" as the URL, you will see your About page component instead of the Homepage component. 

- You can create as many routes as you need for each page you would like to have. But what happens if you try to visit a URL path with no page element linked? It's blank.. So we can create a **catch all** route that leads to a **404** error page, using an **asterix symbol** **( * )** as the path. This catches any URL route that doesn't have a set path. eg:

```jsx
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Error404 from "./pages/Error404";

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Homepage /> } />
      <Route path="*" element={ <Error404 /> } />
    </Routes>
  );
}
```

- Now we just need to build a navigation bar. This will also be slightly different to your static projects, because in React an  **&lt;a&gt;** element causes a hard refresh on the page. We don't want that - it defeats the purpose of React's state management system! Luckily, React Router gives us some options. Let's create a folder to hold our components, and create a component called Navbar.

- There is a pre-made **&lt;Link&gt;** component that we can import from "react-router-dom". This Link will accept a **to** props, which will be our pathname/source. eg:

```js
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  )
}
```
- We could manually put this component into every page, but if we instead put it on the App.js file outside the **&lt;Routes&gt;** component, you'll notice that it will be on every page. 

- Some data can be transferred through the Link component, which accepts a prop called **state**. Whatever is passed as state props, can then be access on the recieving end (ie. the path component) by using React Router's **useLocation()** hook. We can get information about the current page by assigning the return of this hook to a variable, and logging to the console.

- This location object also holds a property called **pathname**. We can use this to indicate to our user which page they're on in React. Since the same component is rendered across multiple pages, the pathname shows you the current page URL. We can then create some conditional style or className attributes on our **&lt;Link&gt;** component. A nice clean way to do this is to use a **Ternary Operator**. Think of this as a shorter way of writing an if.. else.. statement! The first 'statement' is the 'if' followed by a **question mark** ( **?** ), and the value to be supplied if that statement is _true_. This is then followed by a **colon** ( **:** ), and the value to be supplied if the initial statement is _false_. eg:

```js
import { Link } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  return (
    <nav>
      <Link to="/" className={ location.pathname === "/" ? "active" : null }>Home</Link>
      <Link to="/about" className={ location.pathname === "/about" ? "active" : null }>About</Link>
    </nav>
  )
}
```

- Another way to achieve the same result is to use a different component supplied by React Router called **&lt;NavLink&gt;**, which has an active class without the need for useLocation. It needs to be imported from 'react-router-dom', and can then be applied in almost the exact same way as a regular **&lt;Link&gt;**, except that instead of an expression, our className/style property will take a function. This function recieves a parameter which will be true or false according to the active state. We can then use a Ternary Operator to either return our string/inline style or null. eg:

```js
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <NavLink className={({ isActive }) => isActive ? "active" : null} to={"/"}>Home</NavLink>
      <NavLink className={({ isActive }) => isActive ? "active" : null} to={"/about"}>About</NavLink>
    </nav>
  )
}
```

- React Router's useNavigate hook/Navigate component can also be used to navigate between pages. These are the same thing, React Router have just given us two ways to access the same functionality. Let's experiment by using the useNavigate hook function component to create a back button from our Error page. If you include the props **replace={true}**, it will remove the error page from the history. Now, if you click the back button on the browser, you won't be taken back to the error page. eg:

```js
import { useNavigate } from "react-router-dom";

function Error404() {
  const navigate = useNavigate()
  return (
    <div>
      <h1>Error404</h1>
      <button onClick={() => navigate(-1)}>Back...</button>
    </div>
  )
}

export default Error404
```

- Or, if we want to redirect our user automatically, we can call the function in a useEffect. Alternatively, to achieve the same result using the **&lt;Navigate&gt;** component, put the component into our return (the same as any other component) and set the **to** props to the path we want to redirect to. eg:

```js
import { Navigate } from "react-router-dom";

function Error404() {
  return (
    <Navigate to={"/"} replace={true} />
  )
}

export default Error404
```

- This all happens incredibly fast though, and it might be confusing for the user to just end up back on the homepage when they though they were going somewhere else. We could give our redirect a timeout! Create a state to hold the redirect status: true or false. Then we can use a timeout function to set it to true after the time has elapsed. We'll then have our **&lt;Navigate&gt;** component render (or navigate function invoke) only when the redirect state is true. You could even include a countdown! 
