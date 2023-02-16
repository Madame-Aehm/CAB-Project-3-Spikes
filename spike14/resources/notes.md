## Spike 14 notes

## React Router

- **React Router** is React's answer to "pages". React is a single page application, which means that it's really only a single index.html file which we then use JavaScript to fill dynamically. React Router let's you set "routes" that will render specific page components when that route is visited. 

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
- We can manually put this component into every page, but if we instead put it on the App.js file outside the **&lt;Routes&gt;** component, you'll notice that it will be on every page. 

- Another way to navigate between pages is to use React Router's useNavigate hook/Navigate component. These are the same thing, React Router have just given us two ways to access the same functionality. Let's experiment by using the Navigate component to navigate away from our Error page. If you include the props **replace={true}**, it was remove the error page from the history. Now, if you click the back button on the browser after being redirected, you won't be taken back to the error page.

- This all happens incredibly fast, it might be confusing for the user to just end up back on the homepage when they though they were going somewhere else. We could give our redirect a timeout! Create a state to hold the redirect status: true or false. Then we can use a timeout function to set it to true after the time has elapsed. We'll then have our **&lt;Navigate&gt;** component render only when the redirect state is true. Alternatively, you can create a variable to hold the useNavigate hook functionality, then call this function after your timeout has elapsed. You could even include a countdown! 

- It's also possible to nest routes inside each other. Let's use our About page as an example, and create one sub-route for 'about the app developer', and one for 'about the app content'. So far, we've been self-closing our **&lt;Route&gt;** componenets. If we create seperate opening and closing tags for our About route, we can then nest sub-routes inside. You can even create a sub-index, and a sub-404 within the parent **&lt;Route&gt;**. eg:

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

- We could then create an in-app back button using the **useNavigate** hook. Create a variable to hold the function, then call it on an onClick event - but instead of putting a path, if we put -1, we will be directed to the previous page in the history. eg:

```js
<button onClick={() => navigate(-1)}>Back...</button>
```
