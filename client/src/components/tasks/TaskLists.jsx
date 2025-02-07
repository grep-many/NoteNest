import React, { useState } from 'react';
import { TableCell, TableRow } from '../ui/table';
import { Pin, PinOff } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import ActionButton from '../ActionButton';
import { useSidebar } from '../ui/sidebar';
import DetailModal from '../Modals/DetailModal';

const TaskLists = ({
    task = [],
    taskOperations={},
}) => {

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { isMobile } = useSidebar();

    return (
        <>
            <TableRow className='cursor-pointer'>
                <TableCell
                    className="w-1"
                    onClick={() => taskOperations?.pin(task?._id, task?.isPinned)}
                >
                    {task?.isPinned ?
                        <Pin size={18} color='blue' />
                        : <PinOff size={18} />}

                </TableCell>
                <TableCell
                    className={task?.status ? 'text-green-600 line-through' : 'text-yellow-700'}
                    onClick={setIsDialogOpen}
                >
                    {task?.title.trim().slice(0, isMobile ? 25 : 120) + (task?.title.length > (isMobile ? 25 : 120) ? "..." : "")}
                </TableCell>
                <TableCell
                    className="[&:has([role=checkbox])]:pr-2 w-[70px] select-none"
                    onClick={() => taskOperations?.status(task)}
                >
                    <div className={`flex items-center justify-end ${task.status ? 'text-green-500' : 'text-yellow-700'}`}>
                        {task.status ? 'done' : 'pending'}
                        <Checkbox
                            checked={task?.status}
                            className={"ml-2 border-yellow-700 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 "}
                        />
                    </div>
                </TableCell>
                <TableCell className="flex justify-end">
                    <ActionButton
                        data={task}
                        removeData={taskOperations?.remove}
                        editData={taskOperations?.edit}
                    />
                </TableCell>
            </TableRow>
            <DetailModal
                data={task}
                handleStatus={taskOperations?.status}
                handleEdit={taskOperations?.edit}
                handleRemove={taskOperations?.remove}
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen} // Pass the setter function correctly here
            />
        </>
    );
}

export default TaskLists;
