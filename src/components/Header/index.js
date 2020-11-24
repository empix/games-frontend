import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import './style.css';

import { FiMenu, FiX } from 'react-icons/fi';

export default function Header() {
  const navMenu = useRef(null);

  function openMenu() {
    navMenu.current.style.display = 'block';
  }

  function closeMenu() {
    navMenu.current.style.display = 'none';
  }

  return (
    <header>
      <h1>Games</h1>
      <div className="menu">
        <nav ref={navMenu}>
          <FiX
            size={25}
            color="#eee"
            className="close-menu"
            onClick={closeMenu}
          />
          <ul>
            <li>
              <Link to="/">Game List</Link>
            </li>
            <li>
              <Link to="/add">Add Game</Link>
            </li>
          </ul>
        </nav>
        <FiMenu
          size={25}
          color="#eee"
          className="open-menu"
          onClick={openMenu}
        />
      </div>
    </header>
  );
}
