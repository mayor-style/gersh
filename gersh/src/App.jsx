import React from 'react'
import Book from './BookPage'
import BookForm from './BookForm'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
   <BrowserRouter>

    <Routes>
      <Route path='/Book'  element={<Book/>}/>
      <Route path='/submit'  element={<BookForm />}/>
    </Routes>
   
   </BrowserRouter>
  )
}

export default App
