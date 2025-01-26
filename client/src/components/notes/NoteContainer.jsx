import AddEditModal from '@/components/Modals/AddEditModal';
import NoteCard from '@/components/notes/NoteCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import EmptyCard from '../cards/EmptyCard';
import { assets } from '@/assets/assets';
import { useToast } from '@/hooks/use-toast';
import { useNote } from '@/context/NoteProvider';

const NoteContainer = ({ add = true }) => {

    const { toast } = useToast();
    const { notes, getNotes, addNote } = useNote();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const note = {
        id: null,
        title: '',
        content: '',
        tags: [],
    }

    const closeDialog = () => {
        setIsDialogOpen(false);
    }

    return (
        <>
            <div className="container mx-auto mt-3">
                <h1 className='text-3xl font-semibold mb-3'>Notes</h1>
                {notes.length ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
                        {notes.map((note, index) => (
                            <div key={index}>
                                <NoteCard
                                    note={note}
                                    callbackFunction={getNotes}
                                    toast={toast}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <EmptyCard action={setIsDialogOpen} img={assets.addNotesImg} message={'You don’t have any notes yet! Why not start with one?'} />
                )}
            </div>

            {add && notes.length>0&&(
                <Button
                    className="backdrop-blur bg-foreground/70 text-background hover:bg-foreground/50 hover:text-background w-16 h-16 items-center justify-center rounded-2xl fixed right-10 bottom-5"
                    onClick={() => setIsDialogOpen(true)}
                >
                    <Plus />
                </Button>)}
            <AddEditModal
                tab={"Note"}
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                data={note}
                closeDialog={closeDialog}
                onSave={addNote}
            />
        </>
    );
}

export default NoteContainer;
