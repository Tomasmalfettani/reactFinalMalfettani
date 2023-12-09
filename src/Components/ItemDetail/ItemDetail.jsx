import React, { useState, useContext } from 'react';
import ItemCount from '../ItemCount/ItemCount';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import './itemDetail.css';

const ItemDetail = ({ producto }) => {
    const [quantity, setQuantity] = useState(0);
    const { addToCart } = useContext(CartContext);

    const onAdd = (cantidad) => {
        setQuantity(cantidad);
        addToCart(producto, cantidad);
    };

    return (
        <div className='item-detail-container'>
            <p>{producto.category}</p>
            <h2>{producto.name}</h2>
            <img src={producto.img} alt={producto.name} />
            <p>$ {producto.price}</p>
            <h4>Stock: {producto.stock}</h4>
            {quantity === 0 ? (
                <ItemCount initial={1} stock={producto.stock} onAdd={onAdd} />
            ) : (
                <Link to='/Cart'>Ir al carrito</Link>
            )}
        </div>
    );
};

export default ItemDetail;
