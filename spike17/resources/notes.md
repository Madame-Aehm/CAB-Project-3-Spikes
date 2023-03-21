# Spike 17 notes

## Firebase Set-up

- **Firebase** is a Google service, it is effectively a pre-built backend. We will use their [**Authentication** service](https://firebase.google.com/docs/auth?hl=en) to create a user database. We can then use their pre-written functions to create, update, delete, and authenticate users.

- You will need to create an account to use Firebase. From here, you will also have to create a project. We're not going to need Google Analytics for this project, so I will disable that.

- In the Project Overview, you'll be prompted to add Firebase to your App. We're building a Web App, so click on the **&lt;/&gt;** button. Give your App a nickname, and since we're not going to cover Firebase Hosting, so you can leave that checkbox unchecked, then click **Register app**. Paste **npm install firebase** into your terminal to install the package (make sure you're at the root of your project!). 

- Once your package has installed, create a file called **firebaseConfig.js** in the project **src** folder. Then copy and paste the initialization code from the overview into that file. To test whether this has worked, you can export the **app** variable, import it into another component, and log it to the console.

## Firebase Authentication

- Now that Firebase is working through our App, we can choose some Firebase products to add. We're going to start with **Authentication**. This will create a database on Firebase of users, Google will do all the work authenticating credentials and keeping data secure and organised. We can just use their pre-written functions to create, update, and delete users from the App.

- Click the **get started** button on the Authentication page. Here you can select which sign-in methods you are going to allow for your App. We're going to start with just **Email/Password**, click on the option and **Enable** with the checkbox. If you have time later, you can try to add a Google or Facebook log in! 

- The [getting started](https://firebase.google.com/docs/auth/web/start) for web apps documentation page has steps we can follow to add the **auth** product to our firebaseConfig.js file. Export the **auth** variable as we'll need to import and use it in other components.

- Now we'll need a page to log in or register our users from. I'm going to replace that fake login button I created with a link to a page with a form. I'll also create a state to hold the value of each input. 

- From here I can copy and paste the sample code from Firebase to sign up new users. Instead of using the **getAuth()** method, we can use the **auth** variable that we exported from our config. Import it here, and use it instead of the auth variable in the sample code. In the **createUserWithEmailAndPassword()** function, we'll also need to replace the **email** and **password** with the state variable holding the relevant data. 

- Log the result of this function to the console, and now if you fill in and submit the form, you should see your new user! If you check your users in the Authentication overview over on Firebase, you should see your new user in the table. Firebase doesn't automatically log in the user once they've been created. This is an extra step you can add to your register submit function if you want, or we can prompt our user to now log in using the login form.

- We will be using the result of Firebase's **signInWithEmailAndPassword** function to set our user state on our AuthContext, so it makes the most sense to write the function there. Copy and paste the sample code to sign in existing users from Firebase into our logIn function (it will need to take email and password parameters, since this information isn't available on the AuthContext), make the same changes to the code that we needed to make for the register function. The last step, will be to set the state of our **user** variable to the returned user!

- Call this function (after using **useContext** hook to access it) from in the submitLogin function. Pass the loginEmail and loginPassword state variables as arguments. Our user can now log in! Make sure to give them some visual signal that they've logged in, such as an alert, or redirecting them to the homepage. 

- If we refresh the page though, you'll notice that your user is logged back out. React sets the user state when the page initally renders, so on a refresh, your user variable is being set back to the default state of 'null'. Firebase, however, still considers the user to be logged in! A function **onAuthStateChanged** will check whether a user is logged in (at the Firebase level), you can set up a useEffect to call this function on the first render and update your user variable based on the result.

- Let's write a function on our **AuthContext** to do this. We can call it something like 'checkForUser'. Under the subheading 'Set an authentication state observer and get user data' in the Firebase documentation, we'll take this function and apply it inside our own function. Now create a useEffect to run it on the first render.

- Last thing our user will need to do is log out! At the moment, our logOut function just sets the user back to 'null'. We still need to tell Firebase when a user logs out. The documentation provides a very simple **signOut** function hidden on the [password-auth page](https://firebase.google.com/docs/auth/web/password-auth). 

- It's worth deliberately making a few log in/register mistakes to see what Firebase sends back for errors. You can then create some error handling - always communicate to the user when there has been a problem. You can also validate in your React whether or not the form meets what you know to be Firebase's requirements, for example the password must be at least 6 characters, or an email must contain an **@** symbol. Rather than letting Firebase send you an error, you could prevent a pointless request by checking that these requirements are met _before_ even attempting to run the Firebase function.

- If you're interested in adding further functionality, check out the documentation for [managing users](https://firebase.google.com/docs/auth/web/manage-users). Here, you'll find functions to add, update, delete and more.
