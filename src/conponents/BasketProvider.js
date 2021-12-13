import React, { createContext, useContext, useReducer } from "react";


const BasketStateContext = createContext()
const BasketDispatchContext = createContext()

const BasketProvider = ({ children }) => {

    const Basket = (state, action) => {
        switch (action.type) {
            case 'add':
                return [...state, action.item]
            case 'delete':
                return state.filter(item => item.put_num !== action.put_num)
            // case 'Item_Cnt_Add':
            //     return [
            //         ...state,
            //         state[action.num], {
            //             ...state[action.num],
            //             count: state[action.num].count + 1
            //         }
            //     ]
            // 바구니에서 개수 변경하면 숫자만 변경되지 않고 새로 아이템이 추가가 된다.
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