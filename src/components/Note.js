import React from 'react'

export default ({list, display}) => {

  return (
    <div className="notelists">
      {
        Object.keys(list).map(noteId => {
          const note = list[noteId]
          return (
            <div key={noteId} className="notelist" onClick={()=> display(note.title, note.content)}>
              <span className="col" style={{background: note.color}}></span>
              <div className="ntt">
                <span className="note-title">{note.title} </span>
                <span>{note.dateCreated}</span>
              </div>
            </div>
            
          )
        })
      }
    </div>
  )
}
