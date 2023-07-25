import { FormEvent, useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { ChatMsg, ChatMsgWithID } from '../@types/chat';

const containerStyle: React.CSSProperties = { display: "flex", flexDirection: "column", alignItems: "center", gap: "1em" };
const border: React.CSSProperties = { border: "solid 1px black", padding: "1em", marginBottom: "1em" };

function LiveChat() {
  const { user } = useContext(AuthContext);
  const [textInput, setTextInput] = useState("");
  const [existingMessages, setExistingMessages] = useState<ChatMsgWithID[]>([]);

  const handleSubmit = async(e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const newMessage = {
      author: user!.email,
      date: Date.now(),
      text: textInput
    }
    // console.log(newMessage);
    try {
      const docRef = await addDoc(collection(db, "chat"), newMessage);
      const submittedMsg = { ...newMessage, id: docRef.id };
      setTextInput("");
      console.log("Document written: ", submittedMsg);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  useEffect(() => {
    const q = query(collection(db, "chat"), orderBy("date"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages:ChatMsgWithID[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as ChatMsg
        messages.push({ ...data, id: doc.id });
      });
      console.log(messages);
      setExistingMessages(messages);
    },
    (error) => {
      console.log(error);
    })
    return () => unsubscribe();
  }, [])
  

  return (
    <div style={containerStyle}>
      <h2>Chat/Forum!</h2>
      <div style={{ ...border, width: "90%", maxHeight: "400px", overflow: "auto" }}>
        { existingMessages.map((msg) => {
          return(
            <div key={msg.id} style={border}>
              <h3>{msg.author}</h3>
              <p>{msg.text}</p>
            </div>
          )
        }) }
      </div>
      <form style={containerStyle} onSubmit={(e) => void handleSubmit(e)}>
        <textarea placeholder="write a message!" value={textInput} onChange={(e) => setTextInput(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default LiveChat