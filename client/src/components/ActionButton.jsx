import React, { useState } from 'react';
import { Button } from './ui/button';
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import AddEditModal from './Modals/AddEditModal';

const ActionButton = ({
    data,
    removeData = () => { },
    editData = () => { },
}) => {

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleModalAction = () => {
        setIsDialogOpen(true);
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="backdrop-blur bg-background/10">
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={handleModalAction}
                    >
                        <Edit /> Edit {data?.tasks === undefined ? 'Task' : 'Note'}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer text-red-500 focus:text-red-400"
                        onClick={() => removeData(data?._id)}
                    >
                        <Trash2 /> Remove {data?.tasks === undefined ? 'Task' : 'Note'}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AddEditModal
                tab={data?.tasks===undefined?'Task':'Note'}
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                onSave={editData}
                data={data}
                type={data?._id ? 'edit' : 'add'}
            />
        </ >
    );
}

export default ActionButton;
