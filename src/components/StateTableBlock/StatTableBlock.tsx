import React from 'react';
import Table from "../Table/Table";
import './statTableBlock.css'

const StatTableBlock = () => {
    return (
        <div className={'profile__tables-container'} data-testid={'stat-table-block'}>
            <div className={'profile__table-container '}>
                <h1>Likes</h1>
                <Table/>
            </div>

            <div className={'profile__table-container '}>
                <h1>Comments</h1>
                <Table/>
            </div>
        </div>
    );
};

export default StatTableBlock;