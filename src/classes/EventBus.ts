type EventBusActionType = {
    event: string;
    callback: (...args: unknown[]) => void;
}

class EventBus {
    listeners: Record<string, Function[]>;
    constructor() {
        this.listeners = {};
    }

    on({event, callback}: EventBusActionType) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    off({event, callback}: EventBusActionType) {
        if (!this.listeners[event]) {
            throw new Error(`${event} not found`);
        }

        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback
        );
    }

    emit(event: string, ...args: unknown[]) {
        if (!this.listeners[event]) {
            throw new Error(`${event} not found`);
        }

        this.listeners[event].forEach(listener => {
            listener(...args);
        });
    }
}

export default EventBus;
