import React from "react";
import { TaskProvider } from "@/context/TaskProvider";
import UserContent from "@/components/UserContent";
import { NoteProvider } from "@/context/NoteProvider";

export default function UserPage() {


    return (
        <TaskProvider>
            <NoteProvider>
                <UserContent />
            </NoteProvider>
        </TaskProvider>
    );
}