import React from 'react';
import Table from "../Table/Table";
import styles from './statTableBlock.module.css'

const StatTableBlock = () => {
    return (
        <div className={styles['stat-tables__container']} data-testid={'stat-table-block'}>
            <div className={styles['stat-table__container']}>
                <h1>Likes</h1>
                <Table/>
            </div>

            <div className={styles['stat-table__container']}>
                <h1>Comments</h1>
                <Table/>
            </div>
        </div>
    );
};

export default StatTableBlock;