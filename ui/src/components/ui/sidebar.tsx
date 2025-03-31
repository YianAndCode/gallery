import React, { useState } from "react";
import { LucideCode2, Menu } from 'lucide-react';

interface Collection {
    id: string;
    title: string;
}

interface SidebarItemsProps {
    collections: Collection[];
    onItemClicked: (collId: string) => void;
}

const Sidebar = ({ collections = [], onItemClicked }: SidebarItemsProps ) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    function itemClicked(id: string) {
        onItemClicked(id);
        setIsSidebarOpen(false);
    }

    return <>
    {/* 侧边栏切换按钮 */}
          <button
            className="absolute min-md:hidden bottom-[1rem] left-[1rem] bg-[#333] text-[#fafafa] px-[1rem] py-[0.5rem] border-none cursor-pointer rounded-[10px] z-[1100]"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu />
          </button>
    <div className={`grid grid-rows-[auto_1fr_auto] w-[300px] h-screen px-2 bg-[#fafafa] transition-transform duration-300 ease-in-out max-md:fixed max-md:left-0 max-md:top-0 max-md:bottom-0 max-md:z-[1000] max-md:${isSidebarOpen ? "translate-x-[0]" : "-translate-x-full"}`}>
        <div className="flex justify-center items-center h-[60px]">
            <h1 className="text-[1.2rem] text-[#3f3f3f] font-semibold">Gallery</h1>
        </div>
        <div className="p-2 overflow-y-scroll">
            {collections.length === 0 ? (
                <div className="text-[#3f3f3f] text-[0.9rem]">No collections</div>
            ) : (
            collections.map( collection => (
                <div
                    className="text-[#3f3f3f] text-[0.9rem] cursor-pointer whitespace-nowrap
                                text-ellipsis w-full overflow-hidden py-[0.2rem] border-b border-dashed border-[#eaeaea]
                                transition-transform duration-300 ease-in-out
                                hover:scale-[1.05] hover:text-[#b62e2e]"
                    key={collection.id}
                    onClick={() => itemClicked(collection.id)}
                >
                    {collection.title}
                </div>
            ))
        )}
        </div>
        <div className="flex h-[2.5rem] justify-center items-center border-t border-solid border-[#eee]">
            <div className="font-[0.8rem] transition-transform duration-300 ease-in-out hover:scale-[1.05]">
                <a className="text-[#3f3f3f] no-underline hover:text-[#b62e2e]" href="https://github.com/YianAndCode/gallery" target="_blank">
                    <LucideCode2 />
                </a>
            </div>
        </div>
    </div></>
};

export {
    Sidebar,
}