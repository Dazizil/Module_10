import {render, screen} from "@testing-library/react";
import MetricCard from "./MetricCard";

describe('Metric Card test', () => {
    test('Render component', () => {
        render(<MetricCard/>);
        expect(screen.getByTestId('metric-card')).toBeInTheDocument();
        expect(screen.getByText('Title')).toBeInTheDocument();
        expect(screen.getByText('42,4124')).toBeInTheDocument();
        expect(screen.getByText('+20% month over month')).toBeInTheDocument();
    })
})