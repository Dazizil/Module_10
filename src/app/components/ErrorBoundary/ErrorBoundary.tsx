'use client'
import React, {ReactNode} from "react";
import ErrorIcon from "../icons/ErrorIcon";
import './errorBoundary.module.css'
import styles from "@/app/(auth)/ProfilePage/profilePage.module.css";

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
                <div className={styles['error']}>
                    <div className={styles['error__image']}>
                        <ErrorIcon/>
                    </div>
                    <div className={styles['error__title']}>Oops...<br/>
                        Something bad has just happened
                    </div>
                </div>
            )
        }

        return this.props.children;
    }
}