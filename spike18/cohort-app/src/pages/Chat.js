import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { collection, addDoc, getDocs, onSnapshot, query, orderBy } from "firebase/firestore"; 
import { db } from '../firebaseConfig';
import Comment from '../components/Comment'

function Chat() {
  const { user } = useContext(AuthContext);

  const [textInput, setTextInput] = useState('');
  const [comments, setComments] = useState([]);

  async function getComments() {
    const q = query(collection(db, "chat"), orderBy("date", "desc"))
    const querySnapshot = await getDocs(q);
    const commentsArray = [];
    querySnapshot.forEach((doc) => {
      const eachComment = {
        id: doc.id,
        ...doc.data()
      }
      commentsArray.push(eachComment);
    });
    console.log(commentsArray);
    setComments(commentsArray);
  }

  async function getLiveComments() {
    const q = query(collection(db, "chat"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const commentsArray = [];
      querySnapshot.forEach((doc) => {
        const eachComment = {
          id: doc.id,
          ...doc.data()
        }
        commentsArray.push(eachComment);
      })
      console.log("comments array: ", commentsArray);
      setComments(commentsArray);
    })
  }

  function handleChange(e) {
    setTextInput(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const newComment = {
      author: user.email,
      date: Date.now(),
      text: textInput
    }
    try {
      const docRef = await addDoc(collection(db, "chat"), newComment);
      const control = comments;
      const commentToAdd = {
        id: docRef.id,
        ...newComment
      }
      control.unshift(commentToAdd);
      setTextInput('');
      setComments(control);
    } catch (error) {
      console.log("error:", error);
      alert("Something went wrong... Maybe try again?")
    }
  }

  async function handleLiveSubmit(e) {
    e.preventDefault()
    const newComment = {
      author: user.email,
      date: Date.now(),
      text: textInput
    }
    try {
      const docRef = await addDoc(collection(db, "chat"), newComment);
      setTextInput('');
    } catch (error) {
      console.log("error:", error);
      alert("Something went wrong... Maybe try again?")
    }
  }
  
  useEffect(() => {
    getComments();
  }, [])

  return (
    <div>
      <h1>Chat Page</h1>
      <div style={{ maxHeight: "400px", overflow: "auto", backgroundColor: "grey", padding: "0.3em", border: "solid grey 1px" }}>
        { comments.map((comment) => {
          return (
            <Comment key={comment.id} comment={comment} />
          )
        }) }
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