import { useState, useEffect } from "react";
import { getItems, registerItem } from "../axios/items_action";

export default function HomePage() {
  const [items, setItems] = useState([]);


  useEffect(() => {
    return new Promise((resolve) => {
      getItems().then((res) => {
        console.log(res);
        resolve();
      });
    });
  }, []);

  return (
    <>
      <h1>Home Page</h1>
      <ul>
        {items.map((x) => {
          return <li>{x.name}</li>;
        })}
      </ul>
    </>
  );
}
