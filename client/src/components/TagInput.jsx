import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CirclePlus, X } from 'lucide-react';
import React, { useState } from 'react';

const TagInput = ({ tags, setTags }) => {

    const [inputValue, setInputValue] = useState('');

    const addTags = () => {
        if (inputValue.trim() !== "") {
            setTags([...tags, inputValue.trim()]);
            setInputValue('');
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addTags();
        }
    }

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tags) => tags !== tagToRemove))
    }

    return (
        <div className="space-y-2">
            <Label htmlFor="note-tags">Tags</Label>
            <div className='max-h-[10vh] overflow-auto py-1'>
                {tags.length > 0 && tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className='mx-1 select-none'>
                        #{tag}
                        <X size={15} className='cursor-pointer' onClick={() => handleRemoveTag(tag)} />
                    </Badge>
                ))}
            </div>
            <div className="flex items-center gap-4 mt-3">
                <Input
                    type='text'
                    id="note-tags"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder='Add Tags'
                    onKeyDown={handleKeyDown}
                />
                <Button
                    className='w-8 h-8'
                    onClick={addTags}
                    disabled={inputValue ? false : true}
                >
                    <CirclePlus />
                </Button>
            </div>
        </div>
    );
}

export default TagInput;
