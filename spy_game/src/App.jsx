import { useState } from 'react'
import './App.css'
import PlayerPage from './pages/playerPage'
import PlayersShowing from './pages/playersShowing'
import TopicSelectionPage from './pages/TopicSelectionPage'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import FinalPage from './pages/finalPage'


function App() {


  return (
    <>
    <Router>
      <Routes>
      <Route path='/home' element={<PlayerPage/>}/>
      <Route path='/topic' element={<TopicSelectionPage/>}/>
      <Route path='/players' element={<PlayersShowing/>}/>
      <Route path='/hints' element={<FinalPage/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
