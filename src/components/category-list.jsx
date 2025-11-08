import React, { useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import portfolioData from '../data/data.json';
import { getGridClass } from '../utils/grid';

export default function CategoryList({ navToggle }) {
    const location = useLocation();
    const categoryData = useMemo(() => {
        const url = location.pathname;
        const category = url.replace(/[^\w\s]/gi, '');
        const data = portfolioData[category];

        if (!data || !data.items) {
            if (process.env.NODE_ENV !== 'production') {
                console.warn(`Category "${category}" not found, falling back to dev`);
            }
            return { items: portfolioData.dev.items, category: 'dev' };
        }

        return { items: data.items, category };
    }, [location.pathname]);

    const gridClass = getGridClass(categoryData.items.length);
    const handleClick = navToggle || (() => {});

    return (
        <div id="content">
            {categoryData.items.map(item => (
                <div key={item.url} className={`${gridClass} grid-t-6 grid-panel`}>
                    <NavLink to={item.url} onClick={handleClick}>
                        <figure>
                            <img
                                src={item.thumbPath}
                                title={item.imageTitle || item.name}
                                alt={item.name}
                            />

                            <figcaption>
                                <h2>{item.name}</h2>
                                <div className="view">View</div>
                            </figcaption>
                        </figure>
                    </NavLink>
                </div>
            ))}
        </div>
    );
}

CategoryList.propTypes = {
    navToggle: PropTypes.func,
};

CategoryList.defaultProps = {
    navToggle: null,
};
