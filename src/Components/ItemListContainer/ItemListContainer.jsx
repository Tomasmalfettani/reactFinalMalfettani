import React, { useState, useEffect } from 'react';
import ItemList from '../ItemList/ItemList';
import { useParams } from 'react-router-dom';
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";

const ItemListContainer = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoryId } = useParams();

    useEffect(() => {
        setLoading(true);

        const db = getFirestore();

        const misProductos = categoryId
            ? query(collection(db, "productos"), where("category", "==", categoryId))
            : collection(db, "productos");

        getDocs(misProductos)
            .then((res) => {
                const nuevosProductos = res.docs.map((doc) => {
                    return { id: doc.id, ...doc.data() };
                });
                setProducts(nuevosProductos);
            })
            .catch((error) => console.log(error))
            .finally(() => {
                setLoading(false);
            });
    }, [categoryId]);

    return (
        <>
            {loading ? (
                <h1>Cargando...</h1> 
            ) : (
                <ItemList products={products} />
            )}
        </>
    );
};

export default ItemListContainer;
