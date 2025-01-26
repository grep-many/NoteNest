import { useToast } from "@/hooks/use-toast";
import { addTaskService, fetchTasksService, removeTaskService, updateTaskService } from "@/services/taskService";
import { useState, createContext, useContext, useEffect } from "react";
import { usePage } from "./PageProvider";

const TaskProviderContext = createContext(null);

export const TaskProvider = ({ children }) => {

    const { toast } = useToast();
    const [tasks, setTasks] = useState([]);
    const {searchText} = usePage();

    const getTasks = async (query = searchText) => {
        const response = await fetchTasksService(query);

        if (response?.status === 200) {
            setTasks(response?.data);
        } else {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem fetching your tasks",
            });
            handleLogout();
        }
    }

    const addTask = async (noteData) => {
        const response = await addTaskService(noteData)
        if (response.status === 201) {
            getTasks();
            toast({
                description: "Task added successfully!",
            });
        } else {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem adding your task!",
            });
        }
    }

    const editTask = async (id, taskData) => {

        const response = await updateTaskService(id, taskData);
        if (response?.data) {            
            getTasks();
            toast({
                description: "Task edited Successfully!!",
            });
        } else {
            toast({
                variant: "destructive", useContext,
                title: "Uh oh! Something went wrong.",
                description: "There was a problem editing your task!",
            });
        }
    }

    const pinTask = async (id,isPinned) => {
        const response = await updateTaskService(id, { isPinned: !isPinned });
        if (response?.data) {
            getTasks();
            toast({
                description: `Task ${response?.data?.isPinned ? 'pinned' : 'unpinned'} Successfully!`,
            });

        } else {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem pinning your task!",
            });
        }
    }

    const checkTask = async (id,status) => {

        const response = await updateTaskService(id, { status: !status });
        if (response?.data) {
            getTasks();
            toast({
                description: `Task marked as ${response?.data?.status ? 'done' : 'pending'} Successfully!`,
            });

        } else {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem pinning your task!",
            });
        }
    }

    const removeTask = async (id) => {
        const response = await removeTaskService(id);
        if (response?.data) {
            getTasks();
            toast({
                description: "Task removed Successfully!",
            });
        } else {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem removing your task!",
            });
        }
    }

    useEffect(() => {
        getTasks()
    }, [])

    const value = {
        tasks,
        getTasks,
        addTask,
        editTask,
        pinTask,
        removeTask,
        checkTask,
    }

    return (
        <TaskProviderContext.Provider value={value}>
            {children}
        </TaskProviderContext.Provider>
    );
}

export const useTask = () => {
    const context = useContext(TaskProviderContext);
    if (context === undefined) {
        throw new Error("useTask must be used within a TaskProvider");
    }
    return context;
}
