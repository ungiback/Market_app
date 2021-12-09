import React, { createContext, useContext, useReducer } from "react";


const BasketStateContext = createContext()
const BasketDispatchContext = createContext()

const BasketProvider = ({ children }) => {

    const delete_func = (ss, id) => {
        const new_arr = ss.filter(s => s.id !== id)
        return new_arr
    }
    const Basket = (state, action) => {
        switch (action.type) {
            case 'add':
                return [...state, action.item]
            case 'delete':
                return state.filter(item => item.id !== action.id)
        }
    }
    const [state, dispatch] = useReducer(Basket, [])

    return (
        <BasketStateContext.Provider value={state}>
            <BasketDispatchContext.Provider value={dispatch}>
                {children}
            </BasketDispatchContext.Provider>
        </BasketStateContext.Provider>
    )
}

export const useStateContxt = () => {
    return useContext(BasketStateContext)
}
export const useDispatchContxt = () => {
    return useContext(BasketDispatchContext)
}

export default BasketProvider