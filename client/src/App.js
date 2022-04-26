import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import JewelsPage from "./pages/JewelsPage";

function App() {
//   const [listOfUsers, setListOfUsers] = useState([]);
//   const [name, setName] = useState("");

//   useEffect(() => {
//     Axios.get("http://localhost:3001/getUsers").then((response) => {
//       setListOfUsers(response.data);
//     });
//   }, []);

//   const createUser = () => {
//     Axios.post("http://localhost:3001/createUser", {
//       name: name,
//     }).then((response) => {
//       setListOfUsers([...listOfUsers, { name }]);
//     });
//   };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
			<Route path="/jewels" element={<JewelsPage/>}></Route>
			<Route path="/" element={<Home/>}></Route>
		</Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
