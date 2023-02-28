# Spike 17 notes

## Firebase Authentication

- **Firebase** is a Google service, it is effectively a pre-built backend. We will use their [**Authentication** service](https://firebase.google.com/docs/auth?hl=en) to create a user database. We can then use their pre-written functions to create, update, delete, and authenticate users.

- You will need to create an account to use Firebase. From here, you will also have to create a project. On the project overview page, specify that this will be a web app, and register. We will then be presented with instructions to configure Firebase on our app. Install the package, and copy the initialization snippet into a config.js file in the src folder.

- If you would like to keep your API key private, you can use an **.env** file to save custom [environmental variables](https://create-react-app.dev/docs/adding-custom-environment-variables/). The variable name will need to be prefixed with REACT*APP*, and can be accessed with process.env.{variable}. Make sure the .env file is in the root folder (outside the 'src') and is properly recognised by your .gitignore file. ???

- We're now going to set up [Firebase Auth](https://firebase.google.com/docs/auth/web/start). Follow the prompts and add the Auth Config code to our firebase config.js file. Export the **auth** variable, and it can now be imported and logged to the console from the app.js or authContext.js.

- We need to specify to Firebase which authentication methods we want to allow for our project. We'll start with just email/password, but if you choose to implement Google or Facebook log authentication later, you'll need to update that here.

- Now it's as simple as copying and pasting the function! We need an email and password, so we can create a form for the user to input this data. This works best by having a state for each input value. We can then pass the function these values as arguments.
