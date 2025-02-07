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
        const {status,data} = await fetchTasksService(query);

        if (status === 200) {
            setTasks(data);
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
        const {status,data} = await addTaskService(noteData)
        if (status === 201) {
            setTasks((prev) => [...prev, data])
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

        const {status,data} = await updateTaskService(id, taskData);
        if (status===200) {            
            setTasks((prev) =>
                prev?.map((task) =>
                    task?._id === data?._id ? data : task
                )
            )
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
        const {status,data} = await updateTaskService(id, { isPinned: !isPinned });
        if (status===200) {
            setTasks((prev) =>
                prev?.map((task) =>
                    task?._id === data?._id ? data : task
                )
            )
            toast({
                description: `Task ${data?.isPinned ? 'pinned' : 'unpinned'} Successfully!`,
            });

        } else {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem pinning your task!",
            });
        }
    }

    const checkTask = async (task) => {

        const {status,data} = await updateTaskService(task?._id, { status: !task?.status });
        if (status===200) {
            setTasks((prev) =>
                prev?.map((task) =>
                    task?._id === data?._id ? data : task
                )
            )
            toast({
                description: `Task marked as ${data?.status ? 'done' : 'pending'} Successfully!`,
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
        const {status,data} = await removeTaskService(id);
        if (status===200) {
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
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
