import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const favorites = store.favorites || [];

    return (
        <nav className="navbar navbar-light bg-light mb-3 px-3">
            <Link to="/">
                <span className="navbar-brand mb-0 h1">Star Wars Info</span>
            </Link>
            <div className="ml-auto d-flex align-items-center">
                <Link to="/characters" className="btn btn-outline-primary mx-1">
                    Characters
                </Link>
                <Link to="/planets" className="btn btn-outline-primary mx-1">
                    Planets
                </Link>
                <div className="dropdown mx-1">
                    <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        id="favoritesDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        aria-label="Toggle Favorites Dropdown"
                    >
                        Favorites ({favorites.length})
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="favoritesDropdown">
                        {favorites.length > 0 ? (
                            favorites.map((fav, index) => (
                                <li key={index} className="dropdown-item d-flex justify-content-between">
                                    <span>{fav.name}</span>
                                    <button
                                        className="btn btn-sm btn-danger ms-2"
                                        onClick={() => fav.uid && actions.removeFavorite(fav.name)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </li>
                            ))
                        ) : (
                            <>
                                <li className="dropdown-item">No favorites added</li>
                                <li className="dropdown-divider"></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
