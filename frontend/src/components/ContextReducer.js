import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action)=>{
    switch(action.type){
        case 'ADD': return [...state, {id: action.id, name:action.name, price:action.price, quantity: action.quantity,size:action.size}]
        case 'REMOVE': 
            let newState = [...state];
            newState.splice(action.index,1);
            return newState;
        case 'UPDATE':
            let arr = [...state]
            arr.map((food, i) => {
                if (food.id === action.id) {
                    arr[i] = { ...food, quantity: parseInt(action.quantity) + food.quantity, price: action.price + food.price }
                }
                return null;
            })
            return arr;
        case "DROP": return [];
        default: console.log("Error in reducer !"); 
    }
}

export const CartProvider = ({children}) =>{
    const [state,dispatch] = useReducer(reducer,[]);
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = ()=> useContext(CartStateContext);
export const useDispatchCart = ()=> useContext(CartDispatchContext);