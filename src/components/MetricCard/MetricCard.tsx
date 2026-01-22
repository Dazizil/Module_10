import React from 'react';
import styles from './metricCard.module.css'

const MetricCard = () => {
    return (
        <div data-testid={'metric-card'} className={styles['metric-cord']}>
            <div className={styles['metric-card-content-container']}>
                <h2 className={styles['profile__stat-block-title']}>Title</h2>
                <div className={styles['metric-card-numbers']}>42,4124</div>
                <span className={styles['metric-card-text']}>+20% month over month</span>
            </div>
        </div>
    );
};

export default MetricCard;