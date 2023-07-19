# Spike 17 notes

## Firebase Set-up

**Firebase** is a Google service, it is effectively a pre-built backend. We will use their [**Authentication** service](https://firebase.google.com/docs/auth?hl=en) to create a user database. We can then use their pre-written **CRUD** functions to **create**, **read**, **update**, **delete** authenticated users.

You will need to create an account to use Firebase. From here, you will also have to create a project. We're not going to need Google Analytics for this project, so I will disable that.

In the Project Overview, you'll be prompted to add Firebase to your App. We're building a Web App, so click on the **`</>`** button. Give your App a nickname, and since we're not going to cover Firebase Hosting, so you can leave that checkbox unchecked, then click **Register app**. Paste `npm install firebase` into your terminal to install the package (make sure you're at the root of your project!). 

Once your package has installed, create a file called `firebaseConfig.ts` in the project `src` folder. Then copy and paste the initialization code from the overview into that file. To test whether this has worked, you can export the `app` variable, import it into another component, and log it to the console.

Firebase API keys are _not_ used to control access to backend resources. Usually, you need to fastidiously guard API keys, however API keys for Firebase services are ok to include in code or checked-in config files. If you use password-based Firebase Authentication and someone gets hold of your API key, they will _not_ be able to access any of your Firebase project's database or Cloud Storage data as long as this data is protected by [Firebase Security Rules](https://firebase.google.com/docs/rules). They could, however, use your API key to access Firebase's authentication endpoints and make authentication requests against your project. 

If you already have an `.env` file for your project, you can put your Firebase API key there, but it's not necessary. Vite env variables used in your React Frontend must be preceded by `VITE_`, and when used throughout your app `import.meta.env.VITE_`. You will need to assert the type in React. Any changes made to the `.env` file won't be recognised until you restart the development server.

## Firebase Authentication

Now that Firebase is recognised through our App, we can choose some Firebase products to add. We're going to start with **Authentication**. This will create a database on Firebase of users, but we let Google do all the work authenticating credentials and keeping data secure and organised. We can just use their pre-written functions from the App.

Click the **get started** button on the Authentication page. Here you can select which sign-in methods you are going to allow for your App. We're going to start with just **Email/Password**, click on the option and **Enable** with the checkbox. If you have time later, you can try to add a Google or Facebook log in! 

The [getting started](https://firebase.google.com/docs/auth/web/start) for web apps documentation page has steps we can follow to add the **auth** product to our `firebaseConfig.ts` file. Export the `auth` variable as we'll need to import and use it in other components.

Now we'll need a page to log in or register our users from. I'm going to replace that fake login button I created with a link to a page with a form. I'll also create a state to hold the value of each input, as I want my values to be [controlled](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable). 

In the past, we've created seperate handler functions to call in the `onChange` event. This can make for neater code, but one major downside is that the event's type cannot be inferred. If you choose to do this, and you need to pass the event, either to get the `target.value` or to call `preventDefault()`, you'll need to manually apply a [strict event type](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/) in the parameters of your function. 

Once I have my forms/inputs and my states ready, I can copy and paste the [sample code](https://firebase.google.com/docs/auth/web/password-auth#create_a_password-based_account) from Firebase and create a function to sign up new users. Instead of using the `getAuth()` method, we can use the `auth` variable that we exported from our config. Import it here, and use it instead of the auth variable in the sample code. In the `createUserWithEmailAndPassword()` function, we'll also need to replace the **email** and **password** arguments with the state variable holding the relevant data. 

Log the result of this function to the console, and now if you fill in and submit the form, you should see your new user! If you check your **users** submenu in the **Authentication overview** over on Firebase, you should see your new user in the table. Firebase also considers user registration and user login as a single step, so after you've logged your new user to the console, we can set our `user` state to this value. Since we set up our `user` to be a `boolean` while we were still just testing, we're going to have to rewrite some things. Luckily, Firebase include a type `User` that we can import and apply instead. 

Firebase keeps a record of active sessions across devices, and registering a new user automatically logs them into a session. If you refresh your app though, all your states will return to their default values. Conveniently, Firebase provide us with a handy function `onAuthStateChanged` to check if there is an active session. This should be the first thing your app does when it starts - so call it from a `useEffect` in the `AuthContext`. There won't be any need to update the type or default value, since we don't need to share this function (just the result!). If the function returns a user, set your user state to this value.

```ts
  const getActiveUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("active user", user);
        setUser(user);
      } else {
        console.log("no active user");
      }
    });
  }

  useEffect(() => {
    getActiveUser();
  }, [])
```



We will be using the result of Firebase's **signInWithEmailAndPassword** function to set our user state on our AuthContext, so it makes the most sense to write the function there. Copy and paste the sample code to sign in existing users from Firebase into our logIn function (it will need to take email and password parameters, since this information isn't available on the AuthContext), make the same changes to the code that we needed to make for the register function. The last step, will be to set the state of our **user** variable to the returned user!

- Call this function (after using **useContext** hook to access it) from in the submitLogin function. Pass the loginEmail and loginPassword state variables as arguments. Our user can now log in! Make sure to give them some visual signal that they've logged in, such as an alert, or redirecting them to the homepage. 




- Last thing our user will need to do is log out! At the moment, our logOut function just sets the user back to 'null'. We still need to tell Firebase when a user logs out. The documentation provides a very simple **signOut** function hidden on the [password-auth page](https://firebase.google.com/docs/auth/web/password-auth). 

- It's worth deliberately making a few log in/register mistakes to see what Firebase sends back for errors. You can then create some error handling - always communicate to the user when there has been a problem. You can also validate in your React whether or not the form meets what you know to be Firebase's requirements, for example the password must be at least 6 characters, or an email must contain an **@** symbol. Rather than letting Firebase send you an error, you could prevent a pointless request by checking that these requirements are met _before_ even attempting to run the Firebase function.

- If you're interested in adding further functionality, check out the documentation for [managing users](https://firebase.google.com/docs/auth/web/manage-users). Here, you'll find functions to add, update, delete and more.
