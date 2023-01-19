import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Pokedex from './components/Pokedex'
import Home from './components/Home'
import Item from './components/Item'
import { useSelector } from 'react-redux'

function App() {
  const username = useSelector(state => state.username)

  const verifyUsername = () => {
    if (username){
      return <Pokedex />
    } else {
      return <Home />
    }
  }

return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/pokedex' element={verifyUsername()} />
          <Route path='/pokedex/:id' element={<Item />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
