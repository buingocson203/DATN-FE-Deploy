import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { RootState } from '../store'

export interface CartState {
    items: string[]
    badge: number
}

const initialState: CartState = {
    items: [],
    badge: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<string>) => {
            const id = action.payload

            const isIdExist = state.items.find((item) => item === id)

            // if not found
            if (!isIdExist) {
                state.items = [...state.items, id]
                ++state.badge
            }
        },
        replaceAll: (state, action: PayloadAction<string[]>) => {
            state.items = action.payload
            state.badge = action.payload.length
        },
        removeAll: (state) => {
            state.items = []
            state.badge = 0
        },
        removeItem: (state, action: PayloadAction<string>) => {
            const id = action.payload
            state.items = state.items.filter((item) => item !== id)
            --state.badge
        },
        increase: () => {},
        decrease: () => {}
    }
})

export const cartReducer = cartSlice.reducer
export const cartActions = cartSlice.actions

// selectors
const badge = (state: RootState) => state.cart.badge

export const selectBadge = createSelector([badge], (state) => {
    if (state === 0) return null
    return state
})
