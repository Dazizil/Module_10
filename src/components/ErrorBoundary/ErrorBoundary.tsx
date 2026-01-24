import React, {ReactNode} from "react";
import ErrorIcon from "../icons/ErrorIcon";
import './errorBoundary.css'

interface ErrorBoundaryProps {
    children: ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error: any): ErrorBoundaryState {
        return {hasError: true}
    }

    componentDidCatch(error: any) {
        console.log(error)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className={'error'}>
                    <div className={'error__image'}>
                        <ErrorIcon/>
                    </div>
                    <div className={'error__title'}>Oops...<br/>
                        Something bad has just happened
                    </div>
                </div>
            )
        }

        return this.props.children;
    }
}