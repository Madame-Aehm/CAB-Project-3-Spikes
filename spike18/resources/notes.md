# Spike 18 notes

## Firebase Firestore (database)

[**Firestore**](https://firebase.google.com/docs/firestore) is one of two Firebase database options available. You may have read something about the **Firebase Realtime Database**, which offers much of the same functionality, with a different data structure. If you'd like to read about the differences, [here](https://firebase.blog/posts/2017/10/cloud-firestore-for-rtdb-developers) is a good article. We will only have time to cover one, so we're going to use Firestore.

We'll follow the steps in Firestore's [Get started](https://firebase.google.com/docs/firestore/quickstart) documentation. 

Start by clicking on **Create database**. We're going to be starting in **test mode**. You'll see in the code snippet, the test mode is set to expire after 30 days. It is possible to extend this indefinitely to keep your App functional, or you can establish [security rules](https://firebase.google.com/docs/firestore/quickstart#secure_your_data).

The location determines which servers your data will be stored on. It's best to choose the location closest so where you are - so I'll select **eur3 (Europe)** then 'enable'. Firebase will create my database, and I should be redirected to the overview. Under the submenu **Rules**, you can update the code snippet to extend the duration of the test mode period. 

We can now skip down to ['Initialize Cloud Firestore'](https://firebase.google.com/docs/firestore/quickstart#initialize). You'll maybe recognise this code snippet to represent our `firebaseConfig.ts`. We'll need to copy and paste the new lines into our file. Make sure to also export the `db` variable, as we'll need to import and use this when we start writing functions. 

The next step is to start adding data. Understanding the way Firebase stores data into **collections** and **documents** is crucial to make the most out of the database!

![document-collection-image.png](document-collection-image.png)

The **yellow** represents a **collection**, and the **blue** represents a **document**. A collection holds multiple documents, but a collection can also be nested _inside_ a document! This is called a **sub-collection**. The page on [data modals](https://firebase.google.com/docs/firestore/data-model) in the documentation is definitely worth a read! 

For now though, let's have a little play with the database UI. Create a collection, and then add a document. That document can now hold sub-collections, which can in turn hold _more_ documents, which can also hold sub-collections of their own, and so on! Now is the time to think about how you would like to structure your data. I recommend reading through the page for [adding data](https://firebase.google.com/docs/firestore/manage-data/add-data) in the docs (there is an important distinction between using `addDoc()` and `setDoc()` functions).

I'm going to create an open chat/forum page to demonstrate how to add documents to a collection on the top-most level. I'll create a new page, add a **Route**, and add a `<Link>` to my NavBar. I will also make this a **Protected Route** so that only logged in users can visit this page. On this page I'll put an `<h1>` to indicate my location, a `<div>` to hold all the comments, and a second `<form>` for users to submit new comments.

```tsx
function Chat() {
  const containerStyle: React.CSSProperties = { display: "flex", flexDirection: "column", alignItems: "center", gap: "1em" }
  return (
    <div style={containerStyle}>
      <h1>Chat/Forum!</h1>
      <div>
        here will go messages....
      </div>
      <form style={containerStyle}>
        <textarea placeholder="write a message!" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Chat
```

I'll need a state to hold the value of my `<textarea />`, which will need to have an `onChange` event. I'll also need a `handleSubmit()` function. Log the state variable linked to the `<textarea />` value to test they're all connected (don't forget to `preventDefault()`!)

Now I want to create a **JavaScript Object** to be submitted as my document. The properties I want to include are the `author` of the comment (this will be the current user, just their email will be enough to identify them), a `date` (a current date instance, I'm going to use `Date.now()` to make sorting my data by date/time nice and simple), and the `text` of the comment (the value of the text input). Log this object to the console to check what it looks like.

```tsx
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMessage = {
      author: user!.email,
      date: Date.now(),
      text: textInput
    }
    console.log(newMessage);
  }
```

Now that I'm satisfied with how my document is structured, I will add it to the database! The [`setDoc()`](https://firebase.google.com/docs/firestore/manage-data/add-data#set_a_document) method allows you to assign your document an ID, or name. Since I don't have any reason to do that and I'm happy to let Firestore assign it a unique ID on my behalf, I will use the [`addDoc()`](https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document) method. 

My `addDoc()` method will take two arguments: a callback function called `collection()` (which will also need to be imported from 'firebase/firestore'), and the document to be added (my `newMessage` variable). The `collection()` method in turn takes a minimum of two arguments: the `db` variable from our `firebaseConfig.ts` file will always be the first. The next is the name of the collection we are adding our document to - if a collection by this name exists, the document will be added. If no collection by this name exists, a new one will be automatically created! 

Adding more arguments to this function is how you will access sub-collections: the name of the parent document, then the name of the sub-collection have to be added in pairs. This logic applies the same for `setDoc()`, but the function will only accept an odd number of arguments since the new document must also be assigned an ID.

Add this function to the `handleSubmit()`. The sample code is written with **async/await**, but some Typescript and ESLint rules make this difficult, so I've opted to instead use `.then()` and `.catch()` blocks. If we've set it all up correctly, we should have something logged to the console. We can now check our database - it might need to be refreshed to see the changes. We should have our first comment! 

```tsx
 const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMessage = {
      author: user!.email,
      date: Date.now(),
      text: textInput
    }
    addDoc(collection(db, "forum"), newMessage)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((e) => console.log(e));
  }
```

Wtf is happening here, why do i have to specifiy the void? 
"on submit event react Promise-returning function provided to attribute where a void return was expected."

```tsx
<form style={containerStyle} onSubmit={(e) => void handleSubmit(e)}>
//  form content
</form>
```

- Here I would also recommend adding some UI elements to communicate to the user when their comment has been successfully posted, such as an alert, and clearing the form.

- Now that we have some comments in our database, we can write a function to [get](https://firebase.google.com/docs/firestore/query-data/get-data) and display them. I'm going to follow the steps in the documentation to **get all documents in a collection**. Documents are sorted by default by the document ID. You can specify how to [sort your data](https://firebase.google.com/docs/firestore/query-data/order-limit-data) by using **orderBy()** in the query, so I'm going to sort them by date. I would want this function to fire when the page loads so my user can view all the old comments before they add their own, so I'll write the function and call it in a useEffect. 

- You'll notice the sample code is using a **forEach()** to iterate over the query result. I'm going to create a new array, and push what I want of each document into it. I can then set this to a state for my comments. Now I've got an array of comments that I can display! To mimic a real-time update, you can add some extra functionality to your **handleSubmit()** to update the state of your comments variable to include the one just posted.

- Any formatting I'd like to do can be done through functions, such as displaying only the first part of the user email, or formatting the date. If you think it's likely you might want to use these functions again somewhere in your App, you can create a folder for **utils**, and export them from a file there. 

- Firestore _can_ also get [real-time updates](https://firebase.google.com/docs/firestore/query-data/listen) by setting up a 'listener' on a document. I'm going to make two new functions to compare the functionality - a new submit function, and a new getComments function. The submit function will be very much the same - I'll just remove the steps to manually update the comments state. My get function will also look very similar, but the whole thing will be wrapped in an **onSnapshot()**. The 'unsubscribe' returned from this function can be called to **detach** the listener. 