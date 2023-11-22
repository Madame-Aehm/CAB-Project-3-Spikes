# Project 3: Spike 11

## Deploy React App

Our previous projects were all **static** websites, but React uses JavaScript in a way that makes it dynamic. Deploying can take a few extra steps, but it is still all only front-end technology, so deploying it for free on services like GitHub Pages, Netlify, Vercel or Render is possible. 

To deploy a React App with **GitHub Pages**, follow the steps in [this](https://dev.to/rashidshamloo/deploying-vite-react-app-to-github-pages-35hf) guide.

**Netlify** should accept a React App created with Vite and deploy it without issue. A React App created with `create-react-app` can sometimes fail the build because of warnings from the outdated packages. If there is a problem, try changing the **Build command** under the **Build & Deploy** settings to `CI=false npm run build`. 

When deploying a single page application that utilizes React Router, an extra step needs to be taken to insure the hosting service knows what to do when you refresh on a page other than the landing page. The usual behaviour of a website when you refresh, is to check the URL and then make a request for the `.html` file that should be hosted at that path. However, for a single page application built with a framework like React, there is only **one** `.html` file, so we need to tell the hosting service to always go to the `index.html`, then JavaScript will do the rest! 

To do this we can create a `_redirects` file. We will put this in our `public` folder, since we want it to always be open for our hosting service to easily access and read. Inside the `_redirects` file, paste:

```
/*  /index.html  200
```

`/*` represents every URL - you're telling it on any URL path, redirect to `/index.html` and send a positive `200` status. This should apply for all hosting platforms. 

If you would prefer to configure more specifically, you can create a `vercel.json` and/or a `netlify.toml` to configure rewrite rules for each hosting service, or add [rewrite rules](https://render.com/docs/redirects-rewrites) from the **Redirects/Rewrites** dashboard on Render. (Render all does a nice job of defining the difference between a **rewrite** and a **redirect**).
