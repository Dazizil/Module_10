import React from 'react';
import styles from './sidebar.module.css'
import SuggestedPeople from "../SuggestedPeople/SuggestedPeople";
import Communities from "../Communities/Communities";

const Sidebar = () => {
    return (
        <aside className={styles['sidebar-container']} data-testid={'sidebar-container'}>
            <SuggestedPeople/>
            <Communities/>
        </aside>
    );
};

export default Sidebar;