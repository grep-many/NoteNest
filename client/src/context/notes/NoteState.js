import { useContext, useState } from "react";
import Cookies from 'js-cookie';
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = process.env.REACT_APP_HOST;
    const authToken = Cookies.get('x-auth-token');

    const [notes, setNotes] = useState([]);
    const { showAlert } = useContext(alertContext);

    // Fetch notes from the API
    const fetchNotes = async () => {
        try {
            const response = await fetch(`${host}/api/notes/fetchNotes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": authToken
                }
            });
            const fetchedNotes = await response.json();
            setNotes(fetchedNotes);
        } catch (error) {
            showAlert('Error!','Something went wrong while fetching notes',true);
        }
    };

    // Add a note
    const addNote = async (title, description, tag = "General") => {

        try {
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": authToken
                },
                body: JSON.stringify({ title, description, tag }),
            });

            const note = await response.json();
            if (response.ok) {
                // Update state immutably
                setNotes((prevNotes) => [...prevNotes, note]);
                return { success: true, note };
            } else {
                return { success: false, message: note.error };
            }
        } catch (error) {
            return { success: false, message: "An error occurred while adding the note." };
        }
    };

    // Edit a note
    const editNote = async (id, title, description, tag = "General") => {
        try {
            const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": authToken
                },
                body: JSON.stringify({ title, description, tag }),
            });

            const result = await response.json();
            if (response.ok) {
                // Update state immutably
                setNotes((prevNotes) =>
                    prevNotes.map((note) =>
                        note._id === id ? { ...note, title, description, tag } : note
                    )
                );
                return { success: true, result };
            } else {
                return { success: false, message: result.error };
            }
        } catch (error) {
            return { success: false, message: "An error occurred while updating the note." };
        }
    };

    // Delete a note
    const deleteNote = async (id) => {
        try {
            const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": authToken
                }
            });

            if (response.ok) {
                // Remove the deleted note from state
                setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
                return { success: true };
            } else {
                const error = await response.json();
                return { success: false, message: error.error };
            }
        } catch (error) {
            return { success: false, message: "An error occurred while deleting the note." };
        }
    };

    return (
        <NoteContext.Provider value={{ notes, fetchNotes, addNote, editNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
