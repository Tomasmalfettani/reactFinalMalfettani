import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const CartWidget = () => {

    const { cantidadTotal } = useContext(CartContext)

    return (
        <div>
            <p>{cantidadTotal}</p>
        </div>
    );
};

export default CartWidget;