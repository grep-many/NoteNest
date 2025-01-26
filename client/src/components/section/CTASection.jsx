import React, { useState } from 'react';
import { Button } from '../ui/button'; // Import Button component from ShadCN
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import AuthModal from '../Modals/AuthModal';

const CTASection = () => {

    const [isDialogOpen ,setIsDialogOpen] = useState(false);
    
        const closeDialog = ()=>{
            setIsDialogOpen(false);
        }

    return (
        <section className="py-16">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">Ready to Get Organized?</h2>
                <p className="text-lg mb-8">
                    Join thousands of users who have transformed the way they manage tasks and notes. Take control of your productivity today with <strong>NoteNest</strong>.
                </p>

                {/* Call to Action Button */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="px-6 py-3 font-semibold rounded-lg">
                            Start Using NoteNest
                        </Button>
                    </DialogTrigger>
                    <DialogContent className='justify-center backdrop-blur-md shadow-2xl bg-transparent'>
                        <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <AuthModal tab={'signup'} closeDialog={closeDialog} />
                    </DialogContent>
                </Dialog>
            </div>
        </section>
    );
};

export default CTASection;
