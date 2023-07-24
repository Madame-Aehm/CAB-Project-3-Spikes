import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase';

const containerStyle: React.CSSProperties = { display: "flex", flexDirection: "column", alignItems: "center", gap: "1em" };

function Chat() {
  const { user } = useContext(AuthContext);
  const [textInput, setTextInput] = useState("");

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMessage = {
      author: user!.email,
      date: Date.now(),
      text: textInput
    }
    console.log(newMessage);
    try {
      await fetchdata();
    } catch (e) {
      console.log(e);
    }
    // try {
    //   const docRef2 = await addDoc(collection(db, "cities"), {
    //     name: "Tokyo",
    //     country: "Japan"
    //   });
    //   console.log("Document written with ID: ", docRef2.id);
    //   console.log("trying....");
    //   const docRef = await addDoc(collection(db, "forum"), newMessage);
    //   console.log("docRef", docRef)
    //   console.log("Document written with ID: ", docRef.id);
    // } catch (e) {
    //   console.log("catching...")
    //   console.log(e)
    // }
    // addDoc(collection(db, "forum"), newMessage)
    //   .then((docRef) => {
    //     console.log("Document written with ID: ", docRef.id);
    //   })
    //   .catch((e) => console.log(e))
    //   .finally(() => console.log("end"))
  }

  const fetchdata = async () => {
    try {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      console.log(response);
    }catch (error) {
      console.log(error)
    }
  }

  return (
    <div style={containerStyle}>
      <h1>Chat/Forum!</h1>
      <div>
        here will go messages....
      </div>
      <form style={containerStyle} onSubmit={(e) => void handleSubmit(e)}>
        <textarea placeholder="write a message!" value={textInput} onChange={(e) => setTextInput(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Chat