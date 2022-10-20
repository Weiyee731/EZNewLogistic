import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, Provider } from 'react-redux'

export default function Homepage() {
    const { loading, state } = useSelector(state => ({
        loading: state.counterReducer.loading,
        state: state.counterReducer,
    }));

    const dispatch = useDispatch()

    console.log(state)

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React from branch dev
                </a>
            </header>
        </div>
    );
}