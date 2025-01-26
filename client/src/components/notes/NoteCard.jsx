import React, { useState } from 'react';
import { Card, CardHeader, CardFooter, CardContent } from '../ui/card';
import { Pin } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import ActionButton from '../ActionButton';
import { useNote } from '@/context/NoteProvider';
import DetailModal from '../Modals/DetailModal';

const NoteCard = ({
    note,
}) => {
    
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { pinNote, removeNote, editNote } = useNote();

    const handledetail = () => {
        setIsDialogOpen(true)
    }

    return (
        <>
            <Card className="h-full transition-all ease-in-out hover:shadow-2xl cursor-pointer">
                <CardHeader>
                    <div className="flex justify-between gap-2 mt-2 sm:mt-0">
                        <Button variant="ghost" className="max-w-6" onClick={()=>pinNote(note?._id)}>
                            <Pin className={`h-5 w-5 ${note?.isPinned ? 'text-indigo-700' : ''}`} />
                        </Button>
                        <h6 className="text-lg font-bold w-full text-center" onClick={handledetail} >{note?.title}</h6>
                        <ActionButton
                            data={note}
                            removeData={removeNote}
                            editData={editNote}
                        />
                    </div>
                </CardHeader>
                <div onClick={handledetail}>
                    <CardContent>
                        <p className="text-base">{note?.content.length > 57 ? `${note?.content?.slice(0, 57)}...` : note?.content}</p>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <div className="flex gap-2 flex-wrap">
                            {note?.tags.length > 3 ? (
                                <>
                                    {note?.tags.slice(0, 3).map((tag, index) => (
                                        <Badge key={index} variant="outline">
                                            #{tag}
                                        </Badge>
                                    ))}
                                    <Badge variant="outline">+{note?.tags.length - 3} more</Badge>
                                </>
                            ) : (
                                note?.tags.map((tag, index) => (
                                    <Badge key={index} variant="outline">
                                        #{tag}
                                    </Badge>
                                ))
                            )}
                        </div>
                        <span className="text-xs text-gray-500 mt-3">{note?.createdAt.split('T')[0]}</span>
                    </CardFooter>
                </div>
            </Card>
            <DetailModal
                data={note}
                handleEdit={editNote}
                handleRemove={removeNote}
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen} // Pass the setter function correctly here
            />
        </>
    );
}

export default NoteCard;
