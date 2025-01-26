import React, { useState } from 'react';
import { Button } from '../ui/button'; // Importing Button component from ShadCN
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '../ui/dialog';
import AuthModal from '../Modals/AuthModal';

const HeroSection = () => {

    const [isDialogOpen ,setIsDialogOpen] = useState(false);

    const closeDialog = ()=>{
        setIsDialogOpen(false);
    }

    return (
        <section id="Hero-Section" className="relative flex items-center justify-center min-h-[85vh] px-6 py-12">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black opacity-80"></div>

            {/* Hero Content */}
            <div className="relative text-center text-white">
                <h1 className="text-4xl font-bold mb-4">
                    Welcome to <strong>NoteNest</strong>: Your Personal To-Do List & Notes App
                </h1>
                <p className="text-lg mb-6">
                    Stay organized by managing your tasks and notes in one place. Simplify your
                    day-to-day activities with <strong>NoteNest</strong>.
                </p>

                {/* Call to Action Button */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="px-6 py-6 text-2xl font-semibold rounded-lg">
                            Get Started
                        </Button>
                    </DialogTrigger>
                    <DialogContent className='justify-center backdrop-blur-md shadow bg-transparent'>
                        <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <AuthModal tab={'signin'} closeDialog={closeDialog}/>
                    </DialogContent>
                </Dialog>
            </div>
        </section>
    );
};

export default HeroSection;
