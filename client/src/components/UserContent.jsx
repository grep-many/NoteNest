import { ChartPie, ListTodo, NotepadText } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import NoteContainer from './notes/NoteContainer';
import SearchContainer from './SearchContainer';
import { useTask } from '@/context/TaskProvider';
import { SidebarInset, SidebarProvider, SidebarTrigger } from './ui/sidebar';
import { Separator } from './ui/separator';
import SearchBar from './SearchBar';
import AppSidebar from './sidebar/Sidebar';
import { useNote } from '@/context/NoteProvider';
import TasksPage from '@/pages/Home/user/TasksPage';
import Dashboard from './Dashboard';

const UserContent = () => {

    const [activeTab, setActiveTab] = useState('dashboard');
    const { notes, editNote, removeNote } = useNote();
    const { tasks, addTask, editTask, removeTask, checkTask } = useTask();

    const noteOpertaions = {
        remove: removeNote,
        edit: editNote,
    }

    const taskOpertaions = {
        remove: removeTask,
        edit: editTask,
        status: checkTask,
        add: addTask,
    }

    const [navItems, setNavItems] = useState([
        {
            title: "Dashboard",
            icon: ChartPie,
            value: 'dashboard',
            component: <Dashboard taskOperations={taskOpertaions} />,
            isActive: true,
            items: [
                { title: "Productivity", url: "#stats" },
                { title: "Top Pinned", url: "#pinned" },
            ],
        },
        {
            title: "Todo",
            icon: ListTodo,
            value: 'tasks',
            component: <TasksPage />,
            items: [],
        },
        {
            title: "Notes",
            icon: NotepadText,
            value: 'notes',
            component: <NoteContainer />,
            items: [],
        },
        {
            value: 'search',
            component: <SearchContainer />
        }
    ]);

    useEffect(() => {
        // Prepare updated nav items
        const updatedNavItems = navItems.map((item) => {
            if (item.value === 'notes') {
                // Update the notes items with the latest notes
                return {
                    ...item,
                    items: [
                        ...item.items.filter((note) => !note.id), // Keep static items only
                        ...notes.slice(0, 3).map((note) => ({
                            title: note.title,
                            id: note._id,
                            data: note,
                            operations: noteOpertaions,
                        })),
                    ],
                };
            }

            if (item.value === 'tasks') {
                // Update the tasks items with the latest tasks
                return {
                    ...item,
                    items: [
                        ...item.items.filter((task) => !task.id), // Keep static items only
                        ...tasks.slice(0, 3).map((task) => ({
                            title: task.title,
                            id: task._id,
                            data: task,
                            operations: taskOpertaions,
                        })),
                    ],
                };
            }

            return item;
        });

        // Now set the updated nav items state in one go
        setNavItems(updatedNavItems);

    }, [notes, tasks]); // Runs when either notes or tasks change

    return (
        <>
            <SidebarProvider>
                {/* <AppSidebar navitems={navitems} active={setActiveTab} /> */}
                <AppSidebar navItems={navItems} setActiveTab={setActiveTab} />
                <SidebarInset>
                    <header className="sticky top-0 w-full flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 backdrop-blur">
                        <div className="flex items-center gap-2 px-4 w-full">
                            <SidebarTrigger />
                            <Separator orientation="vertical" className="mr-2 h-4" />
                            <SearchBar activeTab={activeTab} setActiveTab={setActiveTab} />
                        </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        {navItems.map(navitem => navitem.value === activeTab && (
                            <div key={navitem.value}>
                                {navitem.component}
                            </div>
                        ))}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}

export default UserContent;
