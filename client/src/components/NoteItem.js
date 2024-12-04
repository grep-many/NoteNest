import React, { useContext } from 'react'
import darkModeContext from '../context/darkMode/darkModeContext';
import delIcon from '../assets/delete.svg'
import editIcon from '../assets/edit.svg'
import noteContext from '../context/notes/noteContext';
import alertContext from '../context/alert/alertContext';
import loadingProgressContext from '../context/loadingProgress/loadingProgressContext';

const NoteItem = (props) => {

    const { showAlert } = useContext(alertContext)
    const { deleteNote } = useContext(noteContext);
    const { isDarkMode } = useContext(darkModeContext);
    const { setProgress } = useContext(loadingProgressContext);
    const { note, updateNoteClick } = props;

    const deleteNoteClick = async (id) => {
        try {
            setProgress(25)
            let response = await deleteNote(id);
            if (response.success) {
                showAlert('Success', 'Note deleted successfully');
            } else {
                showAlert('Error', 'Something went wrong while deleting note', true);
            }
        } catch (error) {
            showAlert('Error', 'An error occurred while deleting the note. Please try again.', true);
        }finally{
            setProgress(100);
        }
    }

    return (
        <div className='col-lg-3 col-md-5'>
            <div className={`card my-3 ${isDarkMode ? 'bg-black border-white' : 'bg-white border-dark'}`} >
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <ion-icon src={delIcon} onClick={() => { deleteNoteClick(note._id) }} />
                        <h5 className="card-title">{note.title}</h5>
                        <ion-icon src={editIcon} onClick={() => { updateNoteClick(note) }} />
                    </div>
                    <p className="card-text">{note.description}</p>
                    <span className={`badge rounded-pill bg-${isDarkMode ? 'light text-black  ' : 'dark'} mx-3`} style={{ zIndex: 1, fontSize: '10px' }}>{note.tag}</span>
                </div>
            </div>
        </div>
    )
}

export default NoteItem