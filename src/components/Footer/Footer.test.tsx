import {render, screen} from "@testing-library/react";
import Footer from "./Footer";

describe('Footer test', () => {
    test('Render footer component', () => {
        render(<Footer/>);
        expect(screen.getByTestId('footer-container')).toBeInTheDocument();
    });
});