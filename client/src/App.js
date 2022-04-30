import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/views/HomePage";
import LoginPage from "./components/views/Login/LoginPage";
import RegisterPage from "./components/views/Login/RegisterPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
			<Route path="/" element={<HomePage/>}></Route>
      <Route path="/register" element={<RegisterPage/>}></Route>
      <Route path="/login" element={<LoginPage/>}></Route>
		</Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
