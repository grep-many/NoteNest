import React from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNote } from "@/context/NoteProvider";
import { useTask } from "@/context/TaskProvider";
import { usePage } from "@/context/PageProvider";
import { Badge } from "./ui/badge";
import DetailModal from "./Modals/DetailModal";
import RadialChart from "./graphs/radialCharts";
import { TrendingUp } from "lucide-react";
import BarChartComponent from "./graphs/barChart";
import LineChartComponent from "./graphs/lineGraph";
import AddEditModal from "./Modals/AddEditModal";

const Dashboard = ({ taskOperations }) => {

    const { notes, editNote, removeNote } = useNote();
    const { tasks, editTask, removeTask } = useTask();
    const [isDetailDialogOpen, setIsDetailDialogOpen] = React.useState(false);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [detailModalContent, setDetailModalContent] = React.useState({})

    const handledetail = (mode, data) => {
        setIsDetailDialogOpen(true);
        if (mode === "note") {
            setDetailModalContent({
                data: data,
                edit: editNote,
                remove: removeNote,
            });
        } else {
            setDetailModalContent({
                data: data,
                edit: editTask,
                remove: removeTask,
            });
        }
    }

    const { auth } = usePage();
    const user = auth?.user;

    const completedTasks = tasks.filter(task => task.status === true);
    const pendingTasks = tasks.filter(task => task.status === false);
    const pinnedTasks = tasks.filter(task => task.isPinned);
    const pinnedNotes = notes.filter(note => note.isPinned);

    return (
        <div className="flex flex-col space-y-6 p-4 lg:p-6">
            {/* Header Section */}
            <header id="stats" className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Welcome back, {user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase()}!</h1>
                    <p className="text-sm text-gray-500">Here’s a snapshot of your productivity.</p>
                </div>
                <Button onClick={setIsDialogOpen}>
                    Add Tasks
                </Button>
            </header>

            {/* Productivity Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Completion Rate</CardTitle>
                    </CardHeader>
                    {tasks.length ?
                        <>
                            <CardContent>
                                <RadialChart
                                    data={[
                                        { browser: "total", visitors: tasks.length, fill: "hsl(var(--chart-1))" },
                                        { browser: "pending", visitors: pendingTasks.length, fill: "hsl(var(--chart-2))" },
                                        { browser: "completed", visitors: completedTasks.length, fill: "hsl(var(--chart-3))" },
                                    ]}
                                />
                            </CardContent>
                            <CardFooter className="flex-col gap-2 text-sm">
                                {tasks.length > 0 && <div className="flex text-muted-foreground items-center gap-2 font-medium leading-none">
                                    Task Completion rate is {((completedTasks.length / tasks.length) * 100).toFixed(2)}% <TrendingUp className="h-4 w-4" />
                                </div>}
                            </CardFooter>
                        </>
                        :
                        <CardContent>
                            <p className="text-center">No Tasks available.</p>
                        </CardContent>
                    }
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Task Progress</CardTitle>
                    </CardHeader>
                    {tasks.length ?
                        <>
                            <CardContent>
                                <BarChartComponent
                                    data={[
                                        { title: "Done", frequency: completedTasks.length },
                                        { title: "Pending", frequency: pendingTasks.length },
                                        { title: "Total", frequency: tasks.length },
                                    ]}
                                />
                            </CardContent>
                            <CardFooter className="flex-col gap-2 text-sm">
                                <div className="flex text-muted-foreground items-center gap-2 font-medium leading-none">
                                    Completed {completedTasks.length} {completedTasks.length>1?"Task's":"Task" } out of {tasks.length}
                                    <TrendingUp className="h-4 w-4" />
                                </div>
                            </CardFooter>
                        </>
                        :
                        <CardContent>
                            <p className="text-center">No Tasks available.</p>
                        </CardContent>}
                </Card>

                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tasks Over Time</CardTitle>
                        </CardHeader>
                        {tasks.length ?
                            <>
                                <CardContent>
                                    <LineChartComponent
                                        data={tasks.map(task => ({
                                            label: task.createdAt.split('T')[0],
                                            completed: task.status ? 1 : 0,
                                        }))}
                                    />
                                </CardContent>
                            </> :
                            <CardContent>
                                <p className="text-center">No Tasks available.</p>
                            </CardContent>
                        }
                    </Card>
                </div>
            </div>

            {/* Pinned Section */}
            <div id="pinned" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Pinned Tasks
                            {pinnedTasks.length - pinnedTasks.slice(0, 3).length > 0
                                && <Badge className="ml-2 rounded">
                                    {pinnedTasks.length - pinnedTasks.slice(0, 3).length+1}+
                                </Badge>}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="max-h-48">
                            {pinnedTasks.filter(task => task.status !== true).length ? (
                                pinnedTasks.filter(task => task.status !== true).slice(0, 3).map(task => (
                                    <div
                                        key={task._id}
                                        className="py-2 border-t cursor-pointer"
                                        onClick={() => handledetail("task", task)}
                                    >
                                        <h3 className="font-semibold">{task.title}</h3>
                                        <p className="text-sm text-gray-600">{task.content.slice(0, 45) + (task.content.length > 45 ? '...' : '')}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No pinned pending tasks available.</p>
                            )}
                        </ScrollArea>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            Pinned Notes
                            {pinnedNotes.length - pinnedNotes.slice(0, 3).length > 0
                                && <Badge className="ml-2 rounded">
                                    {pinnedNotes.length - pinnedNotes.slice(0, 3).length+1}+
                                </Badge>}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="max-h-48">
                            {pinnedNotes.length ? (
                                pinnedNotes.slice(0, 3).map(note => (
                                    <div
                                        key={note._id}
                                        className="py-2 border-t cursor-pointer"
                                        onClick={() => handledetail("note", note)}

                                    >
                                        <h3 className="font-semibold">{note.title}</h3>
                                        <p className="text-sm text-gray-600">{note.content.slice(0, 45) + (note.content.length > 45 ? '...' : null)}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No pinned notes available.</p>
                            )}
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>

            <DetailModal
                data={detailModalContent?.data}
                handleEdit={detailModalContent?.edit}
                handleRemove={detailModalContent?.remove}
                isDialogOpen={isDetailDialogOpen}
                setIsDialogOpen={setIsDetailDialogOpen} // Pass the setter function correctly here
            />

            <AddEditModal
                tab={"Task"}
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                onSave={taskOperations?.add}
                data={{
                    id: null,
                    title: '',
                    content: '',
                    tags: []
                }}
                type='add'
            />
        </div>
    );
};

export default Dashboard;
