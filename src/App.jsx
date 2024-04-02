import React from 'react'
import { Navbar } from './components/Navbar'
import { NewsBoard } from './components/NewsBoard'
import { useState } from 'react'
import SignUp from './components/signup'
import Login from './components/login'
import './App.css'
import { BrowserRouter,Router,Routes,Route } from 'react-router-dom'
export default function App() {
  // const[category,setcategory]=useState("general");
  return (
    <div>
      <BrowserRouter>
          <Routes>
              
              <Route path="/" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/News" element={<Navbar/>} />
              {/* <Route path="/News" element={<NewsBoard category={category}/>} /> */}
              {/* <SignUp/> */}
              {/* <Navbar setcategory={setcategory}/>
              <NewsBoard category={category}/> */}
          </Routes>
      </BrowserRouter>
    </div>
  )
}
