
import Nav from './components/Nav'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Content from './components/Content'
import Contact from './components/Contact'
import Footer from './components/Footer';
import List from './components/List'

function App() {


  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Content />}></Route>
        <Route path="contact" element={<Contact />}></Route>
        <Route path='list' element={<List />}></Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
