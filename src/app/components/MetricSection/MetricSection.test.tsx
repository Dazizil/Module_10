import MetricSection from "./MetricSection";
import {render, screen} from "@testing-library/react";

describe('Metric Section test', () => {
    test('this component has been rendered and has rendered all child components', () => {
        render(<MetricSection/>);
        expect(screen.getByTestId('metric-cards-container')).toBeInTheDocument();
        const metricCards = screen.getAllByTestId('metric-card');
        expect(metricCards).toHaveLength(3);
    })
})