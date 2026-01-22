import React from 'react';
import './metricCard.css'

const MetricCard = () => {
    return (
        <div data-testid={'metric-card'} className={'metric-cord'}>
            <div className={'metric-card-content-container'}>
                <h2 className={'profile__stat-block-title'}>Title</h2>
                <div className={'metric-card-numbers'}>42,4124</div>
                <span className={'metric-card-text'}>+20% month over month</span>
            </div>
        </div>
    );
};

export default MetricCard;