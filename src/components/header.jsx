import React, { useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { SITE_TITLE, NAV_ITEMS } from '../constants/navigation';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const closeNav = useCallback(() => {
        setIsOpen(false);
    }, []);

    const toggleNav = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    return (
        <header className={isOpen ? "open-nav" : ""}>
            <div className="grid-d-12">
                <div className="top-header">
                    <div id="logo">
                        <h1>
                            <NavLink to="/" onClick={closeNav}>
                                {SITE_TITLE}
                            </NavLink>
                        </h1>
                    </div>

                    <button
                        className="mobile-nav-link"
                        onClick={toggleNav}
                        aria-label="Toggle navigation menu"
                        aria-expanded={isOpen}
                    />
                </div>

                <nav>
                    <ul>
                        {NAV_ITEMS.map(item => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) => isActive ? 'active' : ''}
                                    onClick={closeNav}
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
