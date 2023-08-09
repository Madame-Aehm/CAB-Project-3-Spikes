# Project 3: Spike 2

## MPA, SPA & PWA

So far, both our projects have been **MPA** (**Multi-Page Applications**). This means our websites have been built with multiple `.html` files that link together. Each time you visit a new page, a request must be sent to the hosting server which will send back the corresponding document. Two other trends for browser websites are **SPA** (**Single-Page Applications**), and **PWA** (**Progressive Web Application**). 

A PWA mimics a native app on a smartphone, opening from the Home screen by tapping an icon, and can be downloaded from app stores. Except, a PWA runs in a browser, meaning there is no installation necessary to use it. 

An SPA is a single `.html` file that dynamically changes based on user interaction. Usually developed with JavaScript, once the single `.html` file and the JavaScript bundle have been downloaded, no other requests to the server are necessary to navigate the app. The page content is re-rendered using DOM manipulation to look like a new page, but underneath is really still the same document. 

[Here](https://neoteric.eu/blog/pwa-vs-mpa-vs-spa-whats-the-best-choice-for-your-app/) is a good breakdown of each Application type.

The Pros of SPA seem to outweigh the Cons, but the biggest obstacle for SPA is making sure your App is compatible for **SEO** (**Search Engine Optimization**). Google crawlers can't just read the content of your pages when your App is empty, so you need to make sure there is meta data available for Google Analytics to rank your App in their search results. The initial load can sometimes also take some time, since the user device downloads the entire App on the first visit. But once this download is complete, using and navigating through the App should be much faster. 

## React

A useful extension for VSCode snippets is:  **React/ReduES7x/GraphQL/React-native snippets**.

React was developed by Facebook to have live newsfeed updates without needing to update the entire page - isolate just the component that needs updating. The **framework** was released open source in 2013, but has since been redefined as a JavaScript **library**. The difference between a framework and a library is really just that a framework calls the code, but a library is called _by_ the code. We can have a regular vanilla JavaScript App that uses React for only one small component, but it's mostly used to build full SPAs. 

In order to run a React development server, you need to have Node installed. You can check if you already have Node installed by running `node -v` from any terminal. If you get a version number, it's already on your device. If you get an error, you'll need to [install](https://nodejs.org/en) it. 

When you installed Node, it should also have included the [**npm** package manager](https://docs.npmjs.com/about-npm). **Packages** are pre-written code bundles that we can install and use in our project, rather than writing everything from scratch. They can be as simple as a single function, or massively complicated. If you're using a styling library like Bootstrap, they will offer a React compatible package you can install for your project. The package manager keeps all this organised. When you push your code to GitHub, you don't push all the installed packages, you push a `package.json` file which describes all the project's package **dependencies**. If you clone a project, you'll have to run `npm install` to install all the packages listed in the repo's `package.json`.

We're going to use a script from [Vite](https://vitejs.dev/guide/) to create our App. You can create a React App manually, but you will need to use some external technology like Webpack and Babel to bundle the JavaScript. Vite will take care of all that for us. Vite is a fairly new service, so if you're looking at old tutorials you might see that programmers used to use the script `npx create-react-app` to create new projects. This still works, but it's no longer actively maintained by Meta and so it is bloated with outdated packages. 

We can now create a new project. Vite will also create a Root folder for your new project, so you just need to navigate to where you'd like to create a new project, then run `npm create vite`, then follow the prompts! If you're prompted to install Vite, do so. **Name** your project, then select **React** from the list of framework options. We're going to give you a small challenge to get used to using React before your full project, so for now just select **JavaScript**. Later, we'll include Typescript.

Vite will have created a folder for you, with a lot of folders and files inside. The terminal also shows instructions to launch the app:

```
cd <app name>
npm install
npm run dev
```

The only `.html` file is the `index.html` at the root of the project. This holds a single `<div>` with the `id` property **"root"**. The `src` folder holds your working files, this is where you'll add your app's pages and content. There are two `.jsx` files that exist already: `main.jsx` and `app.jsx`. If we have a look inside each, we'll see that the `main.jsx` is using some React methods to render the content of the `app.jsx` component inside the single root `<div>` on the `index.html`. 

## React Functional Components

React code is broken down into smaller pieces known as [**Components**](https://react.dev/learn/your-first-component). A Component is a **JavaScript function** that returns **JSX** elements to be rendered on the DOM. Breaking long bits of code into Components isn't just for readability, it also means you can isolate the logic linked to that Component (this is especially useful for when you generate elements with loops). 

### JSX

[JSX](https://react.dev/learn/writing-markup-with-jsx) is a mix between HTML and JavaScript. You can't return raw HTML elements from a JavaScript function (you would have to write them as a `string`), so JSX was developed to simplify DOM manipulation. You don't need to manually `document.createElement("h1")` in React, you can simply write your `<h1>` in the return of your Component, and because everything is wrapped inside the React `.render()` method on `main.jsx`, React will create and append it for you.

It's important to remember though, that the return of a function can only return **one** element. If you're returning multiple JSX elements, you'll need to wrap them in a container, such as a `<div>`. Occasionally, we want to seperate multiple elements into a single Component for logic reasons, but an additional `<div>` or `<span>` would mess with our layout or styling. In this case we can use a special React element called a **Fragment**, as `<React.Fragment>` or simply `<>`. 

It's going to make things much easier if you can recognise a React Component as a special type of JavaScript function. We always give Components **Capitalized names** to differentiate them from regular JavaScript functions. When you want to use your Component, it's "called" like an HTML element in the JSX. Look at the `main.jsx` to see how it calls the App Component `<App />`. If you call the `<App />` Component again right underneath, all that content will appear twice. 

In React, you will typically have one Component per file. This is so you can default export the single variable, and it keeps your code organised. But to demonstrate the relationship between Components, we can put some together in a single file. I'll create a second Component in `App.jsx` called App2, and then I'll update the export to include both App and App2. **Default export** means that a file is only exporting a single variable. **export** can be used to export multiple variables grouped togther in curly braces. However you export your variable will be how it needs to be imported on the other end. 

I can now import both as `{ App, App2 }` on `main.jsx` and display both. Alternatively, I can call the `<App2 />` from inside my App Component, and return the export/import to the original state. App2 is now nested inside App. I really recommend having a play with Components and using the Inspector to look at where the elements are rendering.

### Strict Mode

Wrapped around your `<App />` Component on the `main.jsx` is a Component called `<React.StrictMode>`. This is a [debugging tool](https://react.dev/reference/react/StrictMode). It will re-render each Component and re-run Effects an extra time in order to find common bugs caused by impure rendering or missing Effect cleanup (we will cover Effects in the next spike). This only happens in **development mode** - when you build and deploy your app, this behaviour will stop. You will notice this mostly as double console logs. Even though this can be a bit annoying, I recommend leaving it active. 

### Conditional Rendering

JSX let's you write **inline JavaScript** mixed in with your HTML. The syntax uses **curly braces** **{}** to escape into JavaScript at any point in your HTML. This is useful for defining [**conditional rendering**](https://react.dev/learn/conditional-rendering) - if one condition is true, show this element, else show other element. 

A **ternary operator** can function like shortened syntax for an **if... else... statement**. You specify a condition and follow with a **?**, then you define the expression if the condition is **truthy**, followed by a **:** and the expression if the condition is **falsy**. The **&&** operator checks if a condition is truthy, but doesn't require an "else". You can use **{}** in your return to escape into JavaScript and make these checks within your HTML. This will be a very important step when using variables that update (we will cover React State in the next spike). If you try to render, or apply a JavaScript method to a variable of an incompatible type, your code will break. 

### Looping

Since you can escape into JavaScript within the JSX, you can also utilize loops like `.map()` and `.forEach()`. When you're generating many copies of the same element/Component, however, React wants to be able to keep track of them so it requires the **outermost returned element** to have a `key` property. This key **must** be unique on the **page**. If you're only looping once on the page, you know you're safe to use the **index** of each element in the array you're looping over. If you have multiple loops however, then those index values will no longer be unique. Don't forget that looping inside a Component being rendered on that page will also count! If the data items have some unique ID property, this is the best scenario. Otherwise, you can use some **string concatenation**/**template literals** to create your own unique key. 

### Props

**Props** are how you can pass data from one Component to another. This is essentially **Parameters** and **Arguments**, with specific Component syntax. The keyword **props** always exists as a Parameter in React Functional Components. If we log it to the console, it will show an empty object. One default property on the props object is **children**, which refers to any content _between_ the Component's opening and closing tags. We've only been using self-closing Components up until now, but we can test passing data down through the `props.children`.

We can add other properties to the props object by putting them as properties in the opening tag of the Component. You can pass any JavaScript variable as props, including expressions and functions. You're essentially creating the key/value pair to add to the props object when you add a prop to pass into a Component. A shortcut way of accessing the props values is to **destructure** the object.

The reason I like to demonstrate this in a single file is hopefully to help you understand why passing data **downstream** works, but passing data back **upstream** doesn't. You have to think carefully about the structure of your project to make sure all Components that need certain data are able to access it. Later, we'll learn some different ways to pass data that sidestep this limitation, but for this exercise concentrate on where data is coming from, where you're using it, and how it's being passed from A to B. 