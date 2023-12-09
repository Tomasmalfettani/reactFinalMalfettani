import React, { useState } from 'react';
import "./itemCount.css"

const ItemCount = ({ initial, stock, onAdd }) => {

    const [count, setCount] = useState(initial)

    const increment = () => {
        if (count < stock) {
            setCount(count + 1)
        }
    }

    const decrement = () => {
        if (count > initial) {
            setCount(count - 1)
        }
    }

    return (
        <div>
            <button onClick={decrement}>-</button>
            <span>{count}</span>
            <button onClick={increment}>+</button>
            <button onClick={() => { onAdd(count) }}>Agregar al carrito</button>
        </div>
    );
};

export default ItemCount;