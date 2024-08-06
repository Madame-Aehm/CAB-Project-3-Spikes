# Project 3: Spike 11

## Firestore Security Rules

Once you're ready to deploy your React App, I recommend taking a look at [**Firestore Security Rules**](https://firebase.google.com/docs/firestore/security/get-started).

When you created your database, you created it in **test mode**. Test mode leaves read and write permission for your database completely public. So long as the correct API keys are included, _any_ Firestore functions will be allowed in _any_ scenario. 

You will probably have written some validation and/or conditionals in your front-end to prevent requests that don't meet your specifications. eg: A comment can only be created by a user (not a visitor), or a user can only delete their own comment. But if you change your code and send the request, any user can actually technically delete any other user's comment! 

Firestore Security Rules will establish some specifications from Firebase's side that will prevent even accidental undesirable requests from being accepted. We can edit these rules from our Firestore Console. From the menu at the top, click **Rules** to see an input and a history of previous rule changes. 

The default testing Rules look like this: 

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2024, 2, 15);
    }
  }
}
```

The first match is always `match /databases/{database}/documents`. This refers to the Firestore database and will prevent your Rules from conflicting with any other Firebase service you have subscribed to. The second match is referring to all documents inside your database. They are allowing all read and write requests, so long as the request is submitted _before_ the specified date. The date is set to 30 days from the day you created the database. If you wish to extend this test period, you can simply edit this date to be further into the future. 

**read** requests refer to requests to **get** data, but not change it in any way. It can be further broken down into **get** (single document) and **list** (multiple documents). **write** refers to requests to alter documents in some way. It can be further broken down into **create**, **update** and **delete**. See more about [basic](https://firebase.google.com/docs/firestore/security/rules-structure#basic_readwrite_rules) and [granular](https://firebase.google.com/docs/firestore/security/rules-structure#granular_operations) operations. 

My app uses one collection: "comments". 

My comments collection is open to be **read** by anybody. I first need to [match](https://firebase.google.com/docs/firestore/security/get-started#writing_rules) the path of my collection, then I can allow **read** with no conditions:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /comments/{comment} {
    	allow read
    }
  }
}
```

Since I don't have any nested collections, this is fine. If you have nested collections, be aware that the rules applied to the parent do not trickle down and automatically apply to the children. You will need to nest matches to handle each sub-collection, or you can use a [recursive wildcard](https://firebase.google.com/docs/firestore/security/rules-structure#recursive_wildcards).

