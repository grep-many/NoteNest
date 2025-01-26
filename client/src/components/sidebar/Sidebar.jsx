import React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import SideBarHeaderContent from "./SidebarHeaderContent";
import SideBarContentOptions from "./SidebarContentOptions";
import SideBarUser from "./SideBarUser";
import { usePage } from "@/context/PageProvider";

// Sample data
const AppSidebar = (props) => {

    const {navItems,setActiveTab,...restProps} = props;

    const { auth } = usePage();

    return (
        <Sidebar collapsible="icon" {...restProps}>
            <SidebarHeader>
                <SideBarHeaderContent name={'NoteNest'} />
            </SidebarHeader>
            <SidebarContent>
                <SideBarContentOptions setActiveTab={setActiveTab} items={navItems} />
            </SidebarContent>
            <SidebarFooter>
                <SideBarUser user={auth.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}

export default AppSidebar;
