import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from "react"
import Axios from "axios"


function App() {
  const [listOfUsers,setListOfUsers] = useState([]);
  const [name,setName] = useState("");

  useEffect(()=>{
    Axios.get("http://localhost:3001/getUsers").then((response)=>{
      setListOfUsers(response.data);
    })
  },[])

  const createUser = () =>{
    Axios.post("http://localhost:3001/createUser",{
      "name": name,
    }).then((response)=>{
      setListOfUsers([...listOfUsers,{name} ]);
    })
  }

  return (
    <div className="App">
      <div className="usersDisplay">
        {listOfUsers.map(x => {
          return <h2>Name : {x.name}</h2>
        })}
      </div>

        <form>
          <input type="text" placeholder="name" onChange={(e) => {
            setName(e.target.value)
          }}/>
          <button onClick={createUser}>Create User</button>
        </form>

    </div>
  );
}

export default App;
