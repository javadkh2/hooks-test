export const withHooks = (component: (props: any) => any) => {
    const initialState = {
        order: 0,
        first: true,
        store: {},
        reset: () => { },
        props: {},
    };
    const initialHooks = (state: any) => ({
        setState: setStateFactory(state)
    })

    const state = { ...initialState }
    const hooks = { ...initialHooks(state) }
    
    return (props: any) => {
        state.props = props;
        const run = (props: any) => {
            state.order = 0;
            return component({ ...props, hooks })
        }
        return component({ ...props, hooks })
    }
}

function setStateFactory(state: any) {
    return (initial: any) => {
        const value = state.store[state.order] = state.first ? initial : state.store[state.order];
        state.first = false;
        const order = state.order;
        state.order += 1;
        const setState = (newValue: any) => {
            state.store[order] = newValue;
            state.reset();
        }
        return [
            value,
            setState
        ]
    }
}

export function run(component: (...args: any) => any, ...args: any) {
    return component(...args);
}