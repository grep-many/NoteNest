import React from 'react';
import { Link } from 'react-router-dom';
import ModeToggle from './ModeToggle';
import { Separator } from './ui/separator';
import { assets } from '@/assets/assets';

const Navbar = () => {

    return (
        <header className='backdrop-blur bg-background/30 fixed w-full top-0 z-10'>
            <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
                <div className="text-2xl font-bold">
                    <Link to="/" className='flex'>
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground mr-2">
                            <img src={assets.logo} alt="" />
                        </div>
                        NoteNest
                    </Link>
                </div>
                <ModeToggle />
            </div>
            <Separator />
        </header>
    );
};

export default Navbar;
