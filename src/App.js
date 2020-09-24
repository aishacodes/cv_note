import React, { useState } from 'react';
import './App.css';
import Note from './components/Note';

const generateId = (length = 4) => Math.random().toString(36).substring(2, 2 + length);

const Timee = (timeStamp) => {

  const days = 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(" ")
  const months = 'January February March April May June July August September October November December'.split(" ")

  const now = new Date(timeStamp);

  return `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()} at ${now.toLocaleTimeString()}`
}
const colors = '#a0d7e3 #dec5f2 #f6eb92 #ffffff'.split(' ')
const defaultNote = {}

defaultNote[generateId()] = {
  title: 'First day at work',
  content: 'lorem ipsum',
  color: colors[0], 
  dateCreated: Timee(Date.now())
}


const App = () => {
  const [note, setNote] = useState(defaultNote)
  const [selectedColor, setSelectedColor] = useState(colors[1])
  const [filteredNotes, setFilteredNotes] = useState(null);

  const [display, setDisplay] = useState({title: 'First day at work',content: 'lorem ipsum', dateCreated: Timee(Date.now())})

const addNote = (ev) =>{
  ev.preventDefault()
  const title = ev.target.title.value
  const content = ev.target.content.value
  const noteOb = {}
  noteOb[generateId()] = {
    title: title,
    content: content,
    dateCreated: Timee(Date.now())
  }
  setNote({
    ...note,
    ...noteOb
  })
}

const displayCon = (title, content, dateCreated) => {
    setDisplay({
      ...display,
        title,
        content,
        dateCreated
    })
}


const SearchBox = ({handleInput}) => (
    <form onSubmit={e => e.preventDefault()}>
        <div className="search">
        <img src="/asset/search.svg" alt="search" />
        <input type="search" name="search" placeholder="Search notes"  onChange={handleInput}/>
        </div>
    </form>
  )


const filterNotes = (e) => {
  const query = e.target.value.toLowerCase();

  if (!query) return;

  const filtered = {}
  Object.keys(note).forEach(noteId => {
    const notte = note[noteId]

    if (notte.title.toLowerCase().indexOf(query) > -1 ||
    notte.content.toLowerCase().indexOf(query) > -1) filtered[noteId] = notte
  })

  if (Object.keys(filtered).length) {
    setFilteredNotes(filtered);
  } else {
    setFilteredNotes(null);
  }
};

const Sidebar = () => {

  return (  
    <div className="Sidebar">
      <h1>CV Note</h1>
      <SearchBox handleInput={filterNotes}/>
      <Note list= {filteredNotes || note} display={displayCon} className="noteTitles" />
    </div>
  )
}

const MainContent = () =>{

const InputTab =() => {  
  
    return (
        <div className = "input-con">
          <form id="my-form" onSubmit={addNote}>
            <input type="text" placeholder="Title" name="title" required />
            <textarea rows="3" name="content" placeholder="Type your note" required /> 
          </form>
            <div className="bg">
              <div className="colors">
              {
            colors.map(color => <p className={`color ${color === selectedColor ? 'selected': ''}`} style={{backgroundColor: color}} key={`new-color-${color}`} onClick={() => setSelectedColor(color)}/>
            )
          }
              </div>
              <button type="submit" form="my-form"><img src="/asset/mark.svg" alt="mark" /></button>
            </div>
        </div>
    )
  
  }

  const ShowNote =() => {                             
    
    return (
    <div className="shownote"  >
      <div className="det">
        <p className="title">{display.title}</p>
        <span>{display.dateCreated}</span>
      </div>
      <span className="con">{display.content}</span>
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
