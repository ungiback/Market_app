import React, { useCallback, useEffect, useReducer, useState } from "react";


const useBasket = () => {
    const [cnt, setCnt] = useState(0)
    const basket = (state, action) => {
        switch (action.type) {
            case 'add':
                return [...state, action.data]
            case 'Item_remove':
                return [...state, state.filter(s => s.id !== action.id)]
        }
    }
    const [list, dispatch] = useReducer(basket, [])
    
    const add = (data) => {
        return dispatch({ type: 'add', data })
    }
    const Item_remove = (id) => {
        return dispatch('Item_remove', id)
    }
    useEffect(() => {
        try {
            setCnt(list.length)
        } catch (error) {
            console.log(error)
        }
    }, [list])

    return { list, add, cnt, Item_remove }
}

export default useBasket