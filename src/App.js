import React, { useEffect, useState } from "react";
import "./App.css";
import firebase from "./firebase";
import "firebase/firestore";

function App() {
  const [itemTitle, setItemTitle] = useState("");
  const [items, setItems] = useState([
    { itemTitle: "item1" },
    { itemTitle: "item2" },
    { itemTitle: "item3" },
  ]);

  useEffect(() => {
    // firebase.firestore().collection("users")
    // .add({
    //   first: "PCB",
    //   last: "Lovelace",
    //   born: 1815,
    // })
    // .then(function (docRef) {
    //   console.log("Document written with ID: ", docRef.id);
    // })
    // .catch(function (error) {
    //   console.error("Error adding document: ", error);
    // });

    // firebase
    //   .firestore()
    //   .collection("todos")
    //   //.where("country", "==", "USA")
    //   .get()
    //   .then((querySnapshot) => {
    //     const todoItems = querySnapshot.docs.map((doc) => doc.data());
    //     setItems(todoItems);
    //     querySnapshot.forEach((doc) => {
    //       console.log(`${doc.data().itemTitle}`);
    //     });
    //   });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    //setItems(itemTitle)
    let pcb = {"itemTitle":itemTitle};

    setItems([...items, pcb]);
    // firebase
    //   .firestore()
    //   .collection("todos")
    //   .add({
    //     itemTitle,
    //   })
    //   .then(function (docRef) {
    //     console.log("Document written with ID: ", docRef.id);
    //   })
    //   .catch(function (error) {
    //     console.error("Error adding document: ", error);
    //   });
  };

  return (
    <div className="App">
      <h1>TODO</h1>
      <pre>{items.size}</pre>
      <form onSubmit={onSubmit}>
        <div>
          <label></label>
        </div>
        <input
          type="text"
          value={itemTitle}
          onChange={(e) => setItemTitle(e.currentTarget.value)}
        />
        <button>Add</button>
      </form>
      {items &&
        items.map((item, index) => <li key={index}>{item.itemTitle}</li>)}
    </div>
  );
}

export default App;
