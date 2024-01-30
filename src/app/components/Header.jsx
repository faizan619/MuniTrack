"use client"
import React, { useState } from 'react';
import './header.css'; // Keep the CSS file the same

const Header = () => {
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  const toggleSearch = () => {
    setIsOpenSearch(!isOpenSearch);
    setIsOpenNav(false);
  };

  const openNav = () => {
    setIsOpenNav(true);
    setIsOpenSearch(false);
  };

  const closeNav = () => {
    setIsOpenNav(false);
  };

  return (
    <div>
      <nav className={`nav ${isOpenSearch ? 'openSearch' : ''} ${isOpenNav ? 'openNav' : ''}`}>
        <i className="uil uil-bars navOpenBtn" onClick={openNav}></i>
        <a href="#" className="logo">
          CodingLab
        </a>

        <ul className="nav-links">
          <i className="uil uil-times navCloseBtn" onClick={closeNav}></i>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
          <li>
            <a href="#">Products</a>
          </li>
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
        </ul>

        <i className="uil uil-search search-icon" id="searchIcon" onClick={toggleSearch}></i>
        <div className={`search-box ${isOpenSearch ? 'openSearch' : ''}`}>
          <i className="uil uil-search search-icon"></i>
          <input type="text" placeholder="Search here..." />
        </div>
      </nav>
    </div>
  );
};

export default Header;
