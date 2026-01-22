import React from 'react';
import MetricCard from "../MetricCard/MetricCard";
import styles from './metricSection.module.css'

const MetricSection = () => {
    return (
        <div className={styles['metric-cards-container']} data-testid={'metric-cards-container'}>
            <MetricCard/>
            <MetricCard/>
            <MetricCard/>
        </div>
    );
};

export default MetricSection;