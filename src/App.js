import React from 'react';
import './App.css';
import { nanoid } from 'nanoid';
import Split from "react-split"
import Sidebar from './Sidebar';
import Editor from './Editor';

function App() {
  const [notes, setNotes] = React.useState(
    JSON.parse(localStorage.getItem("notes")) || []
  )
  

  const [currentNoteId, setCurrentNoteId] = React.useState(
      (notes[0] && notes[0].id) || ""
  )

  React.useEffect(()=>{
    localStorage.setItem("notes",JSON.stringify(notes))
  },[notes])
  
  function createNewNote() {
      const newNote = {
          id: nanoid(),
          body: "# Type your markdown note's title here"
      }
      setNotes(prevNotes => [newNote, ...prevNotes])
      setCurrentNoteId(newNote.id)
  }
  
  
  function findCurrentNote() {
      return notes.find(note => {
          return note.id === currentNoteId
      }) || notes[0]
  }


  return (
    <main>
      {
        notes.length>1 
        ?
        
        <Split 
        sizes={[30, 70]} 
        direction="horizontal" 
        className="split"
    >
        <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
        />
        {
            currentNoteId && 
            notes.length > 0 &&
            <Editor 
                currentNote={findCurrentNote()}
                
            />
        }
    </Split>

            :

            <div className="no-notes">
            <h1>You have no notes</h1>
            <button 
                className="first-note" 
                onClick={createNewNote}
            >
                Create one now
            </button>
        </div>

      }
     
    </main>
  );
}

export default App;
