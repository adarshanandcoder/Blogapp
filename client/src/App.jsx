import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./screens/Home"
import Create from "./screens/Create"
import Navbar from "./components/Navbar"

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/createblog" element={<Create/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
