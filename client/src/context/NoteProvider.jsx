import { useToast } from "@/hooks/use-toast";
import { addNotesService, fetchNotesService, pinNotesService, removeNotesService, updateNotesService } from "@/services/noteService";
import { createContext, useContext, useEffect, useState } from "react"
import { usePage } from "./PageProvider";

const NoteProviderContext = createContext(null);

export const NoteProvider = ({ children }) => {

    const { toast } = useToast();
    const [notes, setNotes] = useState([]);
    const { searchText } = usePage();

    const getNotes = async (query = searchText) => {
        const response = await fetchNotesService(query);
        if (response?.status === 200) {
            setNotes(response?.data);
        } else {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem fetching your notes",
            });
            handleLogout();
        }
    }

    const addNote = async (noteData) => {
        const response = await addNotesService(noteData)
        if (response.status === 201) {
            getNotes();
            toast({
                description: "Note added successfully!",
            });
        } else {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem adding your note!",
            });
        }
    }

    useEffect(() => {
        getNotes()
    }, [])

    const editNote = async (id, noteData) => {
        const response = await updateNotesService(id, noteData);
        if (response?.data) {
            getNotes();
            toast({
                description: "Note edited Successfully!!",
            });
        } else {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem editing your note!",
            });
        }
    }


    const removeNote = async (id) => {
        const response = await removeNotesService(id);
        if (response?.data) {
            getNotes();
            toast({
                description: "Note removed Successfully!",
            });
        } else {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem removing your note!",
            });
        }
    }

    const pinNote = async (id) => {

        const response = await pinNotesService(id);
        if (response?.data) {
            getNotes();
            toast({
                description: `Note ${response?.data?.isPinned ? 'pinned' : 'unpinned'} Successfully!`,
            });
        } else {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem pinning your note!",
            });
        }

    }

    useEffect(() => {
        getNotes()
    }, [])

    const value = {
        notes,
        getNotes,
        addNote,
        editNote,
        pinNote,
        removeNote,
    }

    return (
        <NoteProviderContext.Provider value={value}>
            {children}
        </NoteProviderContext.Provider>

    )
}

export const useNote = () => {
    const context = useContext(NoteProviderContext);
    if (context === undefined) {
        throw new Error("useNote must be within NoteProvider");
    }
    return context;
}