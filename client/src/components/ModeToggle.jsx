import React from 'react';

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from '@/context/ThemeProvider';
import { Moon, Sun } from 'lucide-react';
import { useSidebar } from './ui/sidebar';

const ModeToggle = ({isMobile=true}) => {

    const { theme, setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className='min-w-10 backdrop-blur bg-background/60'>
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className={`${isMobile?'':'mt-4'} backdrop-blur bg-background/10`}
                side={isMobile ? "bottom" : "right"}
                sideOffset={4}
            >
                <DropdownMenuCheckboxItem className="bg-background/60 my-1 cursor-pointer" checked={theme === "light"} onCheckedChange={() => setTheme("light")}>
                    Light
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="bg-background/60 my-1 cursor-pointer" checked={theme === "dark"} onCheckedChange={() => setTheme("dark")}>
                    Dark
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="bg-background/60 my-1 cursor-pointer" checked={theme === "system"} onCheckedChange={() => setTheme("system")}>
                    System
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default ModeToggle;
