import React, { useState } from "react";
import { LucideCode2, Menu } from 'lucide-react';
import "@/styles/sidebar.css";

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
            className="toggle-btn"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu />
          </button>
    <div className={`sidebar ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <div className="header">
            <h1>Gallery</h1>
        </div>
        <div className="content">
            {collections.length === 0 ? (
                <div className="item">No collections</div>
            ) : (
            collections.map( collection => (
                <div
                    className="item"
                    key={collection.id}
                    onClick={() => itemClicked(collection.id)}
                >
                    {collection.title}
                </div>
            ))
        )}
        </div>
        <div className="footer">
            <div className="github">
                <a href="https://github.com/YianAndCode/gallery" target="_blank">
                    <LucideCode2 />
                </a>
            </div>
        </div>
    </div></>
};

export {
    Sidebar,
}