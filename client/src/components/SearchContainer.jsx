import React from 'react';
import NoteContainer from './notes/NoteContainer';
import TaskContainer from './tasks/TaskContainer';
import { useTask } from '@/context/TaskProvider';

const SearchContainer = () => {

    const { tasks, editTask, removeTask, checkTask, addTask, pinTask } = useTask();

    const taskOpertaions = {
        remove: removeTask,
        edit: editTask,
        status: checkTask,
        add: addTask,
        pin: pinTask
    }

    return (
        <>
            <TaskContainer tasks={tasks} taskOperations={taskOpertaions} add={false} />
            <NoteContainer add={false} />
        </>
    );
}

export default SearchContainer;