I only want to allow users to **create** comments, so I'm going to have to use a [condition](https://firebase.google.com/docs/firestore/security/rules-conditions), and I only want the user that created the comment to be allowed to **delete** it, so I'm going to have to write separate rules for each scenario. I can access the UID of the current user (if there is one!) through [**request.auth**](https://firebase.google.com/docs/firestore/security/rules-conditions#authentication). I can also access properties on targeted document through [**resource.data**](https://firebase.google.com/docs/firestore/security/rules-conditions#data_validation). I just then need to do some comparisons (I saved the UID of the user under the userId property on the comment when I created it):

```
  match /databases/{database}/documents {
    match /comments/{comment} {
    	allow read
      allow create: if request.auth != null;
      allow delete: if request.auth.uid == resource.data.userId;
    }
  }
```

<!-- For my favourites collection, I want to set both read and write Rules to restrict access to only the user the document belongs to. When a new user signs up to my app, in the same step I also create for them a document in the "favourites" collection. I give this document the same name/ID as the user's UID. This will make my comparisons very simple, once I've matched to the right path:

```
match /favourites/{userId} {
  allow read, write: if request.auth.uid == userId;
}
``` -->

Consider how your users are interacting with your data, and write some rules to prevent accidental (or malicious!) undesirable requests from getting through.

## Deploy prep

Our previous projects were all **static** websites, but React uses JavaScript in a way that makes it dynamic. Deploying can take a few extra steps, but it is still all only front-end technology, so deploying it for free on services like GitHub Pages, Netlify, Vercel or Render is possible. 

The first thing to note, before you can deploy your React App on any platform, it _must_ be able to build correctly. To test this, you can build it locally by running:

```
npm run build
```

If it fails, you will be given a list of errors to address. These will mostly be Typescript warnings, or unused variables. Fix them, and try again! When your build is successful, a new folder called "dist" will appear at the root of your project. If you look inside, you'll see that this is your `index.html`, any public assets (eg. icons, static images), and a large `.js` and `.css` file. This is all your components and React functionality compiled into regular JavaScript! 

This folder should already be included in the `.gitignore` (Vite does this automatically). Commit and push so GitHub has the newest version without any errors. 

## Deploy with Firebase Hosting

Since we used Firebase as a service to build this project, it makes sense that we deploy our project with [**Firebase Hosting!**](https://firebase.google.com/docs/hosting/quickstart) I used [this](https://medium.com/@rajdeepmallick999/vite-firebase-how-to-deploy-react-app-5e5090730147) article as a guide.

**Note**: since Firebase Hosting is really only designed for static sites, there isn't anywhere to store values for the `.env` file. You'll have to put the config keys as strings directly. So long as security rules have been established, this is what Firebase intended. If you have any other variables that have to be stored in an `.env` file, you'll need to investigate Firebase [Cloud Functions](https://firebase.google.com/docs/functions/config-env?gen=2nd).

You will first have to install the **Firebase CLI** (command line interface). We do this globally, so we can then run Firebase scripts from our terminal in any folder (mac users might have to precede script with `sudo`):

```
npm install -g firebase-tools
```

We then need to login to Firebase from our device, so from the terminal run:

```
firebase login
```

You will be prompted to visit a page, either copy the URL or <kbd>Ctrl</kbd> + click to open it. Login to give the CLI access to your account. You will need to agree to Google's data collection terms and conditions. 

You can now initialize Hosting in your project. Make sure you're in your project root directory and run:

```
firebase init
```

You will be prompted if you are ready to proceed. Yes (y) you are! From the list, you're going to go down to **Hosting: Configure files for Firebase Hosting** and click <kbd>spacebar</kbd> to select. Then <kbd>enter</kbd> to proceed. We want to use our Existing Project, so select `Use an existing project`, then select your Project from the list (unless you created multiples, you'll probably only have the one). 

We then need to tell Firebase where to find our build folder. This is referring to the folder that is generated when we ran the build script earlier. For Vite, it is `dist`. Older boilerplates of React used `public`, so make sure to replace this value with `dist` before moving to the next step. We then want to say `Yes` to Configure as a single-page app (rewrite all urls to /index.html). This is the step that might give you trouble if you try to deploy on another platform! 

We want to accept all prompts that suggest connecting this deployment to our GitHub. This will create a pipeline wherein whenever we push new changes to our deployment branch, Firebase will automatically redeploy with the most recent changes. 

You will need to give a path to your repo which will look like YourGitHubUsername/RepositoryName. Easiest way is to go to GitHub, open the repo, and take it directly from the URL.

You'll also need to specify which branch you would like to deploy. If you're happy to use the `main` branch, just click <kbd>enter</kbd>. 

Finally, if you've still got the `dist` folder, you might be asked whether Firebase should overwrite this when it runs `ci install && npm run build`. **No, we don't want that!** Now deploy by running: 

```
firebase deploy
```

Commit and push all changes to GitHub. It will sometimes take a few minutes for the live version to build and deploy, but you should now be able to visit your console on Firebase and then under Hosting, visit your app from one of the default domains. 

## Deploy with GitHub Pages

To deploy a React App with **GitHub Pages**, follow the steps in [this](https://dev.to/rashidshamloo/deploying-vite-react-app-to-github-pages-35hf) guide.

They've just forgotten to also include that you will also need to also add a `homepage` property to the `package.json`, which will be the the url GitHub uses to host your app: `https://<yourGitHubUsername>.github.io/<yourProjectRepoName>`. eg:

```json
{
  "homepage": "https://madame-aehm.github.io/raccoons-ts-react/"
}
```

You will also need to replace your **Browser Router** with a **Hash Router**. They are functionally almost identical, so nothing else will need to change, just replace `createBrowserRouter()` with `createHashRouter`. This is just to retain the SPA functionality with GitHub Pages, if you deploy your app in any other way, you should keep the Browser Router. 

## Deploy with Netlify

From your Overview, you can click **Add new site** and **Import an existing project**. We want to **Deploy with GitHub** (if you haven't already authorized Netlify to access your GitHub, you will be prompted to do so now). Select your repository. You'll then need to review the configuration.

Select your **branch**, and if your project is in a sub-folder on your repo, you will have to add that sub-folder as the **base directory**. Our **build command** will be `npm run build`. 

**Note:** A React App created with `create-react-app` can sometimes fail the build because of warnings from the outdated packages. If there is a problem, try changing the **Build command** under the **Build & Deploy** settings to `CI=false npm run build`. Normally, a warning would be enough to cause the build to fail, but CRA uses so many outdated packages, it's impossible to resolve all warnings. This script tells Netlify to ignore those warnings and build anyway. 

The **publish directory** will be the name of the folder created when you run `npm run build`. For Vite projects, this is `dist`, for CRA it is `build`.

You will also need to add all your **environment variables**.

When deploying a single page application that utilizes React Router, an extra step needs to be taken to insure the hosting service knows what to do when you refresh on a page other than the landing page. The usual behaviour of a website when you refresh, is to check the URL and then make a request for the `.html` file that should be hosted at that path. However, for a single page application built with a framework like React, there is only **one** `.html` file, so we need to tell the hosting service to always go to the `index.html`, then JavaScript will do the rest! 

On Netlify, we can create a `_redirects` file. We will put this in our `public` folder, since we want it to always be open for our hosting service to easily access and read. Inside the `_redirects` file, paste:

```
/*  /index.html  200
```

`/*` represents every URL - you're telling it on any URL path, redirect to `/index.html` and send a positive `200` status. This should apply for all hosting platforms. 

Netlify will generate a random name which will be used as your URL. If you wish to customize this, you can do this in **Site Configuration**, under **General Site Settings**. 

## Deploy with Vercel

From your Dashboard Overview, click **Add New...** and select **Project**. **Import** your repository, then review the configuration. You can rename your project, and check the correct framework has been identified. If your project is in a sub-folder on your repo, you will have to add that sub-folder as the **root directory**. The build settings should be automatically configured to match your framework, but you will still need to manually add your **environment variables**. 

When deploying a single page application that utilizes React Router, an extra step needs to be taken to insure the hosting service knows what to do when you refresh on a page other than the landing page. The usual behaviour of a website when you refresh, is to check the URL and then make a request for the `.html` file that should be hosted at that path. However, for a single page application built with a framework like React, there is only **one** `.html` file, so we need to tell the hosting service to always go to the `index.html`, then JavaScript will do the rest!

On Vercel, we can create a `vercel.json`, this will be in the root folder. Inside, paste:

```json
{
  "routes": [{
    "src": "/[^.]+",
    "dest": "/",
    "status": 200
  }]
}
```

## Deploy with Render

On your dashboard, click **New +** and select **Static Site**. **Connect** your repository, then review the configuration.

You will need to choose a **name** for your project, select the **branch** to be deployed, and if your project is in a sub-folder on your repo, you will have to add that sub-folder as the **Root Directory**. The **Publish Directory** will be the name of the folder created when you run `npm run build`. For Vite projects, this is `dist`, for CRA it is `build`. Add your **environment variables**. 

When deploying a single page application that utilizes React Router, an extra step needs to be taken to insure the hosting service knows what to do when you refresh on a page other than the landing page. The usual behaviour of a website when you refresh, is to check the URL and then make a request for the `.html` file that should be hosted at that path. However, for a single page application built with a framework like React, there is only **one** `.html` file, so we need to tell the hosting service to always go to the `index.html`, then JavaScript will do the rest!

On Render, you can do this under **Redirects/Rewrites**. We have to write a [rule](https://docs.render.com/deploy-create-react-app#using-client-side-routing) for Client-Side Routing. They have some good [documentation](https://render.com/docs/redirects-rewrites) on how to define these rules. We are just going to add one **Rewrite**, where the **Source** will be `/*` and the **Destination** will be `/index.html`. 
