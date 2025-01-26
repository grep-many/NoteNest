import React from 'react';
import {
    ChevronsUpDown,
    LogOut,
    UsersRound,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import FeedbackModal from '../Modals/FeedBackModal/FeedbackModal';
import ConfirmModal from '../Modals/ConfirmModal';

const SideBarUser = ({ user }) => {
    const { isMobile } = useSidebar(); // Determines if the view is mobile or desktop
    const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = React.useState(false)
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = React.useState(false)

    return (
        <>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            >
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarFallback className="rounded-lg">{
                                        user?.name.split(" ")[0].charAt(0).toUpperCase()
                                    }</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        {user?.name.charAt(0).toUpperCase() + user?.name?.slice(1).toLowerCase()}
                                    </span>
                                    <span className="truncate text-xs">{user?.email}</span>
                                </div>
                                <ChevronsUpDown className="ml-auto size-4" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-[--radix-dropdown-menu-trigger-width] bg-background/60 backdrop-blur min-w-56 rounded-lg"
                            side={isMobile ? 'bottom' : 'right'}
                            align="end"
                            sideOffset={4}
                        >
                            <DropdownMenuLabel className="p-0 font-normal">
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <Avatar src={user?.img} className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={user.avatar} alt={user?.name} />
                                        <AvatarFallback className="rounded-lg">
                                            {user?.name.split(" ")[0].charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">
                                            {user?.name.charAt(0).toUpperCase() + user?.name?.slice(1).toLowerCase()}
                                        </span>
                                        <span className="truncate text-xs">{user?.email}</span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer" onClick={setIsFeedbackDialogOpen}>
                                <UsersRound />
                                Feedback
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-500" onClick={setIsConfirmDialogOpen}>
                                <LogOut />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>

            <FeedbackModal
                isDialogOpen={isFeedbackDialogOpen}
                setIsDialogOpen={setIsFeedbackDialogOpen}
            />

            <ConfirmModal
                isDialogOpen={isConfirmDialogOpen}
                setIsDialogOpen={setIsConfirmDialogOpen}
            />
        </>
    );
};

export default SideBarUser;
