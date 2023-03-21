import React, { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../firebaseConfig';

function Chat() {
  const { user } = useContext(AuthContext);

  const [textInput, setTextInput] = useState('');

  function handleChange(e) {
    setTextInput(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const newComment = {
      author: user.uid,
      date: new Date().toDateString(),
      text: textInput
    }
    // console.log(newComment);
    try {
      const docRef = await addDoc(collection(db, "chat"), newComment);
      console.log("docRef:", docRef);
    } catch (error) {
      console.log("error:", error);
    }
    
  }

  return (
    <div>
      <h1>Chat Page</h1>
      <div>
        comments go here
      </div>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginTop: "1em" }}>
        <label>Add New Comment:</label>
        <textarea value={textInput} onChange={handleChange}/>
        <button type='submit'>Submit new comment</button>
      </form>
    </div>
  )
}

export default Chat