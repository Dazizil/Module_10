import Sidebar from "./Sidebar";
import {render, screen} from "@testing-library/react";

describe('Sidebar test', () => {
    test('this component has been rendered and has rendered all child components', () => {
        render(<Sidebar/>);

        expect(screen.getByTestId('sidebar-container')).toBeInTheDocument();
        expect(screen.getByTestId('suggested-people-container')).toBeInTheDocument();
        expect(screen.getByTestId('communities-section')).toBeInTheDocument();
    })
})