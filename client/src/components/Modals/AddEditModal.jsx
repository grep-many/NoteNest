import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Check, X } from 'lucide-react';
import TagInput from '../TagInput';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';

const AddEditModal = ({tab, isDialogOpen, setIsDialogOpen, data, type = 'add', onSave = null, component = null }) => {
    const [title, setTitle] = useState(data?.title || '');
    const [content, setContent] = useState(data?.content || '');
    const [tags, setTags] = useState(data?.tags || []);
    
    // Update state when data prop changes
    useEffect(() => {
        setTitle(data?.title || '');
        setContent(data?.content || '');
        setTags(data?.tags || []);
    }, [data]);

    const validateNote = () => {
        return title !== "" && content !== "";
    }

    const handleSave = async () => {
        setIsDialogOpen(false);
        const noteData = {
            title,
            content,
            tags,
        }

        if (data?._id === undefined) {
            await onSave(noteData);
        } else {
            await onSave(data?._id, noteData);
        }
    };

    const handleCancel = () => {
        setIsDialogOpen(false);
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="justify-center backdrop-blur-md shadow bg-transparent">
                <DialogHeader>
                    <DialogTitle>{type === 'add' ? `Add ${tab}` : `Edit ${tab}`}</DialogTitle>
                    <DialogDescription>Fill out the details below</DialogDescription>
                </DialogHeader>
                <Card className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="note-title">Title</Label>
                        <Input
                            id="note-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter Title"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="note-content">Content</Label>
                        <Textarea
                            id="note-content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Enter Content"
                        />
                    </div>
                    <TagInput tags={tags} setTags={setTags} />
                    <div className="flex justify-end space-x-4">
                        <Button variant="outline" onClick={handleCancel} className="flex items-center space-x-2">
                            <X size={16} />
                            <span>Cancel</span>
                        </Button>
                        <Button onClick={handleSave} className="flex items-center space-x-2" disabled={!validateNote()}>
                            <Check size={16} />
                            <span>{type === 'add' ? 'Add' : 'Update'}</span>
                        </Button>
                    </div>
                </Card>
            </DialogContent>
        </Dialog>
    );
};

export default AddEditModal;
