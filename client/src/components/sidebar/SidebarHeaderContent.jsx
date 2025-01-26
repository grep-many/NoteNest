import React from "react";
import { assets } from "@/assets/assets";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import ModeToggle from "../ModeToggle";

const SideBarHeaderContent = ({ name }) => {
    const { isMobile } = useSidebar(); // Determines if the sidebar is in mobile view

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <div
                    size="lg"
                    className="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-background"
                >
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                            <img src={assets.logo} alt="" />
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="text-xl truncate font-bold">{name}</span>
                        </div>
                        <ModeToggle isMobile={isMobile} />
                </div>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};

export default SideBarHeaderContent;
