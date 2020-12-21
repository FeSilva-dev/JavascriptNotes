import React, { useState, useEffect } from 'react'
import { Column, List } from 'rbx'
import '../../styles/notes.scss'
import { push as Menu } from 'react-burger-menu'
import ListNotes from '../notes/list'
import Editor from '../editor/index'
import Search from '../search/index'
import NotesService from '../../services/notes'

const Notes = (props) => {

    const [notes, setNotes] = useState([])
    const [current_note, SetCurrentNote] = useState({ title: '', body: '', id: ''})

    async function fetchNotes(){
        const response = await NotesService.index()
        if(response.data.length >= 1) {
            setNotes(response.data.sort())
            SetCurrentNote(response.data[0])
        }else{
            setNotes([])
        }
    }

    const selectNote = (id) => {
        const note = notes.find((note) => {
          return note._id == id;
        })
        SetCurrentNote(note);
    }

    const createNote = async () => {
        await NotesService.create()
        fetchNotes()
    } 

    const deleteNotes = async (note) => {
        await NotesService.delete(note._id)
        fetchNotes()
    }

    const updateNote = async (oldNote, params) => {
        const updatedNote = await NotesService.update(oldNote._id, params);
        const index = notes.indexOf(oldNote);
        const newNotes = notes;
        newNotes[index] = updatedNote.data;
        setNotes(newNotes);
        SetCurrentNote(updatedNote.data);
    }

    const searchNote = async (query) => {
        const response = await NotesService.search(query)
        setNotes(response.data)
    }
    
    useEffect(() => {
        fetchNotes();
    }, []);

    return(
        <div className="">
            <Column.Group className="notes" id="notes">
                <Menu
                pageWrapId={"notes-editor"}
                isOpen={props.isOpen}
                onStateChange={(state) => props.setIsOpen(state.isOpen)}
                disableAutoFocus
                outerContainerId={"notes"}
                customBurgerIcon={false}
                customCrossIcon={false}
                >
                    <Column.Group>
                        <Column size={10} offset={1}>
                            <Search searchNote={searchNote} fetchNotes={fetchNotes}/>
                        </Column>
                    </Column.Group>
                    <ListNotes 
                        notes={notes}
                        selectNote={selectNote}
                        current_note={current_note}
                        createNote={createNote}
                        deleteNotes={deleteNotes}/>
                </Menu>
                


                <Column size={12} className="notes-editor" id="notes-editor">
                    <Editor note={current_note} updateNote={updateNote}/>
                </Column>
            </Column.Group>
        </div>
    )
}

export default Notes