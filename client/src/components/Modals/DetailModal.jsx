import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import AddEditModal from './AddEditModal';

const DetailModal = ({ sidebarItem = false, data, isDialogOpen, setIsDialogOpen, handleStatus, handleEdit, handleRemove }) => {

    const [editDialog, setEditDialog] = useState(false);

    const handleEditClick = () => {
        if (sidebarItem) {
            setEditDialog(true)
            setIsDialogOpen(false)
        } else {
            setEditDialog(true)
        }
    }

    const handleRemoveClick = () => {
        if (sidebarItem) {
            handleRemove(data?._id)
            setIsDialogOpen(false)
        } else {
            handleRemove(data?._id)
        }
    }

    const handleStatusClick = () => {
        if (sidebarItem) {
            handleStatus(data?._id, data?.status)
            setIsDialogOpen(false)
        } else {
            handleStatus(data?._id, data?.status)
        }
    }

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className='justify-center backdrop-blur-md shadow bg-transparent'>
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <Card className="p-6 space-y-6">
                        <h1 className="text-xl font-bold space-y-2">{data?.title}</h1>
                        <p className="text-sm space-y-2">{data?.content}</p>
                        <div className='space-y-2'>
                            {data?.tags.length > 0 && data?.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className='mx-1'>
                                    #{tag}
                                </Badge>
                            ))}
                        </div>
                        <div className="flex justify-end space-x-4">
                            <Button
                                variant='outline'
                                onClick={handleEditClick}
                            >
                                Edit
                            </Button>
                            {data?.status !== undefined && <Button
                                variant='outline'
                                className={`${data?.status ? "border-green-600 text-green-600 hover:text-green-500" : "border-yellow-600 text-yellow-600 hover:text-yellow-500"}`}
                                onClick={handleStatusClick}
                            >
                                {data?.status ? "done" : "pending"}
                            </Button>}
                            <Button
                                variant='outline'
                                className="border-red-600 text-red-600 hover:text-red-400"
                                onClick={handleRemoveClick}
                            >
                                Remove
                            </Button>
                        </div>
                    </Card>
                </DialogContent>
            </Dialog>

            <AddEditModal
                tab={data?.tasks === undefined ? 'Task' : 'Note'}
                isDialogOpen={editDialog}
                setIsDialogOpen={setEditDialog}
                onSave={handleEdit}
                data={data}
                type={data?._id ? 'edit' : 'add'}
            />
        </>
    );
}

export default DetailModal;
