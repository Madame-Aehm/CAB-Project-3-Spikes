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

- Each Route takes a few props: the **path** (ie, the URL address), and the **element** (ie, the main page level component to be rendered). For the main landing page of the app, we can set the path to **"/"** (this is like index.html) and then I will put my Homepage.js component as the element. eg:

```js
import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage"

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Homepage /> } />
    </Routes>
  );
}
```

- Create a route with a path "/about" to display your About component. Now, if you put "localhost:3000/about" as the URL, you will see your About page component instead of the Homepage component. 

- You can create as many routes as you need for each page you would like to have. But what happens if you try to visit a URL path with no page element linked? It's blank.. So we can create a **catch all** route that leads to a **404** error page, using an **asterix symbol** **( * )** as the path. This catches any URL route that doesn't have a set path. eg:

```js
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
