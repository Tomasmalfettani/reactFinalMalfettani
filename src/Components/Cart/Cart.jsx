import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import CartItem from '../CartItem/CartItem';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, clearCart, removeItem, total } = useContext(CartContext);

  return (
    <div className='cart-container'>
      <h1>Tu Carrito</h1>

      {cart.length === 0 ? (
        <div>
          <h2>No hay productos</h2>
          <Link to='/'>Ir al inicio</Link>
        </div>
      ) : (
        <div>
          <div className='cart-items'>
            {cart.map((p) => (
              <CartItem key={p.producto.id} cartItem={p} removeItem={removeItem} />
            ))}
          </div>
          <h2 className='cart-total'>Precio total: $ {total}</h2>
          <button onClick={clearCart}>Vaciar carrito</button>
          <Link to='/Checkout'>Terminar su compra</Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
