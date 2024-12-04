import React, { useContext, useState } from 'react'
import darkModeContext from '../context/darkMode/darkModeContext';
import noteContext from '../context/notes/noteContext';
import alertContext from '../context/alert/alertContext';
import loadingProgressContext from '../context/loadingProgress/loadingProgressContext';

const AddNote = () => {

    const [note, setNote] = useState({
        title: '',
        description: '',
        tag: ''
    });

    const { isDarkMode } = useContext(darkModeContext);
    const { addNote } = useContext(noteContext);
    const { showAlert } = useContext(alertContext);
    const { setProgress } = useContext(loadingProgressContext);

    const handleAddNote = async (e) => {
        e.preventDefault();

        if (!note.title.trim() && !note.description.trim()) {
            showAlert('Warning', 'Title and Description fields are empty', true);
            return;
        }

        if (note.title.trim().length < 2) {
            showAlert('Warning', 'Title must be more than 2 characters');
            return;
        }
        if (note.description.trim().length < 5) {
            showAlert('Warning', 'Description must be more than 5 characters');
            return;
        }

        try {
            setProgress(25);
            // Wait for the addNote API call to complete
            const response = await addNote(note.title, note.description, note.tag || 'General');

            // Check if the response is successful
            if (response.success) {
                showAlert('Success', 'Note added successfully');
            } else {
                // Handle failure case (no success in response)
                showAlert('Error', 'Something went wrong while adding note', true);
            }
        } catch (error) {
            // Catch and handle any errors that might occur during the API call (network issues, etc.)
            showAlert('Error', 'An error occurred while adding the note. Please try again.', true);
        } finally {
            // Always reset the form, regardless of success or failure
            setNote({
                title: '',
                description: '',
                tag: ''
            });
            setProgress(100);
        }
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className={'container my-3 py-5 px-4 rounded border border-' + (isDarkMode ? 'white' : 'dark')}>
            <h1>Add a note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className={"form-control " + (isDarkMode ? 'bg-black text-light' : 'bg-light text-black border border-black')} id="title" name='title' aria-describedby="emailHelp" onChange={onChange} value={note.title} placeholder='Enter your Title' />
                    {note.title.trim().length < 2 ? <p className="position-absolute text-muted" style={{ fontSize: '10px' }}>title should be more than 2 characters</p> : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className={"form-control " + (isDarkMode ? 'bg-black text-light' : 'bg-light text-black border border-black')} id="description" name='description' onChange={onChange} value={note.description} placeholder='Enter your Description' />
                    {note.description.trim().length < 5 ? <p className="position-absolute text-muted" style={{ fontSize: '10px' }}>description should be more than 5 characters</p> : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag (Optional)</label>
                    <input type="text" className={"form-control " + (isDarkMode ? 'bg-black text-light' : 'bg-light text-black border border-black')} id="tag" name='tag' onChange={onChange} value={note.tag} placeholder='Enter your Tag' />
                </div>
                <button type="submit" className={"m-1 btn border-" + (isDarkMode ? 'white btn-outline-light' : 'black text-black btn-outline-dark')} onClick={handleAddNote}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote