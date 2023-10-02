import React, { useContext, useState } from 'react'
import noteContext from '../Context/notes/noteContext'

export default function Addnote(props) {
    const context = useContext(noteContext)
    const { addNote } = context
    const [note, setNote] = useState({
        title: '',
        auth_name: '',
    })
    const handleClick = async (e) => {
        e.preventDefault()
        const val = await addNote(note.title, note.auth_name)
        const data = document.getElementsByClassName('finput')
        for (const ele of data) {
            ele.value = ''
        }
        setNote({
            title: '',
            auth_name: '',
        });
        if (val.error) {
            props.showAlert(val.msg, 'danger')
        }
        else {
            props.showAlert("Note Added Successfully😇", 'success')
        }


    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (

        <div className='my-3'>
            <h2>Add Your Books</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input placeholder='Enter the title of your book' type="text" className="form-control finput" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="auth_name" className="form-label">Author name</label>
                    <input placeholder="Enter the author's name here" type="text" className="form-control finput" id="auth_name" name='auth_name' onChange={onChange} />
                </div>


                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Book</button>
            </form>
        </div>

    )
}
