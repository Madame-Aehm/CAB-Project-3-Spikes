# Spike 17 notes

## Firebase Authentication

- **Firebase** is a Google service, it is effectively a pre-built backend. We will use their [**Authentication** service](https://firebase.google.com/docs/auth?hl=en) to create a user database. We can then use their pre-written functions to create, update, delete, and authenticate users.

- You will need to create an account to use Firebase. From here, you will also have to create a project. We're not going to need Google Analytics for this project, so I will disable that. If you think you would like to use that sometime in the future, feel free to keep it enabled. 

- In the Project Overview, you'll be prompted to add Firebase to your App. We're building a Web App, so click on the **&lt;/&gt;** button. Your App needs a nickname, and we're not going to cover Firebase Hosting, so you can leave that checkbox unchecked and click **Register app**. Now there will just be some copy-paste! Paste **npm install firebase** into your terminal to install the package (make sure you're at the root of your project!). 

- Once your package has installed, create a file called **firebaseConfig.js** in the project **src** folder. Then copy and paste the initialization code from the overview into that file. To test whether this has worked, you can export the **app** variable, import it into another component, and log it to the console.

- Now that Firebase is working through our App, we can choose some Firebase products to add. We're going to start with **Authentication**. This will create a database on Firebase of users, Google will do all the work authenticating credentials and keeping data secure and organised. We can just use their pre-written functions to create, update, and delete users from the App.

- Click the **get started** button on the Authentication page. Here you can select which sign-in methods you are going to allow for your App. We're going to start with just **Email/Password**, click on the option and **Enable** with the checkbox. If you have time later, you can try to add an Google or Facebook log in! 

- The [getting started](https://firebase.google.com/docs/auth/web/start) for web apps documentation page has steps we can follow to add the **auth** product to our firebaseConfig.js file. Export the **auth** variable so that we can import and use it in other components.

- Now we'll need a page to log in or register our users from. I'm going to replace that fake login button I created with a link to a page with a form. I'll also create a state to hold the value of each input. 

- From here I can copy and paste the sample code from Firebase to sign up new users. Instead of using the **getAuth()** method again, we can use the **auth** variable that we exported from our config. Import it here, and use it instead of the auth variable in the sample code. In the **createUserWithEmailAndPassword()** function, we'll also need to replace the **email** and **password** with the state variable holding the relevant data. 

- Log the result of this function to the console, and now if you fill in and submit the form, you should see your new user! If you check your users in the Authentication overview over on Firebase, you should see your new user in the table. 

- Firebase doesn't automatically log in the user once they've been created. This is an extra step you can add to your register submit function if you want to. Otherwise, we now need to log in our user from the login form. We will be using the result of this function to set our user state on our AuthContext, so it makes the most sense to write the function there. Copy and paste the sample code to sign in existing users from Firebase into our logIn function (it will need to take email and password parameters, since this information isn't available on the context), make the same changes to the code that we needed to make for the register function. The last step, will be to set the state of our **user** variable to the returned user!

- Call this function (after using **useContext** hook to access it) from in the submitLogin function. Pass the loginEmail and loginPassword state variables as arguments. Our user can now log in!
