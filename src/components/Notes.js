import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../Context/notes/noteContext'
import Addnote from './Addnote'
import Noteitem from './Noteitem'

export default function Notes(props) {
    const context = useContext(noteContext)
    const { notes, getAllNotes, editNote, deleteNote } = context
    const [note, setNote] = useState({ id: '', etitle: '', edescription: '' })
    const [note_id, setNote_id] = useState(null)
    const ref = useRef(null)
    const closeRef = useRef(null)
    const open = useRef(null)
    const close = useRef(null)
    useEffect(() => {

        getAllNotes()

        // eslint-disable-next-line
    }, [])
    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote.id, etitle: currentNote.title, edescription: currentNote.name })
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value, })
    }
    const handleClick = () => {
        closeRef.current.click();
        console.log(note.id)
        editNote(note.id, note.etitle, note.edescription)
        props.showAlert("Note Updated Successfully", 'success')
    }
    const removeNote = (id) => {
        setNote_id(id)
        open.current.click()
        // getAllNotes()
    }
    const handleDelClick = () => {
        deleteNote(note_id)
        close.current.click()
        props.showAlert("Note Deleted Successfully", 'success');

    }

    return (
        <>
            {/* delete confirm modal */}
            <button ref={open} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button >

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">

                    <div className="modal-content">

                        <div className="modal-body">
                            <h4 className='text-center'>Are you sure?</h4>
                            <div className='d-flex justify-content-center'>
                                <button type="button" ref={close} className="btn btn-secondary me-3" data-bs-dismiss="modal">No</button>
                                <button type="button" className="btn btn-primary" id='yes' onClick={handleDelClick}>Yes</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Addnote showAlert={props.showAlert} />
            {/* edit note modal */}
            <button ref={ref} type="button" id='demo' className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Book</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" onChange={onChange} value={note.etitle} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Author name</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' onChange={onChange} value={note.edescription} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div>
                    <h2>Your Books</h2>
                    <h4 className='text-muted fs-5 text-center'>{notes.length === 0 && 'NO NOTES ADDES'}</h4>
                </div>
                {notes.map((note) => {
                    return <div className='col-md-3' key={note.id}>
                        <Noteitem note={note} updateNote={updateNote} removeNote={removeNote} />
                    </div>
                })}
            </div>

        </>
    )
}
