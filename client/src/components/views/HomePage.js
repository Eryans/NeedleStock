import { useState, useEffect } from "react";
import { getItems, registerItem } from "../axios/items_action";

export default function HomePage() {
  const [jewels, setJewels] = useState([]);
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTZmZGU5YjU0ZmY2ZGI4MjViZDA2YiIsImlhdCI6MTY1MDk5NTY3NywiZXhwIjoxNjUzNTg3Njc3fQ.aIHUy8NnpAnatDKHcM2SVb5HH5cYw1HY9MMmcxsBLVk";
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

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
        {jewels.map((x) => {
          return <li>{x.name}</li>;
        })}
      </ul>
    </>
  );
}
