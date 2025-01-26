import React, { useState } from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/table';
import { Pin, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EmptyCard from '../cards/EmptyCard';
import { assets } from '@/assets/assets';
import TaskLists from './TaskLists';
import AddEditModal from '../Modals/AddEditModal';

const TaskContainer = ({ add = true,
    tasks = [],
    taskOperations = {},
}) => {

    const [isPinned, setIsPinned] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const initialTask = {
        id: null,
        title: '',
        content: '',
        tags: []
    }
    const [task, setTask] = useState(initialTask);

    const handleDialog = () => {
        setTask(initialTask);
        setIsDialogOpen((isDialogOpen) => !isDialogOpen);
    }

    return (
        <>
            <div className='container mt-3'>
                <h1 className='text-3xl font-semibold mb-3'>Tasks</h1>
                <div className="px-2">

                    {tasks.length ? <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead
                                    className="w-1"
                                    onClick={() => setIsPinned(!isPinned)}
                                >
                                    <Pin
                                        size={18}
                                    />
                                </TableHead>
                                <TableHead>Task's</TableHead>
                                <TableHead className="w-[70px] text-center">Status</TableHead>
                                <TableHead className="text-right w-[70px]">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                tasks.map((task, index) => (
                                    <TaskLists
                                        key={index}
                                        task={task}
                                        taskOperations={taskOperations}
                                    />
                                ))
                            }
                        </TableBody>
                    </Table> :
                        <EmptyCard action={handleDialog} img={assets.addTaskImg} message='You don’t have any tasks yet! Why not start with one?' />
                    }
                </div>
            </div>

            {add && tasks.length > 0 &&
                (<Button
                    className="backdrop-blur bg-foreground/70 text-background hover:bg-foreground/50 hover:text-background w-16 h-16 items-center justify-center rounded-2xl fixed right-10 bottom-5"
                    onClick={handleDialog}
                >
                    <Plus />
                </Button>
                )}
            <AddEditModal
                tab={"Task"}
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                onSave={taskOperations.add}
                data={task}
                type='add'
            />
        </>
    );
}

export default TaskContainer;


