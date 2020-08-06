class StateManager {
    static instance;

    static getInstance() {
        if (!StateManager.instance) {
            StateManager.instance = new StateManager();
        }

        return StateManager.instance;
    }

    constructor() {
        this.subscribers = {}
    }

    push(event, payload = {}) {
        if (!Object.keys(this.subscribers).indexOf(event)) {
            this.subscribers[event].forEach(callback => callback(payload))
        }
    }

    subscribe(event, callback) {
        if (!!Object.keys(this.subscribers).indexOf(event)) {
            this.subscribers[event] = []
        }

        this.subscribers[event].push(callback)
    }
}

export default StateManager;