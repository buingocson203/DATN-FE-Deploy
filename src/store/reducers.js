import { combineReducers } from 'redux'

const cartReducer = (state = 0, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return state + 1
        case 'REMOVE_FROM_CART':
            return state - 1
        case 'REMOVE_ALL_CART':
            return 0
        case 'REMOVE_FROM_CART_CUSTOM':
            return state - action.payload.quantity
        case 'UPDATE_CART_QUANTITY':
            return state + action.payload.quantity
        case 'UPDATE_ALL_QUANTITY':
            return action.payload.quantity
        default:
            return state
    }
}

const rootReducer = combineReducers({
    cart: cartReducer
})

export default rootReducer
