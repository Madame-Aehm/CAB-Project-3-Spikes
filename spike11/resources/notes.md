# Spike 11 notes

## MPA, SPA & PWA

So far, both our projects have been **MPA** (**Multi-Page Applications**). This means our websites have been built with multiple `.html` files that link together. Each time you visit a new page, a request must be sent to the hosting server which will send back the corresponding document. Two other trends for browser websites are **SPA** (**Single-Page Applications**), and **PWA** (**Progressive Web Application**). 

A PWA mimics a native app on a smartphone, opening from the Home screen by tapping an icon, and can be downloaded from app stores. Except that a PWA runs in a browser, meaning there is no installation necessary to use it. 

An SPA is a single `.html` file that dynamically changes based on user interaction. Usually developed with JavaScript, once the single `.html` file and the JavaScript bundle have been downloaded, no other requests to the server are necessary to navigate the app. The page content is re-rendered using DOM manipulation to look like a new page, but underneath is really still the same document. 

[Here](https://neoteric.eu/blog/pwa-vs-mpa-vs-spa-whats-the-best-choice-for-your-app/) is a good breakdown of each Application type.

The Pros of SPA seem to outweigh the Cons, but the biggest obstacle for SPA is making sure your App is compatible for **SEO** (**Search Engine Optimization**). Google crawlers can't just read the content of your pages when your App is empty, so you need to make sure there is meta data available for Google Analytics to rank your App in their search results. The initial load can sometimes also take some time, since the user device downloads the entire App on the first visit. But once this download is complete, using and navigating through the App should be much faster. 

## React

React was developed by Facebook to have live newsfeed updates without needing to update the entire page - isolate just the component that needs updating. The **framework** was released open source in 2013, but has since been redefined as a JavaScript **library**. The difference between a framework and a library is really just that a framework calls the code, but a library is called _by_ the code. We can have a regular vanilla JavaScript App that uses React for only one small component. 

In order to run a React development server, you need to have Node installed. You can check if you already have Node installed by running `node -v` from any terminal. If you get a version number, it's already on your device. If you get an error, you'll need to [install](https://nodejs.org/en) it. 

When you installed Node, it should also have included the [**npm** package manager](https://docs.npmjs.com/about-npm). **Packages** are pre-written code bundles that we can install and use in our project, rather than writing everything from scratch. They can be as simple as a single function, or massively complicated. The package manager keeps all this organised. When you push your code to GitHub, you don't push all the installed packages, you push a `package.json` file which describes all the project's package **dependencies**. If you clone a project, you'll usually have to run `npm install` to install all the packages listed in the repo's `package.json`.

We're going to use a script from [Vite](https://vitejs.dev/guide/) to create our App. You can create a React App manually, but you will need to use some external technology like Webpack and Babel to bundle the JavaScript. Vite will take care of all that for us, we just have to follow their prompts to boilerplate the project. Vite is a fairly new service, if you're looking at old tutorials you might see that programmers used to use the script `npx create-react-app` to create new projects. This still works, but it's no longer actively maintained by Meta and so it is bloated with outdated packages. 

We can now create a new project. Vite will also create a Root folder for your new project, so you just need to navigate to where you'd like to create a new project, then run `npm create vite`, then follow the prompts! If you're prompted to install Vite, do so. **Name** your project, then select **React** from the list of framework options. We're going to give you a small challenge to get used to using React before your full project, so for now just select **JavaScript**. Later, we'll include Typescript.

Vite will have created a folder for you, with a lot of folders and files inside. The terminal also shows instructions to launch the app:

```
cd <app name>
npm install
npm run dev
```








ES7 React/Redux/GraphQL/React-native snippets

A React project is built with JavaScript functions. It can be broken into many smaller components, but they are all just functions returning what we call **JSX**. JSX is a mix of JavaScript and HTML. You can't just return raw HTML elements from a JavaScript function, so JSX was developed to simplify the DOM manipulation. You don't need to manually `document.createElement("h1")` in React, you can simply write your `<h1>` and React will take care of mounting the component. 