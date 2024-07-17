import { useState } from "react";
import "./App.css";
import Navbar from "./Compunents/Navbar/Navbar";
import Classic from "./Compunents/Classic/Classic";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import How from "./Compunents/How/How";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./Compunents/Footer/Footer";
function App() {
  const [connection, setConnection] = useState("");
  const [userName,setUserName] = useState('')
  return (
    <>
      <BrowserRouter>
      <Navbar setConnection={setConnection} setUserName={setUserName}/>
        <Routes>
          <Route path="/" element={<Classic connection={connection} setUserName={setUserName} userName={userName}/>} />
          <Route path="/How" element={<How />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
