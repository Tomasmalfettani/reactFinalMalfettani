import React from 'react';
import Item from '../Item/Item';
import './itemList.css'; 

const ItemList = ({ products }) => {
    return (
        <div className='contenedor'>
            {products.map((product) => (
                <div className='card' key={product.id}>
                    <Item key={product.id} product={product} />
                </div>
            ))}
        </div>
    );
};

export default ItemList;
