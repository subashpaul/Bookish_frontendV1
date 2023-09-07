import noteContext from './noteContext'
import { useState } from "react";
const NoteState = (props) => {
    // const host = 'http://localhost:8080'
    const host = 'https://bookishapi.azurewebsites.net'
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)


    const getAllNotes = async () => {
        //API call
        const response = await fetch(`${host}/books`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await response.json()
        console.log(json)
        setNotes(json)
    }

    // Add a note
    const addNote = async (title, name) => {

        //API call
        const response = await fetch(`${host}/books`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, name })
        });
        const json = await response.json();

        if (Object.keys(json)[0] === 'errors') {
            // console.log('error encountered');
            return ({ msg: json.errors[0].msg, error: true })
        }

        setNotes(notes.concat(json))
        return ({ msg: '', error: false })

        //handle the error caused in the validation of the body and setNote only when ther's no error
    }
    // Delete note
    const deleteNote = async (id) => {
        //API call
        // const response =
        await fetch(`${host}/books/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },

        });
        // const json = response.json()
        // console.log(json)
        const newNote = notes.filter((note) => {
            return note.id !== id
        })
        setNotes(newNote)

    }
    // Edit note
    const editNote = async (id, title, name) => {

        //API call
        const response = await fetch(`${host}/books/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, name })
        });
        const json = await response.json()

        const newNote = JSON.parse(JSON.stringify(notes))
        console.log(json)
        newNote.forEach(element => {
            if (element.id === id) {
                element.title = json.title;
                element.name = json.name;
            }
        })
        setNotes(newNote)

    }

    return (
        <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getAllNotes }}>
            {props.children}
        </noteContext.Provider>

    )
}

export default NoteState