import { useState } from 'react'
import SearchBar from './components/SearchBar'
import ObjectViewer from './components/ObjectViewer'
import './App.css'

function App() {
  const [api_object, setApi_object] = useState();

  const searchBarUpdateCallback = (api_object) => {
    setApi_object(api_object);
  }

  return (
    <>
      <h1>NASA APOD AND MARS ROVER DEMO</h1>
      <div className='app-container'>
        <SearchBar searchUpdateCallback={searchBarUpdateCallback} />
        <ObjectViewer apiObject={api_object} />
      </div>
      
    </>
  )
}

export default App
