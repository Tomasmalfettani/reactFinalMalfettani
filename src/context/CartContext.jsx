import React, { useState, createContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [cantidadTotal, setCantiddadTotal] = useState(0);

    const addToCart = (producto, cantidad) => {
        const productoExistente = cart.find(prod => prod.producto.id === producto.id);

        if (!productoExistente) {
            setCart(prev => [...prev, { producto, cantidad }]);
            setCantiddadTotal(prev => prev + cantidad);
            setTotal(prev => prev + (producto.price * cantidad));
        } else {
            const carritoActualizado = cart.map(prod => {
                if (prod.producto.id === producto.id) {
                    return { ...prod, cantidad: prod.cantidad + cantidad };
                } else {
                    return prod;
                }
            });

            setCart(carritoActualizado);
            setCantiddadTotal(prev => prev + cantidad);
            setTotal(prev => prev + (producto.price * cantidad));
        }
    };

    const updateQuantity = (id, quantity) => {
        const updatedCart = cart.map(item => {
            if (item.producto.id === id) {
                const newQuantity = item.cantidad + quantity;

                if (newQuantity > 0 && newQuantity <= item.producto.stock) {
                    return { ...item, cantidad: newQuantity };
                } else if (newQuantity <= 0) {
                    return null;
                }
            }
            return item;
        }).filter(Boolean); 

        setCart(updatedCart);
        updateTotal(updatedCart);
    };

    const updateTotal = (updatedCart) => {
        const newTotal = updatedCart.reduce((acc, item) => acc + item.producto.price * item.cantidad, 0);
        setTotal(newTotal);
        const newCantidadTotal = updatedCart.reduce((acc, item) => acc + item.cantidad, 0);
        setCantiddadTotal(newCantidadTotal);
    };

    const clearCart = () => {
        setCart([]);
        setCantiddadTotal(0);
        setTotal(0);
    };

    return (
        <CartContext.Provider value={{
            cart,
            setCart,
            addToCart,
            updateQuantity,
            total,
            cantidadTotal,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};
