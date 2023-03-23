import { addDoc, collection } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { db } from '../firebaseConfig';
import { formatAuthor, formatDate } from '../utils/formattingFunctions';

function Comment({ comment }) {
  const [replyInput, setReplyInput] = useState('');
  const { user } = useContext(AuthContext);

  async function addReply(id) {
    const newComment = {
      author: user.email,
      date: Date.now(),
      text: replyInput
    }
    try {
      const docRef = await addDoc(collection(db, "chat", id, "replies"), newComment);
      alert("reply added.")
      setReplyInput('');
    } catch (error) {
      console.log("error:", error);
      alert("Something went wrong... Maybe try again?")
    }
  }

  return (
    <div style={{ border: "solid black 1px", display: "flex", flexDirection: "column", marginBottom: "0.3em", backgroundColor: "white", alignItems: "flex-start" }}>
      <b>{ formatAuthor(comment.author) }</b>
      <i>{ formatDate(comment.date) }</i>
      <p>{ comment.text }</p>
      <input value={replyInput} onChange={e => setReplyInput(e.target.value)} />
      <button onClick={() => addReply(comment.id)}>Submit Reply</button>
    </div>
  )
}

export default Comment