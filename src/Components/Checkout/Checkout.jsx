import React, { useState, useContext } from 'react';
import { doc, updateDoc, getFirestore, collection, addDoc, getDoc } from 'firebase/firestore';
import { CartContext } from '../../context/CartContext';
import './checkout.css';

const Checkout = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [emailConfir, setEmailConfir] = useState('');
    const [error, setError] = useState('');
    const [ordenId, setOrdenId] = useState('');
    const { cart, total, clearCart } = useContext(CartContext);

    const manejadorForm = async (event) => {
        event.preventDefault();
        if (!nombre || !apellido || !telefono || !email || !emailConfir) {
            setError('Completar los campos requeridos');
            return;
        }

        if (email !== emailConfir) {
            setError('Los campos del email no coinciden');
            return;
        }

        const db = getFirestore();

        const orden = {
            items: cart.map((producto) => ({
                id: producto.producto.id,
                name: producto.producto.name,
                cantidad: producto.cantidad,
                price: producto.producto.price,
            })),
            total: total,
            fecha: new Date(),
            nombre,
            apellido,
            telefono,
            email,
        };

        try {
            await Promise.all(
                orden.items.map(async (productoOrden) => {
                    const productoRef = doc(db, 'productos', productoOrden.id);
                    const productoDoc = await getDoc(productoRef);
                    const stockActual = productoDoc.data().stock;

                    await updateDoc(productoRef, {
                        stock: stockActual - productoOrden.cantidad,
                    });
                })
            );

            const docRef = await addDoc(collection(db, 'ordenes'), orden);
            setOrdenId(docRef.id);
            clearCart();
            setError('');
        } catch (error) {
            setError('Se produjo un error al crear la orden');
            console.error(error);
        }
    };

    return (
        <div className="checkout-container">
            <h2>Ingresa tus datos</h2>
            {cart.map((producto) => (
                <div key={producto.producto.id}>
                    <p>{producto.producto.name}</p>
                    <p>Cantidad: {producto.cantidad}</p>
                    <p>Subtotal: ${producto.producto.price * producto.cantidad}</p>
                </div>
            ))}
            <h3>Total de la compra: ${total}</h3>
            <form onSubmit={manejadorForm}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" id="nombre" onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="apellido">Apellido</label>
                    <input type="text" id="apellido" onChange={(e) => setApellido(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="telefono">Telefono</label>
                    <input type="number" id="telefono" onChange={(e) => setTelefono(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="emailConfir">Email de confirmacion</label>
                    <input type="email" id="emailConfir" onChange={(e) => setEmailConfir(e.target.value)} />
                </div>
                {error && <p className="error-message">{error}</p>}
                <div className="checkout-actions">
                    <button type="submit">Comprar</button>
                </div>
            </form>
            {ordenId && (
                <div className="checkout-summary">
                    <p>¡Gracias por tu compra! Tu número de orden: {ordenId}</p>
                </div>
            )}
        </div>
    );
};

export default Checkout;
