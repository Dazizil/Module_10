import {render, screen} from '@testing-library/react';
import StatTableBlock from './StatTableBlock';

describe('StatTableBlock', () => {
    test('renders Likes and Comments sections with tables', () => {
        render(<StatTableBlock />);

        expect(screen.getByText('Likes')).toBeInTheDocument();
        expect(screen.getByText('Comments')).toBeInTheDocument();

        const tables = screen.getAllByTestId('table-container');
        expect(tables).toHaveLength(2);
    });
});