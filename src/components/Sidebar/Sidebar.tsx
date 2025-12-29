import React from 'react';
import './sidebar.css'
import SuggestedPeople from "../SuggestedPeople/SuggestedPeople";
import Communities from "../Communities/Communities";

const Sidebar = () => {
    return (
        <aside className={'sidebar-container'}>
            <SuggestedPeople/>
            <Communities/>
        </aside>
    );
};

export default Sidebar;