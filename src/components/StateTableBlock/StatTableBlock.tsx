import React from 'react';
import Table from "../Table/Table";
import './statTableBlock.css'

const StatTableBlock = () => {
    return (
        <div className={'stat-table__tables-container'} data-testid={'stat-table-block'}>
            <div className={'stat-table__table-container'}>
                <h1 className={'stat-table__table-header'}>Likes</h1>
                <Table/>
            </div>

            <div className={'stat-table__table-container'}>
                <h1  className={'stat-table__table-header'}>Comments</h1>
                <Table/>
            </div>
        </div>
    );
};

export default StatTableBlock;