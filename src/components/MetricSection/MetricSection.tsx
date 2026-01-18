import React from 'react';
import MetricCard from "../MetricCard/MetricCard";
import './metricSection.css'

const MetricSection = () => {
    return (
        <div className={'metric-cards-container'}>
            <MetricCard/>
            <MetricCard/>
            <MetricCard/>
        </div>
    );
};

export default MetricSection;