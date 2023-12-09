import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import './cartItem.css'; 

const CartItem = ({ cartItem }) => {
    const { updateQuantity } = useContext(CartContext);

    const handleQuantityChange = (quantity) => {
        updateQuantity(cartItem.producto.id, quantity);
    };

    return (
        <div className="cart-item">
            <div className="item-info">
                <img src={cartItem.producto.img} alt={cartItem.producto.name} />
                <div className="item-details">
                    <h2>{cartItem.producto.name}</h2>
                    <p>Precio: ${cartItem.producto.price}</p>
                    <p>Subtotal: ${cartItem.cantidad * cartItem.producto.price}</p>
                </div>
            </div>
            <div className="item-actions">
                <button onClick={() => handleQuantityChange(-1)}>-</button>
                <p>{cartItem.cantidad}</p>
                <button onClick={() => handleQuantityChange(1)}>+</button>
            </div>
        </div>
    );
};

export default CartItem;
