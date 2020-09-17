import React, { useState } from 'react';
import './App.css';
import Note from './components/Note';

const generateId = (length = 4) => Math.random().toString(36).substring(2, 2 + length);

const defaultNote = {}

defaultNote[generateId()] = {
  title: 'First day at work',
  content: 'lorem ipsum',
  color: 'rgba(255,255,255)', 
  dateCreated: Date.now()
}
const App = () => {
  const [note, setNote] = useState(defaultNote)
  const[color, setColor] = useState('rgba(255,255,255)')
  const [display, setDisplay] = useState({title: 'First day at work',content: 'lorem ipsum',})

const addNote = (ev) =>{
  ev.preventDefault()
  const title = ev.target.title.value
  const content = ev.target.content.value

  const noteOb = {}
  noteOb[generateId()] = {
    title: title,
    content: content,
    dateCreated: Date.now()
  }
  setNote({
    ...note,
    ...noteOb
  })
}

const displayCon = (title, content) => {
    setDisplay({
      ...display,
        title,
        content
    })
}


const Sidebar = () => {

  return (  
    <div className="Sidebar">
      <h1>CV Note</h1>
      <div className="search">
        <img src="/asset/search.svg" alt="search" />
        <input type="text" /> 
      </div>
      <Note list={note} display={displayCon} className="noteTitles" />
    </div>
  )
}

const MainContent = () =>{

const InputTab =() => {  
  
    return (
        <div className = "input-con">
          <form id="my-form" onSubmit={addNote}>
            <input type="text" placeholder="Title" name="title" />
            <textarea rows="3" name="content" placeholder="Type your note" /> 
          </form>
            <div className="bg">
              <div className="colors">
                <img src="/asset/blue.svg" alt="blue" onClick={(() => setColor('rgba(37, 172, 202)') ) }/>
                <img src="/asset/purple.svg" alt="purple"  onClick={(() => setColor('rgba(129, 37, 202)') ) }/>
                <img src="/asset/yelow.svg" alt="yellow"  onClick={(() => setColor('rgba(202, 185, 37)') ) } />
                <img src="/asset/white.svg" alt="white" onClick={(() => setColor('rgba(255, 255, 255)') ) } />
              </div>
              <button type="submit" form="my-form"><img src="/asset/mark.svg" alt="mark" /></button>
            </div>
        </div>
    )
  
  }

  const ShowNote =() => {                             
    
    return (
    <div className="shownote" style= {{background: color}} >
      <p className="title">{display.title}</p>
    <span>{display.content}</span>
    </div>
    )
  }

 return (
  
  <div>
    <InputTab />
    <ShowNote />
  </div>  
)
}



  return (
    <div className="App">
      <Sidebar />
      <MainContent className="mainContent"/>
    </div>
  );
}

export default App;
