import React from 'react';
import Table from "../Table/Table";
import styles from './statTableBlock.module.css'

const StatTableBlock = () => {
    return (
        <div className={styles['stat-table__tables-container']} data-testid={'stat-table-block'}>
            <div className={styles['stat-table__table-container']}>
                <h1 className={styles['stat-table__table-header']}>Likes</h1>
                <Table/>
            </div>

            <div className={styles['stat-table__table-container']}>
                <h1 className={styles['stat-table__table-header']}>Comments</h1>
                <Table/>
            </div>
        </div>
    );
};

export default StatTableBlock;