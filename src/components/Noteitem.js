import React from 'react'
export default function Noteitem(props) {

    const { note, updateNote, removeNote } = props;
    // useEffect(() => {


    // }, [note])

    return (
        <>
            <div className="card my-2">
                <div className="card-body">
                    <div className="d-flex align-items-center ">
                        <h5 className="card-title">{note.title}</h5>
                        <i title='Delete this note' className="fa fa-trash mx-3" onClick={() => removeNote(note.id)}></i>

                        <i title='Edit this note' className="fa fa-edit me-2" onClick={() => updateNote(note)}></i>
                    </div>
                    <p className="card-text">{note.name}</p>
                </div>
            </div>
        </>
    )
}

