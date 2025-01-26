import TaskContainer from '@/components/tasks/TaskContainer';
import { useTask } from '@/context/TaskProvider';
import React from 'react';

const TasksPage = () => {

    const { tasks, editTask, removeTask, checkTask,addTask,pinTask } = useTask();

    const taskOpertaions = {
        remove: removeTask,
        edit: editTask,
        status: checkTask,
        add : addTask,
        pin:pinTask
    }

    return <TaskContainer tasks={tasks} taskOperations={taskOpertaions} />;
}

export default TasksPage;
