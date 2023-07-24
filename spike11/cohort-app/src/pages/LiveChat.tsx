import { FormEvent, useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';
import { collection, addDoc, query, getDocs, orderBy } from "firebase/firestore";
import { db } from '../firebase';
import { ChatMsg, ChatMsgWithID } from '../@types/chat';

const containerStyle: React.CSSProperties = { display: "flex", flexDirection: "column", alignItems: "center", gap: "1em" };
const border: React.CSSProperties = { border: "solid 1px black", padding: "1em" };

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
      console.log("Document written: ", submittedMsg);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  useEffect(() => {
    const getChats = async() => {
      const q = query(collection(db, "chat"), orderBy("date", "desc"));
      const snapshot = await getDocs(q);
      console.log(snapshot);
      const chatArray:ChatMsgWithID[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as ChatMsg;
        chatArray.push({ ...data, id: doc.id });
      })
      console.log(chatArray);
      setExistingMessages(chatArray);
    }
    getChats().catch((e) => console.log(e));
  }, [])
  

  return (
    <div style={containerStyle}>
      <h1>Chat/Forum!</h1>
      <div>
        { existingMessages.map((msg) => {
          return(
            <div key={msg.id} style={border}>
              <h3>{msg.author}</h3>
              <h4><i>{msg.text}</i></h4>
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