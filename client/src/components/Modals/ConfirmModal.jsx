import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { usePage } from '@/context/PageProvider';

const ConfirmModal = ({ isDialogOpen, setIsDialogOpen }) => {

    const {handleLogout} = usePage()

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="justify-center backdrop-blur-md shadow bg-transparent">
                <DialogHeader>
                    <DialogTitle>LogOut!</DialogTitle>
                    <DialogDescription>Confirm to logout!</DialogDescription>
                </DialogHeader>
                <Card className="p-6 space-y-6">
                    <p>Are you sure want to log out!</p>
                    <div className="flex justify-evenly">
                        <Button
                        variant="outline"
                        onClick={handleLogout}
                        >
                            Yes
                        </Button>
                        <Button>
                            No
                        </Button>
                    </div>
                </Card>
            </DialogContent>
        </Dialog>
    );
}

export default ConfirmModal;
