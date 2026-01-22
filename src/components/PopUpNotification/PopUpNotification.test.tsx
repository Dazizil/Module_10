import {fireEvent, render, screen} from '@testing-library/react';
import PopUpNotification from './PopUpNotification';
import {act} from 'react';

describe('PopUpNotification', () => {
    const mockOnClose = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('does not render when isVisible is false', () => {
        render(
            <PopUpNotification
                message="Test message"
                isVisible={false}
                onClose={mockOnClose}
            />
        );

        expect(screen.queryByText('Test message')).not.toBeInTheDocument();
    });

    test('renders message when isVisible is true', () => {
        render(
            <PopUpNotification
                message="Hello, world!"
                isVisible={true}
                onClose={mockOnClose}
            />
        );

        expect(screen.getByText('Hello, world!')).toBeInTheDocument();
        expect(screen.getByTestId('close-image')).toBeInTheDocument();
    });

    test('calls onClose after 3 seconds when visible', () => {
        render(
            <PopUpNotification
                message="Auto-close"
                isVisible={true}
                onClose={mockOnClose}
            />
        );

        act(() => {
            jest.advanceTimersByTime(3000);
        });

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test('clears timeout if component unmounts before 3 seconds', () => {
        const { unmount } = render(
            <PopUpNotification
                message="Will not close"
                isVisible={true}
                onClose={mockOnClose}
            />
        );

        act(() => {
            jest.advanceTimersByTime(2000);
        });
        expect(mockOnClose).not.toHaveBeenCalled();

        unmount();

        act(() => {
            jest.advanceTimersByTime(2000);
        });

        expect(mockOnClose).not.toHaveBeenCalled();
    });

    test('calls onClose when close button is clicked', () => {
        render(
            <PopUpNotification
                message="Click to close"
                isVisible={true}
                onClose={mockOnClose}
            />
        );

        const closeButton = screen.getByTestId('close-image');
        fireEvent.click(closeButton);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
});