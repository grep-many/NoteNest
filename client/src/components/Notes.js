import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import darkModeContext from '../context/darkMode/darkModeContext';
import alertContext from '../context/alert/alertContext';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Notes = () => {

  const { showAlert } = useContext(alertContext)
  const { notes, fetchNotes, editNote } = useContext(noteContext);
  const { isDarkMode } = useContext(darkModeContext);
  const [note, setNote] = useState({
    etitle: '',
    edescription: '',
    etag: ''
  });

  const mode = isDarkMode ? " dark" : '';
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get('x-auth-token')) {
      fetchNotes();
    } else {
      navigate('/login')
    }
  }, [AddNote]);

  const updateModalRef = useRef(null);
  const closeUpdateModalRef = useRef(null);

  const updateNoteClick = (currentNote) => {
    updateModalRef.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag || 'General'
    });
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const handleUpdateNote = async () => {

    if (!note.etitle.trim() && !note.edescription.trim()) {
      return;
    }

    if (note.etitle.trim().length < 2) {
      return;
    }
    if (note.edescription.trim().length < 5) {
      return;
    }

    try {
      // Wait for the addNote API call to complete
      const response = await editNote(note.id, note.etitle, note.edescription, note.etag);

      // Check if the response is successful
      if (response.success) {
        showAlert('Success', 'Note update successfully');
      } else {
        // Handle failure case (no success in response)
        showAlert('Error', 'Something went wrong while updating note', true);
      }
    } catch (error) {
      // Catch and handle any errors that might occur during the API call (network issues, etc.)
      showAlert('Error', 'An error occurred while updating the note. Please try again.', true);
      console.error('Error adding note:', error);
    } finally {
      closeUpdateModalRef.current.click();
    }
  }

  return (
    <>
      <AddNote />
      {/* <!-- Button trigger modal --> */}
      <button type="button" className="d-none" ref={updateModalRef} data-bs-toggle="modal" data-bs-target="#exampleModal"></button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className={"modal-content " + (isDarkMode ? 'bg-black border-white' : 'border border-black')}>
            <div className={"modal-header " + (isDarkMode ? 'dark' : '')}>
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
                {!note.etitle.trim() && !note.edescription.trim() ? <p className="position-absolute text-danger" style={{ fontSize: '10px' }}>fields are empty</p> : null}
              </h5>
              <button type="button" className={"btn-close" + mode} data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className={"form-control " + (isDarkMode ? 'bg-black text-light' : 'bg-light text-black border border-black')} id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange} placeholder='Enter your Title' />
                  {note.etitle.trim().length < 2 ? <p className="position-absolute text-danger" style={{ fontSize: '10px' }}>title should be more than 2 characters</p> : null}
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className={"form-control " + (isDarkMode ? 'bg-black text-light' : 'bg-light text-black border border-black')} id="edescription" name='edescription' value={note.edescription} onChange={onChange} placeholder='Enter your Description' />
                  {note.edescription.trim().length < 5 ? <p className="position-absolute text-danger" style={{ fontSize: '10px' }}>description should be more than 5 characters</p> : null}
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag (Optional)</label>
                  <input type="text" className={"form-control " + (isDarkMode ? 'bg-black text-light' : 'bg-light text-black border border-black')} id="etag" name='etag' value={note.etag} onChange={onChange} placeholder='Enter your Tag' />
                </div>
              </form>
            </div>
            <div className={"modal-footer " + (isDarkMode ? 'dark' : '')}>
              <button type="button" className={"m-1 btn border-" + (isDarkMode ? 'text-danger btn-outline-danger' : 'text-black btn-outline-danger')} ref={closeUpdateModalRef} data-bs-dismiss="modal">Cancel</button>
              <button type="button" className={"m-1 btn border-" + (isDarkMode ? 'white btn-outline-light' : 'black text-black btn-outline-dark')} onClick={handleUpdateNote}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        {/* Notes display */}
        <h1>Your Notes</h1>

        {Array.isArray(notes) && notes.length === 0 ? (
          <p className='container py-4'>No notes to display</p>
        ) : (
          Array.isArray(notes) &&
          notes.map((note) => (
            <NoteItem key={note._id} note={note} updateNoteClick={updateNoteClick} />
          ))
        )}
        {/* {notes.length === 0 ? <p className='container py-4'>No notes to display</p> : notes.map((note) => <NoteItem key={note._id} note={note} updateNoteClick={updateNoteClick} />)} */}
      </div>
    </>
  )
}

export default Notes