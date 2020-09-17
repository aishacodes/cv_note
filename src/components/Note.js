import React from 'react'

export default ({list, display}) => {

  return (
    <div className="notelists">
      {
        Object.keys(list).map(noteId => {
          const note = list[noteId]
          return (
            <div key={noteId} className="notelist" onClick={()=> display(note.title, note.content)}>
              <span className="note-title">{note.title} </span>
              <span>{note.dateCreated}</span>
            </div>
            
          )
        })
      }
    </div>
  )
}
