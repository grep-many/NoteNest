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
        const {status,data} = await fetchNotesService(query);
        if (status === 200) {
            setNotes(data);
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
        const {status,data} = await addNotesService(noteData)
        if (status === 201) {
            setNotes((prev) => [...prev, data])
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

    const editNote = async (originalNote, updatedNote) => {
        const { status, data } = await updateNotesService(originalNote?._id, updatedNote);
        if (status === 200) {
            setNotes((prev) =>
                prev?.map((note) =>
                    note?._id === data?._id ? data : note
                )
            )
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
        const {status} = await removeNotesService(id);
        if (status===200) {
            setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
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

        const {status,data} = await pinNotesService(id);
        if (status===200) {
            // getNotes();
            setNotes((prev) =>
                prev?.map((note) =>
                    note?._id === data?._id ? data : note
                )
            )
            toast({
                description: `Note ${data?.isPinned ? 'pinned' : 'unpinned'} Successfully!`,
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