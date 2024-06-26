import { createReducer, on } from "@ngrx/store";
// import { CounterActions } from "./counter.actions";
import { decrement, increment, set } from "./counter.actions";

const initialState = 0

export const counterReducer = createReducer(
    initialState,
    on(increment, (state, action) => {
        const newState = state + action.value
        return newState
    }),
    on(decrement, (state, action) => {
        return state - action.value
    }),
    on(set, (state, action) => action.value)
)

// export function counterReducer(state = initialState, action: CounterActions) {
//     if (action.type === '[Counter] Increment') {
//         return state + action.value
//     }
//     return state
// }