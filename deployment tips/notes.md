# Project 3: Spike 11

## Deploy React App

Our previous projects were all **static** websites, but React uses JavaScript in a way that makes it dynamic. Deploying can take a few extra steps, but it is still all only front-end technology, so deploying it for free on services like GitHub Pages and Netlify is possible. 

**Netlify** should accept a React App created with Vite and deploy it without issue. A React App created with `create-react-app` can sometimes fail the build because of warnings from the outdated packages. If there is a problem, try changing the **Build command** under the **Build & Deploy** settings to `CI=false npm run build`.

To deploy a React App with **GitHub Pages**, follow the steps in [this](https://dev.to/rashidshamloo/deploying-vite-react-app-to-github-pages-35hf) guide.