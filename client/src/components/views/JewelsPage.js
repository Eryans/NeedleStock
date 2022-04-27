import { useState, useEffect } from "react";
import Axios from "axios";

export default function JewelsPage() {
  const [jewels, setJewels] = useState([]);
  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTZmZGU5YjU0ZmY2ZGI4MjViZDA2YiIsImlhdCI6MTY1MDk5NTY3NywiZXhwIjoxNjUzNTg3Njc3fQ.aIHUy8NnpAnatDKHcM2SVb5HH5cYw1HY9MMmcxsBLVk"
  const config = {
    headers: { Authorization: `Bearer ${token}` }
};
  
  useEffect(() => {
      Axios.get("http://localhost:5000/api/jewels",config).then((response) => {
        console.log(response.data);
        setJewels(response.data);
      });
    },[]);

  return (
    <>
      <h1>Jewels Page</h1>
      <ul>
      {jewels.map((x) => {
        return <li>{x.name}</li>
      })}
      </ul>
    </>
  );
}
