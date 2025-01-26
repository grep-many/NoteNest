import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import DetailModal from "../Modals/DetailModal";

const SideBarContentOptions = ({ items, setActiveTab }) => {

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [subItemSelected,setSubItemSelected] = useState(null);

    const handleClickSubItem = (subItemData) => {
        setIsDialogOpen(true);
        setSubItemSelected(subItemData)
    }

    return (
        <>
            <SidebarGroup>
                <SidebarGroupLabel></SidebarGroupLabel>
                <SidebarMenu>
                    {items.map((item) => {
                        if (!item?.title) return null;

                        return (
                            <Collapsible
                                key={item.title}
                                asChild
                                defaultOpen={item.isActive}
                                className="group/collapsible"
                            >
                                <SidebarMenuItem onClick={() => setActiveTab(item.value)}>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton tooltip={item.title}>
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items?.map((subItem) => (
                                                <SidebarMenuSubItem
                                                    key={subItem.title + subItem?.id}
                                                    className="cursor-pointer"
                                                >
                                                    <SidebarMenuSubButton asChild>
                                                        {subItem.url ? (
                                                            <a href={subItem.url}>
                                                                <span>{subItem.title}</span>
                                                            </a>
                                                        ) : (
                                                            <div
                                                                className="select-none"
                                                                onClick={()=>handleClickSubItem(subItem)}
                                                            >
                                                                <span>{subItem.title}</span>
                                                            </div>
                                                        )}
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        );
                    })}
                </SidebarMenu>
            </SidebarGroup>

            <DetailModal
                sidebarItem={true}
                data={subItemSelected?.data}
                handleEdit={
                    subItemSelected?.operations?.edit
                }
                handleRemove={
                    subItemSelected?.operations?.remove
                }
                handleStatus={
                    subItemSelected?.operations?.status
                }
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
            />
        </>
    );
};

export default SideBarContentOptions;
