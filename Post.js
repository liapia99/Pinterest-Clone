import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDocs } from "firebase/firestore";
import "./Post.css";

export default function Post() {
  const [caption, setCaption] = useState("");
  const [users, setUsers] = useState([]);

  const captionCollectionRef = collection(db, "post");
  const postCaption = async () => {
    await addDocs(captionCollectionRef, { newCaption: caption });
    console.log("Caption made");
  };

  useEffect(() => {
    const getCaptions = async () => {
      const data = await getDocs(captionCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getCaptions();
  }, []);

  return (
    <div className="App">
      <form>
        <input
          placeholder="caption"
          type="text"
          onChange={(e) => setCaption(e.target.value)}
        />
        <button onClick={postCaption}>Post</button>
      </form>
    </div>
  );
}
