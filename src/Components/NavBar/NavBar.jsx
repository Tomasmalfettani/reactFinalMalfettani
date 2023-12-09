import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import CartWidget from '../CartWidget/CartWidget';
import './navBar.css';

const NavBar = () => {
    const enlaces = ["Remeras", "Pantalones"];

    return (
        <div className='nav'>
            <NavLink activeclassname='active' to='/'>
                <h1>Inicio</h1>
            </NavLink>

            <ul className='enlacesContainer'>
                {enlaces.map((e, id) => (
                    <li className='liContainer' key={id}>
                        <NavLink activeclassname="active" to={`/${e}`}>
                            {e}
                        </NavLink>
                    </li>
                ))}
            </ul>

            <NavLink to="/Cart" className="cart-icon" activeclassname='active' >
                <FontAwesomeIcon icon={faShoppingCart} />
            </NavLink>

            <CartWidget />
        </div>
    );
};

export default NavBar;
