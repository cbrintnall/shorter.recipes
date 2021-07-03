import React from 'react';
import { AppState } from './common.interface';

type StatefulCallback = (x: {}) => void;

// State providers
export const InitialStateContext = React.createContext<AppState | undefined>(undefined);

class StateManager {
    static instance: StateManager;

    static getInstance() {
        if (!StateManager.instance) {
            StateManager.instance = new StateManager();
        }

        return StateManager.instance;
    }

    private subscribers: Record<string, Array<StatefulCallback>> = {};

    constructor() {
        this.subscribers = {}
    }

    push(event: string, payload = {}) {
        if (!Object.keys(this.subscribers).indexOf(event)) {
            this.subscribers[event].forEach(callback => callback(payload))
        }
    }

    subscribe(event: string, callback: StatefulCallback) {
        if (!!Object.keys(this.subscribers).indexOf(event)) {
            this.subscribers[event] = []
        }

        this.subscribers[event].push(callback)
    }
}

export default StateManager;